import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Upload, FileText, BarChart3, TrendingUp, Award, Sparkles, User, LogOut, Trash2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import toast from 'react-hot-toast'
import axios from 'axios'

const BACKEND_URL = 'http://localhost:8000'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [hasResume, setHasResume] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeRoadmap, setActiveRoadmap] = useState(null)
  const [loadingRoadmap, setLoadingRoadmap] = useState(false)

  useEffect(() => {
    checkUserResume()
    fetchActiveRoadmap()
  }, [user])

  const checkUserResume = async () => {
    if (!user) return
    
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('id')
        .eq('user_id', user.id)
        .limit(1)
      
      if (error) throw error
      setHasResume(data && data.length > 0)
    } catch (error) {
      console.error('Error checking resume:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchActiveRoadmap = async () => {
    if (!user) return
    
    setLoadingRoadmap(true)
    try {
      const response = await fetch(`http://localhost:8000/api/roadmap/active/${user.id}`)
      const data = await response.json()
      
      if (data.active && data.roadmap) {
        setActiveRoadmap(data.roadmap)
      }
    } catch (error) {
      console.error('Error fetching active roadmap:', error)
    } finally {
      setLoadingRoadmap(false)
    }
  }

  const calculateProgress = () => {
    if (!activeRoadmap || !activeRoadmap.progress) return 0
    
    const roadmaps = activeRoadmap.roadmaps || []
    let totalDays = 0
    let completedDays = 0
    
    roadmaps.forEach(roadmap => {
      const techStack = roadmap.tech_stack
      const dailyPlan = roadmap.daily_plan || []
      totalDays += dailyPlan.length
      
      const progress = activeRoadmap.progress[techStack] || {}
      completedDays += Object.values(progress).filter(Boolean).length
    })
    
    return totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0
  }

  const handleDeleteRoadmap = async (e) => {
    e.stopPropagation() // Prevent navigation when clicking delete
    
    if (!window.confirm('Are you sure you want to delete this roadmap? This action cannot be undone.')) {
      return
    }
    
    try {
      await axios.delete(`${BACKEND_URL}/api/roadmap/${activeRoadmap.id}`)
      toast.success('Roadmap deleted successfully')
      setActiveRoadmap(null)
      // Refresh to show "Create Learning Roadmap" card
    } catch (error) {
      console.error('Error deleting roadmap:', error)
      toast.error('Failed to delete roadmap')
    }
  }

  const handleSignOut = async () => {
    await signOut()
    toast.success('Signed out successfully')
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#195de6]"></div>
      </div>
    )
  }

  // First-time user: Show only upload option
  if (!hasResume) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#195de6] to-blue-900 relative overflow-hidden">
        {/* Animated background pattern */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)',
            backgroundSize: '24px 24px'
          }}
        />
        
        {/* Header */}
        <header className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="size-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">FutureProof AI</span>
            </button>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white/80">
                <User size={20} />
                <span className="text-sm">{user?.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <LogOut size={20} />
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content - Centered Upload */}
        <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
          <div className="max-w-2xl w-full">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Welcome to FutureProof AI
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                Let's Start Your Career Journey
              </h1>
              <p className="text-xl text-white/80">
                Upload your resume to unlock AI-powered career intelligence
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-white/20 rounded-xl">
                  <Upload className="text-white" size={32} />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-1">Upload Your Resume</h3>
                  <p className="text-white/70 text-sm">
                    Our AI will extract and analyze your professional profile
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate('/upload')}
                className="w-full py-4 bg-white text-[#195de6] rounded-xl font-bold text-lg hover:bg-white/90 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <Upload size={24} />
                Get Started - Upload Resume
              </button>

              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-white/60 text-sm text-center mb-4">What happens next?</p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex items-center gap-3">
                    <div className="size-6 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs">1</div>
                    <span>AI extracts your experience, skills, and education</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="size-6 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs">2</div>
                    <span>Review and complete your profile</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="size-6 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs">3</div>
                    <span>Get personalized career insights and recommendations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Returning user: Show full dashboard
  return (
    <div className="flex h-screen bg-[#0f1115]">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Career Intelligence" subtitle="Real-time analysis of your professional profile" showRefresh />
        
        <main className="flex-1 overflow-y-auto p-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Career Intelligence Dashboard</h2>
            <p className="text-slate-400 mt-1">Real-time analysis of your professional profile and career opportunities.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold border border-emerald-500/20 uppercase tracking-wider">Profile Active</span>
            <span className="px-3 py-1 rounded-full bg-[#195de6]/10 text-[#195de6] text-[10px] font-bold border border-[#195de6]/20 uppercase tracking-wider">Free Plan</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#195de6]/10 rounded-lg">
                <BarChart3 className="text-[#195de6]" size={24} />
              </div>
              <span className="text-xs font-bold text-emerald-500">+12%</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">85%</h3>
            <p className="text-sm text-slate-400">Profile Completeness</p>
          </div>

          <div className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#195de6]/10 rounded-lg">
                <TrendingUp className="text-[#195de6]" size={24} />
              </div>
              <span className="text-xs font-bold text-[#195de6]">Active</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">42</h3>
            <p className="text-sm text-slate-400">Skill Match Score</p>
          </div>

          <div className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#195de6]/10 rounded-lg">
                <Award className="text-[#195de6]" size={24} />
              </div>
              <span className="text-xs font-bold text-slate-500">New</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">3</h3>
            <p className="text-sm text-slate-400">Certifications</p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => navigate('/upload')}
            className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-6 hover:border-[#195de6]/40 transition-all cursor-pointer group text-left shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#195de6]/10 rounded-lg group-hover:bg-[#195de6]/20 transition-colors">
                <Upload className="text-[#195de6]" size={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Update Resume</h3>
                <p className="text-slate-400 mb-4">
                  Upload a new version to keep your profile current
                </p>
                <div className="flex items-center text-[#195de6] font-medium">
                  Upload New Resume
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/form')}
            className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-6 hover:border-[#195de6]/40 transition-all cursor-pointer group text-left shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#195de6]/10 rounded-lg group-hover:bg-[#195de6]/20 transition-colors">
                <FileText className="text-[#195de6]" size={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Edit Profile</h3>
                <p className="text-slate-400 mb-4">
                  Manually update your skills, experience, and goals
                </p>
                <div className="flex items-center text-[#195de6] font-medium">
                  Edit Details
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Active Learning Roadmap Card */}
        {activeRoadmap && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Continue Learning</h3>
            <div className="relative w-full bg-gradient-to-r from-[#195de6] to-blue-600 border border-[#195de6]/40 rounded-xl p-6 shadow-lg group">
              <button
                onClick={() => navigate('/learning-roadmap', { state: { activeRoadmap } })}
                className="w-full text-left"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/10 rounded-lg">
                      <Sparkles className="text-white" size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">Active Learning Roadmap</h4>
                      <p className="text-white/80 text-sm">
                        {activeRoadmap.roadmaps?.length || 0} tech stack{activeRoadmap.roadmaps?.length !== 1 ? 's' : ''} in progress
                      </p>
                    </div>
                  </div>
                  <svg className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-sm font-medium">Overall Progress</span>
                    <span className="text-white font-bold">{calculateProgress()}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-white rounded-full h-2 transition-all duration-500"
                      style={{ width: `${calculateProgress()}%` }}
                    />
                  </div>
                </div>

                {/* Tech Stacks */}
                <div className="flex flex-wrap gap-2">
                  {activeRoadmap.roadmaps?.slice(0, 5).map((roadmap, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-white/20 text-white text-sm rounded-full"
                    >
                      {roadmap.tech_stack}
                    </span>
                  ))}
                  {activeRoadmap.roadmaps?.length > 5 && (
                    <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full">
                      +{activeRoadmap.roadmaps.length - 5} more
                    </span>
                  )}
                </div>
              </button>

              {/* Delete Button */}
              <button
                onClick={handleDeleteRoadmap}
                className="absolute top-4 right-4 p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 rounded-lg transition-all border border-red-500/30 hover:border-red-500/50"
                title="Delete Roadmap"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        )}

        {!activeRoadmap && !loadingRoadmap && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Start Learning</h3>
            <button
              onClick={() => navigate('/learning-roadmap')}
              className="w-full bg-[#1c1f26] border-2 border-dashed border-[#2d3139] rounded-xl p-6 hover:border-[#195de6]/40 transition-all cursor-pointer group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#195de6]/10 rounded-lg">
                  <Sparkles className="text-[#195de6]" size={28} />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white mb-1">Create Your Learning Roadmap</h4>
                  <p className="text-slate-400 text-sm">
                    Get AI-powered personalized learning paths for your career goals
                  </p>
                </div>
                <svg className="w-6 h-6 text-[#195de6] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        )}
      </main>
      </div>
    </div>
  )
}
