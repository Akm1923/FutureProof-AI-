import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, FileText, Sparkles, Loader2, ArrowLeft } from 'lucide-react'
import { parseResume } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import toast from 'react-hot-toast'

export default function ResumeUpload() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file')
      return
    }

    setUploading(true)
    try {
      const result = await parseResume(file, user?.id)
      toast.success('Resume parsed successfully!')
      navigate('/form', { state: { parsedData: result.data, candidateId: result.candidate_id } })
    } catch (error) {
      toast.error('Failed to parse resume: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex h-screen bg-[#0f1115]">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Upload Resume" subtitle="Let AI extract your professional information" />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-2">Upload Your Resume</h2>
              <p className="text-slate-400 mb-8">
                Our AI will automatically extract all information from your resume
              </p>

              {/* Upload Area */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                dragActive ? 'border-[#195de6] bg-[#195de6]/5' : 'border-white/20 hover:border-white/30'
              }`}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleChange}
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              />
              
              {file ? (
                <div className="space-y-4">
                  <div className="inline-flex p-4 bg-[#195de6]/10 rounded-full">
                    <FileText className="text-[#195de6]" size={32} />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-white">{file.name}</p>
                    <p className="text-sm text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="inline-flex p-4 bg-white/5 rounded-full">
                    <Upload className="text-slate-400" size={32} />
                  </div>
                  <div>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="text-[#195de6] font-medium hover:text-[#1450cc] transition-colors">
                        Click to upload
                      </span>
                      <span className="text-slate-400"> or drag and drop</span>
                    </label>
                    <p className="text-sm text-slate-500 mt-2">
                      PDF, DOC, DOCX, PNG, JPG (max 10MB)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="px-6 py-3 bg-[#195de6] hover:bg-[#1450cc] disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {uploading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Parse Resume
                </>
              )}
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-[#1c1f26] hover:bg-[#2d3139] text-white border border-[#2d3139] rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

          <div className="mt-8 bg-[#195de6]/10 border border-[#195de6]/20 rounded-lg p-6">
            <h3 className="font-semibold text-white mb-2">What happens next?</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Our AI will extract text from your resume using advanced OCR</li>
              <li>• Information will be structured according to our schema</li>
              <li>• You'll be able to review and edit all extracted fields</li>
              <li>• Add any missing information or career preferences</li>
              <li>• Save your complete profile to your account</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  </div>
  )
}
