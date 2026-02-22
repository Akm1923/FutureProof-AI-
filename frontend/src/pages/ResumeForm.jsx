import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Save, Plus, Trash2, CheckCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import toast from 'react-hot-toast'

export default function ResumeForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [formData, setFormData] = useState({
    user_profile: {
      name: '',
      current_role: '',
      experience_years: 0,
      career_stage: 'student'
    },
    education: [],
    experience_domains: [],
    skills: {
      technical: [],
      tools: [],
      domain: [],
      soft: []
    },
    projects_or_work_signals: [],
    certifications_courses: [],
    achievements_signals: [],
    languages: [],
    learning_indicators: {
      has_certifications: false,
      has_quantified_impact: false,
      continuous_learning_score: 0
    },
    ai_inferred: {
      primary_domain: '',
      secondary_domains: [],
      skill_level_estimate: 'beginner',
      strength_areas: [],
      probable_skill_gaps: []
    },
    career_goal: {
      target_role: '',
      target_domain: ''
    }
  })

  useEffect(() => {
    if (location.state?.parsedData) {
      setFormData(location.state.parsedData)
    }
  }, [location.state])

  const updateField = (path, value) => {
    setFormData(prev => {
      const keys = path.split('.')
      const newData = { ...prev }
      let current = newData
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] }
        current = current[keys[i]]
      }
      
      current[keys[keys.length - 1]] = value
      return newData
    })
  }

  const addArrayItem = (path, item) => {
    setFormData(prev => {
      const keys = path.split('.')
      const newData = { ...prev }
      let current = newData
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] }
        current = current[keys[i]]
      }
      
      const lastKey = keys[keys.length - 1]
      current[lastKey] = [...(current[lastKey] || []), item]
      return newData
    })
  }

  const removeArrayItem = (path, index) => {
    setFormData(prev => {
      const keys = path.split('.')
      const newData = { ...prev }
      let current = newData
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] }
        current = current[keys[i]]
      }
      
      const lastKey = keys[keys.length - 1]
      current[lastKey] = current[lastKey].filter((_, i) => i !== index)
      return newData
    })
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('resumes')
        .insert([{
          user_id: user.id,
          data: formData,
          created_at: new Date().toISOString()
        }])

      if (error) throw error

      setSaved(true)
      toast.success('Profile saved successfully!')
      setTimeout(() => navigate('/dashboard'), 2000)
    } catch (error) {
      toast.error('Failed to save: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex h-screen bg-[#0f1115]">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Complete Profile" subtitle="Review and edit your information" />
        
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="flex justify-end mb-6">
              <button
                onClick={handleSave}
                disabled={saving || saved}
                className="px-6 py-3 bg-[#195de6] hover:bg-[#1450cc] disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                {saved ? (
                  <>
                    <CheckCircle size={20} />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    {saving ? 'Saving...' : 'Save Profile'}
                  </>
                )}
              </button>
            </div>

            <div className="space-y-6">
              {/* User Profile */}
              <div className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">Personal Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.user_profile.name}
                onChange={(e) => updateField('user_profile.name', e.target.value)}
                className="w-full px-4 py-2 bg-[#0f1115] border border-[#2d3139] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#195de6] transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Current Role</label>
              <input
                type="text"
                value={formData.user_profile.current_role}
                onChange={(e) => updateField('user_profile.current_role', e.target.value)}
                className="w-full px-4 py-2 bg-[#0f1115] border border-[#2d3139] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#195de6] transition-colors"
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Years of Experience</label>
              <input
                type="number"
                value={formData.user_profile.experience_years}
                onChange={(e) => updateField('user_profile.experience_years', parseInt(e.target.value))}
                className="w-full px-4 py-2 bg-[#0f1115] border border-[#2d3139] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#195de6] transition-colors"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Career Stage</label>
              <select
                value={formData.user_profile.career_stage}
                onChange={(e) => updateField('user_profile.career_stage', e.target.value)}
                className="w-full px-4 py-2 bg-[#0f1115] border border-[#2d3139] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#195de6] transition-colors"
              >
                <option value="student">Student</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Education</h2>
            <button
              onClick={() => addArrayItem('education', { degree: '', field_of_study: '', level: 'bachelors' })}
              className="px-4 py-2 bg-[#1c1f26] hover:bg-[#2d3139] text-white border border-[#2d3139] rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
            >
              <Plus size={16} />
              Add Education
            </button>
          </div>
          {formData.education.map((edu, index) => (
            <div key={index} className="border border-[#2d3139] bg-[#1c1f26]/50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-white">Education {index + 1}</h3>
                <button
                  onClick={() => removeArrayItem('education', index)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEdu = [...formData.education]
                    newEdu[index].degree = e.target.value
                    updateField('education', newEdu)
                  }}
                  className="w-full px-4 py-2 bg-[#0f1115] border border-[#2d3139] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#195de6] transition-colors"
                  placeholder="Degree"
                />
                <input
                  type="text"
                  value={edu.field_of_study}
                  onChange={(e) => {
                    const newEdu = [...formData.education]
                    newEdu[index].field_of_study = e.target.value
                    updateField('education', newEdu)
                  }}
                  className="w-full px-4 py-2 bg-[#0f1115] border border-[#2d3139] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#195de6] transition-colors"
                  placeholder="Field of Study"
                />
                <select
                  value={edu.level}
                  onChange={(e) => {
                    const newEdu = [...formData.education]
                    newEdu[index].level = e.target.value
                    updateField('education', newEdu)
                  }}
                  className="w-full px-4 py-2 bg-[#0f1115] border border-[#2d3139] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#195de6] transition-colors"
                >
                  <option value="diploma">Diploma</option>
                  <option value="bachelors">Bachelors</option>
                  <option value="masters">Masters</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Experience Domains */}
        <div className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">Experience Domains</h2>
          <p className="text-sm text-slate-400 mb-4">Select or add domains you have experience in</p>
          <TagInput
            tags={formData.experience_domains}
            onChange={(tags) => updateField('experience_domains', tags)}
            placeholder="Add domain (e.g., logistics, data science)"
          />
        </div>

        {/* Skills */}
        <div className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">Skills</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Technical Skills</label>
              <TagInput
                tags={formData.skills.technical}
                onChange={(tags) => updateField('skills.technical', tags)}
                placeholder="Add technical skill"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Tools</label>
              <TagInput
                tags={formData.skills.tools}
                onChange={(tags) => updateField('skills.tools', tags)}
                placeholder="Add tool"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Domain Skills</label>
              <TagInput
                tags={formData.skills.domain}
                onChange={(tags) => updateField('skills.domain', tags)}
                placeholder="Add domain skill"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Soft Skills</label>
              <TagInput
                tags={formData.skills.soft}
                onChange={(tags) => updateField('skills.soft', tags)}
                placeholder="Add soft skill"
              />
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Projects & Work Signals</h2>
            <button
              onClick={() => addArrayItem('projects_or_work_signals', { title: '', domain: '', skills_demonstrated: [] })}
              className="px-4 py-2 bg-[#1c1f26] hover:bg-[#2d3139] text-white border border-[#2d3139] rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
            >
              <Plus size={16} />
              Add Project
            </button>
          </div>
          {formData.projects_or_work_signals.map((project, index) => (
            <div key={index} className="border border-[#2d3139] bg-[#1c1f26]/50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-white">Project {index + 1}</h3>
                <button
                  onClick={() => removeArrayItem('projects_or_work_signals', index)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => {
                    const newProjects = [...formData.projects_or_work_signals]
                    newProjects[index].title = e.target.value
                    updateField('projects_or_work_signals', newProjects)
                  }}
                  className="w-full px-4 py-2 bg-[#0f1115] border border-[#2d3139] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#195de6] transition-colors"
                  placeholder="Project Title"
                />
                <input
                  type="text"
                  value={project.domain}
                  onChange={(e) => {
                    const newProjects = [...formData.projects_or_work_signals]
                    newProjects[index].domain = e.target.value
                    updateField('projects_or_work_signals', newProjects)
                  }}
                  className="w-full px-4 py-2 bg-[#0f1115] border border-[#2d3139] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#195de6] transition-colors"
                  placeholder="Domain"
                />
                <TagInput
                  tags={project.skills_demonstrated}
                  onChange={(tags) => {
                    const newProjects = [...formData.projects_or_work_signals]
                    newProjects[index].skills_demonstrated = tags
                    updateField('projects_or_work_signals', newProjects)
                  }}
                  placeholder="Skills demonstrated"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Languages */}
        <div className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">Languages</h2>
          <TagInput
            tags={formData.languages}
            onChange={(tags) => updateField('languages', tags)}
            placeholder="Add language"
          />
        </div>

        {/* Career Goals */}
        <div className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">Career Goals</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Target Role</label>
              <input
                type="text"
                value={formData.career_goal.target_role}
                onChange={(e) => updateField('career_goal.target_role', e.target.value)}
                className="w-full px-4 py-2 bg-[#0f1115] border border-[#2d3139] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#195de6] transition-colors"
                placeholder="e.g., Senior Data Scientist"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Target Domain</label>
              <input
                type="text"
                value={formData.career_goal.target_domain}
                onChange={(e) => updateField('career_goal.target_domain', e.target.value)}
                className="w-full px-4 py-2 bg-[#0f1115] border border-[#2d3139] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#195de6] transition-colors"
                placeholder="e.g., Machine Learning"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <button onClick={() => navigate('/dashboard')} className="px-6 py-3 bg-[#1c1f26] hover:bg-[#2d3139] text-white border border-[#2d3139] rounded-lg font-medium transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || saved}
            className="px-6 py-3 bg-[#195de6] hover:bg-[#1450cc] disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            {saved ? (
              <>
                <CheckCircle size={20} />
                Saved!
              </>
            ) : (
              <>
                <Save size={20} />
                {saving ? 'Saving...' : 'Save Profile'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  )
}

// Tag Input Component
function TagInput({ tags, onChange, placeholder }) {
  const [input, setInput] = useState('')

  const addTag = () => {
    if (input.trim() && !tags.includes(input.trim())) {
      onChange([...tags, input.trim()])
      setInput('')
    }
  }

  const removeTag = (index) => {
    onChange(tags.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTag()
            }
          }}
          className="w-full px-4 py-2 bg-[#0f1115] border border-[#2d3139] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#195de6] transition-colors"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={addTag}
          className="px-4 py-2 bg-[#1c1f26] hover:bg-[#2d3139] text-white border border-[#2d3139] rounded-lg font-medium transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 bg-[#195de6]/10 text-[#195de6] border border-[#195de6]/20 px-3 py-1 rounded-full text-sm"
          >
            {tag}
            <button
              onClick={() => removeTag(index)}
              className="hover:text-[#1450cc] transition-colors"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}
