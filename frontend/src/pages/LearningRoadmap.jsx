import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLocation } from 'react-router-dom'
import { Brain, ArrowRight, Check, Clock, Target, BookOpen, Sparkles, CheckCircle2, Plus } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import toast from 'react-hot-toast'
import axios from 'axios'
import { supabase } from '../lib/supabase'

const BACKEND_URL = 'http://localhost:8000'

export default function LearningRoadmap() {
  const { user } = useAuth()
  const location = useLocation()
  const [step, setStep] = useState(1)
  const [interests, setInterests] = useState('')
  const [loading, setLoading] = useState(false)
  const [suggestedTechStacks, setSuggestedTechStacks] = useState([])
  const [selectedTechStacks, setSelectedTechStacks] = useState([])
  const [configurations, setConfigurations] = useState({})
  const [generatedRoadmap, setGeneratedRoadmap] = useState(null)
  const [userSkills, setUserSkills] = useState([])
  const [roadmapProgress, setRoadmapProgress] = useState({})
  const [showChoice, setShowChoice] = useState(true)
  const [hasExistingRoadmap, setHasExistingRoadmap] = useState(false)

  useEffect(() => {
    fetchUserSkills()
    checkExistingRoadmap()
    
    // Check if we're coming from dashboard with active roadmap
    if (location.state?.activeRoadmap) {
      const roadmap = location.state.activeRoadmap
      setGeneratedRoadmap({
        roadmap_id: roadmap.id,
        roadmaps: roadmap.roadmaps
      })
      setRoadmapProgress(roadmap.progress || {})
      setStep(4) // Go directly to step 4 (generated roadmap view)
      setShowChoice(false)
    }
  }, [user, location])

  const checkExistingRoadmap = async () => {
    if (!user) return
    
    try {
      const response = await axios.get(`${BACKEND_URL}/api/roadmap/active/${user.id}`)
      
      if (response.data.active && response.data.roadmap) {
        setHasExistingRoadmap(true)
        // Store the roadmap data for display
        const roadmap = response.data.roadmap
        setGeneratedRoadmap({
          roadmap_id: roadmap.id,
          roadmaps: roadmap.roadmaps,
          preview: true // Flag to show we're in preview mode
        })
        setRoadmapProgress(roadmap.progress || {})
      } else {
        setHasExistingRoadmap(false)
        setShowChoice(false) // No existing roadmap, skip choice screen
      }
    } catch (error) {
      console.error('Error checking existing roadmap:', error)
      setHasExistingRoadmap(false)
      setShowChoice(false)
    }
  }

  const handleContinueExisting = async () => {
    setStep(4)
    setShowChoice(false)
    if (generatedRoadmap) {
      delete generatedRoadmap.preview // Remove preview flag
    }
    toast.success('Loaded your active roadmap!')
  }

  const handleCreateNew = () => {
    setShowChoice(false)
    setStep(1)
  }

  useEffect(() => {
    if (generatedRoadmap && generatedRoadmap.roadmap_id) {
      loadProgress()
    }
  }, [generatedRoadmap])

  const fetchUserSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('data')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)

      if (error) throw error

      if (data && data.length > 0) {
        const resumeData = data[0].data
        // Only count technical and tools skills (matching Skills Analytics)
        const allSkills = [
          ...(resumeData.skills?.technical || []),
          ...(resumeData.skills?.tools || [])
        ]
        setUserSkills(allSkills)
      }
    } catch (error) {
      console.error('Error fetching skills:', error)
    }
  }

  const loadProgress = async () => {
    if (!generatedRoadmap?.roadmap_id) return
    
    try {
      const response = await axios.get(`${BACKEND_URL}/api/roadmap/${user.id}`)
      if (response.data && response.data.progress) {
        setRoadmapProgress(response.data.progress)
      }
    } catch (error) {
      console.error('Error loading progress:', error)
    }
  }

  const toggleDayCompletion = async (techStack, day) => {
    if (!generatedRoadmap?.roadmap_id) return
    
    const currentStatus = roadmapProgress[techStack]?.[day] || false
    const newStatus = !currentStatus
    
    // Optimistic update
    setRoadmapProgress(prev => ({
      ...prev,
      [techStack]: {
        ...prev[techStack],
        [day]: newStatus
      }
    }))
    
    try {
      await axios.patch(`${BACKEND_URL}/api/roadmap/${generatedRoadmap.roadmap_id}/progress`, {
        tech_stack: techStack,
        day: day,
        completed: newStatus
      })
      
      // Check if this tech stack is now 100% complete
      const roadmap = generatedRoadmap.roadmaps.find(r => r.tech_stack === techStack)
      if (roadmap && newStatus) {
        const totalDays = roadmap.daily_plan?.length || 0
        const updatedProgress = {
          ...roadmapProgress,
          [techStack]: {
            ...roadmapProgress[techStack],
            [day]: newStatus
          }
        }
        const completedDays = Object.values(updatedProgress[techStack] || {}).filter(Boolean).length
        
        if (totalDays > 0 && completedDays === totalDays) {
          // 100% complete! Show celebration
          toast.success(`🎉 Congratulations! You've completed ${techStack}! This skill has been added to your profile.`, {
            duration: 5000,
            icon: '🏆'
          })
        } else {
          toast.success('Day marked as complete!')
        }
      } else {
        toast.success(newStatus ? 'Day marked as complete!' : 'Day marked as incomplete')
      }
    } catch (error) {
      // Revert on error
      setRoadmapProgress(prev => ({
        ...prev,
        [techStack]: {
          ...prev[techStack],
          [day]: currentStatus
        }
      }))
      toast.error('Failed to update progress')
    }
  }

  const calculateRoadmapProgress = (roadmap) => {
    const techStack = roadmap.tech_stack
    const dailyPlan = roadmap.daily_plan || []
    const totalDays = dailyPlan.length
    
    if (totalDays === 0) return 0
    
    const progress = roadmapProgress[techStack] || {}
    const completedDays = Object.values(progress).filter(Boolean).length
    
    return Math.round((completedDays / totalDays) * 100)
  }

  const calculateOverallProgress = () => {
    if (!generatedRoadmap?.roadmaps) return 0
    
    let totalDays = 0
    let completedDays = 0
    
    generatedRoadmap.roadmaps.forEach(roadmap => {
      const techStack = roadmap.tech_stack
      const dailyPlan = roadmap.daily_plan || []
      totalDays += dailyPlan.length
      
      const progress = roadmapProgress[techStack] || {}
      completedDays += Object.values(progress).filter(Boolean).length
    })
    
    return totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0
  }

  const handleAddToSkills = async (techStack) => {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('data')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)

      if (error) throw error

      if (data && data.length > 0) {
        const resumeData = data[0].data
        
        // Initialize skills structure if it doesn't exist
        if (!resumeData.skills) {
          resumeData.skills = { technical: [], tools: [], domain: [] }
        }
        
        // Check if skill already exists
        const technicalSkills = resumeData.skills.technical || []
        if (technicalSkills.includes(techStack)) {
          toast.error(`${techStack} is already in your skills!`)
          return
        }
        
        // Add to technical skills
        technicalSkills.push(techStack)
        resumeData.skills.technical = technicalSkills
        
        // Update resume in database
        const { error: updateError } = await supabase
          .from('resumes')
          .update({ data: resumeData })
          .eq('user_id', user.id)
        
        if (updateError) throw updateError
        
        toast.success(`✅ ${techStack} added to your skills!`, {
          icon: '🎯'
        })
        
        // Refresh user skills
        fetchUserSkills()
      }
    } catch (error) {
      console.error('Error adding skill:', error)
      toast.error('Failed to add skill to profile')
    }
  }

  const handleInterestsSubmit = async () => {
    if (!interests.trim()) {
      toast.error('Please enter your interests')
      return
    }

    setLoading(true)
    try {
      const interestsList = interests.split(',').map(i => i.trim()).filter(i => i)
      const response = await axios.post(`${BACKEND_URL}/api/roadmap/suggest-techstacks`, {
        interests: interestsList,
        user_id: user.id,
        user_skills: userSkills
      })
      
      setSuggestedTechStacks(response.data.techstacks)
      setStep(2)
      toast.success(`Found ${response.data.techstacks.length} relevant technologies!`)
    } catch (error) {
      toast.error('Failed to get suggestions: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleTechStack = (techStack) => {
    if (selectedTechStacks.find(t => t.name === techStack.name)) {
      setSelectedTechStacks(selectedTechStacks.filter(t => t.name !== techStack.name))
      const newConfig = { ...configurations }
      delete newConfig[techStack.name]
      setConfigurations(newConfig)
    } else {
      setSelectedTechStacks([...selectedTechStacks, techStack])
    }
  }

  const handleConfigureNext = () => {
    if (selectedTechStacks.length === 0) {
      toast.error('Please select at least one tech stack')
      return
    }
    setStep(3)
  }

  const updateConfiguration = (techStackName, field, value) => {
    setConfigurations({
      ...configurations,
      [techStackName]: {
        ...configurations[techStackName],
        [field]: value
      }
    })
  }

  const handleGenerateRoadmap = async () => {
    for (const tech of selectedTechStacks) {
      if (!configurations[tech.name]?.duration || !configurations[tech.name]?.level) {
        toast.error(`Please configure ${tech.name}`)
        return
      }
    }

    setLoading(true)
    try {
      const selections = selectedTechStacks.map(tech => ({
        tech_stack: tech.name,
        duration_days: configurations[tech.name].duration,
        skill_level: configurations[tech.name].level
      }))

      const response = await axios.post(`${BACKEND_URL}/api/roadmap/generate`, {
        user_id: user.id,
        selections,
        user_skills: userSkills
      })

      setGeneratedRoadmap(response.data)
      setStep(4)
      toast.success('Comprehensive roadmap generated!')
    } catch (error) {
      toast.error('Failed to generate roadmap: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-[#0f1115]">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Learning Roadmap" subtitle="AI-powered personalized learning paths" />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {/* Choice Screen - Continue or Create New */}
            {showChoice && hasExistingRoadmap && (
              <div className="min-h-[600px] flex items-center justify-center">
                <div className="max-w-4xl w-full">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-white mb-4">Welcome Back!</h2>
                    <p className="text-xl text-slate-400">What would you like to do?</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Continue Existing Roadmap */}
                    <button
                      onClick={handleContinueExisting}
                      className="group bg-gradient-to-br from-[#195de6] to-blue-600 border-2 border-[#195de6] rounded-2xl p-8 hover:scale-105 transition-all shadow-xl text-left"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-4 bg-white/20 rounded-xl">
                          <Sparkles className="text-white" size={32} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">Continue Learning</h3>
                          <p className="text-white/80 text-sm">Pick up where you left off</p>
                        </div>
                      </div>

                      {/* Show what's in the roadmap */}
                      {generatedRoadmap?.roadmaps && (
                        <div className="mb-6 p-4 bg-white/10 rounded-lg">
                          <p className="text-white/70 text-xs mb-2">Your Active Roadmap:</p>
                          <div className="space-y-2">
                            {generatedRoadmap.roadmaps.map((roadmap, idx) => (
                              <div key={idx} className="flex items-center justify-between">
                                <span className="text-white font-medium">{roadmap.tech_stack}</span>
                                <span className="text-white/70 text-sm">{roadmap.duration_days} days</span>
                              </div>
                            ))}
                          </div>
                          {roadmapProgress && Object.keys(roadmapProgress).length > 0 && (
                            <div className="mt-3 pt-3 border-t border-white/20">
                              <p className="text-white/70 text-xs">Progress: {calculateOverallProgress()}% complete</p>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-white/90">
                          <Check size={20} className="text-emerald-300" />
                          <span>Resume your active roadmap</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/90">
                          <Check size={20} className="text-emerald-300" />
                          <span>Keep your progress intact</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/90">
                          <Check size={20} className="text-emerald-300" />
                          <span>Continue from last checkpoint</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-white font-medium">
                        <span>Continue →</span>
                        <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
                      </div>
                    </button>

                    {/* Create New Roadmap */}
                    <button
                      onClick={handleCreateNew}
                      className="group bg-[#1c1f26] border-2 border-[#2d3139] hover:border-[#195de6] rounded-2xl p-8 hover:scale-105 transition-all shadow-xl text-left"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-4 bg-[#195de6]/10 rounded-xl group-hover:bg-[#195de6]/20 transition-colors">
                          <Brain className="text-[#195de6]" size={32} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">Create New Roadmap</h3>
                          <p className="text-slate-400 text-sm">Start a fresh learning journey</p>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Check size={20} className="text-[#195de6]" />
                          <span>Learn new technologies</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Check size={20} className="text-[#195de6]" />
                          <span>AI-powered recommendations</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Check size={20} className="text-[#195de6]" />
                          <span>Personalized learning path</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[#195de6] font-medium">
                        <span>Create New →</span>
                        <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
                      </div>
                    </button>
                  </div>

                  <p className="text-center text-slate-500 text-sm mt-8">
                    Note: Creating a new roadmap will keep your existing one. You can have multiple roadmaps.
                  </p>
                </div>
              </div>
            )}

            {/* Original Steps - Only show when not on choice screen */}
            {!showChoice && (
              <>
            {/* Progress Steps */}
            <div className="mb-8 flex items-center justify-center gap-4">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                    step >= s ? 'bg-[#195de6] text-white' : 'bg-[#1c1f26] text-slate-500'
                  }`}>
                    {step > s ? <Check size={20} /> : s}
                  </div>
                  {s < 4 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step > s ? 'bg-[#195de6]' : 'bg-[#1c1f26]'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Interests */}
            {step === 1 && (
              <div className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-[#195de6]/10 rounded-lg">
                    <Brain className="text-[#195de6]" size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">What are you interested in?</h2>
                    <p className="text-slate-400">Tell us about your areas of interest or career goals</p>
                  </div>
                </div>

                {userSkills.length > 0 && (
                  <div className="mb-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <p className="text-emerald-500 font-medium mb-2">✓ We found {userSkills.length} skills in your profile</p>
                    <p className="text-slate-400 text-sm">We'll highlight technologies you already know with a green overlay</p>
                  </div>
                )}

                <textarea
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0f1115] border border-[#2d3139] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#195de6] transition-colors min-h-[120px]"
                  placeholder="e.g., agentic AI, LLM applications, cloud computing, DevOps..."
                />

                <button
                  onClick={handleInterestsSubmit}
                  disabled={loading}
                  className="mt-6 px-6 py-3 bg-[#195de6] hover:bg-[#1450cc] disabled:bg-slate-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  {loading ? 'Searching latest technologies...' : 'Get Comprehensive Recommendations'}
                  <ArrowRight size={20} />
                </button>
              </div>
            )}

            {/* Step 2: Tech Stack Selection - ENHANCED WITH GREEN OVERLAY */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Comprehensive Tech Stack Recommendations</h2>
                  <p className="text-slate-400 mb-2">Select the technologies you want to learn ({suggestedTechStacks.length} found)</p>
                  <p className="text-emerald-500 text-sm mb-6">✓ Green overlay = You already know this!</p>

                  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {suggestedTechStacks.map((tech, index) => {
                      const isSelected = selectedTechStacks.find(t => t.name === tech.name)
                      const alreadyKnown = tech.already_known
                      
                      return (
                        <button
                          key={index}
                          onClick={() => toggleTechStack(tech)}
                          className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                            isSelected
                              ? 'border-[#195de6] bg-[#195de6]/10'
                              : alreadyKnown
                              ? 'border-emerald-500/40 bg-emerald-500/5'
                              : 'border-[#2d3139] bg-[#0f1115] hover:border-[#195de6]/40'
                          }`}
                        >
                          {alreadyKnown && (
                            <div className="absolute top-2 right-2 bg-emerald-500 rounded-full p-1">
                              <CheckCircle2 size={16} className="text-white" />
                            </div>
                          )}
                          
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-white pr-6">{tech.name}</h3>
                            {isSelected && !alreadyKnown && <Check className="text-[#195de6]" size={20} />}
                          </div>
                          
                          <p className="text-sm text-slate-400 mb-3 line-clamp-2">{tech.description}</p>
                          
                          <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
                            <span className="px-2 py-1 bg-[#195de6]/20 text-[#195de6] rounded">{tech.category}</span>
                            <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded">{tech.difficulty}</span>
                            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded">★ {tech.relevance_score}/10</span>
                          </div>
                          
                          {alreadyKnown && (
                            <div className="text-xs text-emerald-500 font-medium">
                              ✓ Already in your skillset
                            </div>
                          )}
                          
                          {tech.prerequisites && tech.prerequisites.length > 0 && (
                            <div className="text-xs text-slate-500 mt-2">
                              Prerequisites: {tech.prerequisites.slice(0, 2).join(', ')}
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-3 bg-[#1c1f26] hover:bg-[#2d3139] text-white border border-[#2d3139] rounded-lg font-medium transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleConfigureNext}
                      className="px-6 py-3 bg-[#195de6] hover:bg-[#1450cc] text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      Continue with {selectedTechStacks.length} selected
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Configure - Same as before */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Configure Your Learning Path</h2>
                  <p className="text-slate-400 mb-6">Set duration and skill level for each technology</p>

                  <div className="space-y-4">
                    {selectedTechStacks.map((tech, index) => (
                      <div key={index} className="bg-[#0f1115] border border-[#2d3139] rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className="font-bold text-white">{tech.name}</h3>
                          {tech.already_known && (
                            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-500 text-xs rounded">
                              ✓ Known
                            </span>
                          )}
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                              <Clock size={16} className="inline mr-1" />
                              Learning Duration
                            </label>
                            <select
                              value={configurations[tech.name]?.duration || ''}
                              onChange={(e) => updateConfiguration(tech.name, 'duration', parseInt(e.target.value))}
                              className="w-full px-4 py-2 bg-[#1c1f26] border border-[#2d3139] rounded-lg text-white focus:outline-none focus:border-[#195de6] transition-colors"
                            >
                              <option value="">Select duration</option>
                              <option value="7">7 days (1 week) - Quick intro</option>
                              <option value="14">14 days (2 weeks) - Solid foundation</option>
                              <option value="21">21 days (3 weeks) - Intermediate</option>
                              <option value="30">30 days (1 month) - Comprehensive</option>
                              <option value="60">60 days (2 months) - Deep dive</option>
                              <option value="90">90 days (3 months) - Mastery</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                              <Target size={16} className="inline mr-1" />
                              Current Skill Level
                            </label>
                            <select
                              value={configurations[tech.name]?.level || ''}
                              onChange={(e) => updateConfiguration(tech.name, 'level', e.target.value)}
                              className="w-full px-4 py-2 bg-[#1c1f26] border border-[#2d3139] rounded-lg text-white focus:outline-none focus:border-[#195de6] transition-colors"
                            >
                              <option value="">Select level</option>
                              <option value="beginner">Beginner - Starting from scratch</option>
                              <option value="intermediate">Intermediate - Some experience</option>
                              <option value="advanced">Advanced - Want to master</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-3 bg-[#1c1f26] hover:bg-[#2d3139] text-white border border-[#2d3139] rounded-lg font-medium transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleGenerateRoadmap}
                      disabled={loading}
                      className="px-6 py-3 bg-[#195de6] hover:bg-[#1450cc] disabled:bg-slate-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Generating detailed roadmap...
                        </>
                      ) : (
                        <>
                          <Sparkles size={20} />
                          Generate Comprehensive Roadmap
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Generated Roadmap - ENHANCED WITH DAY-BY-DAY */}
            {step === 4 && generatedRoadmap && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#195de6] to-blue-600 rounded-xl p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <Sparkles size={32} />
                    <h2 className="text-3xl font-bold">Your Comprehensive Learning Roadmap</h2>
                  </div>
                  <p className="text-white/80">Day-by-day breakdown with projects and milestones</p>
                </div>

                {generatedRoadmap.roadmaps.map((roadmap, idx) => {
                  const isSkillInProfile = userSkills.some(skill => 
                    skill.toLowerCase() === roadmap.tech_stack.toLowerCase()
                  )
                  
                  return (
                    <div key={idx} className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <h3 className="text-2xl font-bold text-white">{roadmap.tech_stack}</h3>
                          {isSkillInProfile && (
                            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-500 text-xs rounded-full flex items-center gap-1">
                              <CheckCircle2 size={14} />
                              In Your Skills
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {!isSkillInProfile && (
                            <button
                              onClick={() => handleAddToSkills(roadmap.tech_stack)}
                              className="px-3 py-1 bg-[#195de6]/20 hover:bg-[#195de6]/30 text-[#195de6] text-sm rounded-lg transition-all flex items-center gap-1 border border-[#195de6]/40"
                              title="Add to your skills"
                            >
                              <Plus size={16} />
                              Add to Skills
                            </button>
                          )}
                          <span className="px-3 py-1 bg-[#195de6]/20 text-[#195de6] rounded-full text-sm font-medium">
                            {roadmap.duration_days} days
                          </span>
                          <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm font-medium">
                            {roadmap.skill_level}
                          </span>
                        </div>
                      </div>

                    <p className="text-slate-400 mb-4">{roadmap.overview}</p>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-300">Your Progress</span>
                        <span className="text-sm font-bold text-[#195de6]">{calculateRoadmapProgress(roadmap)}%</span>
                      </div>
                      <div className="w-full bg-[#0f1115] rounded-full h-2">
                        <div 
                          className="bg-[#195de6] rounded-full h-2 transition-all duration-500"
                          style={{ width: `${calculateRoadmapProgress(roadmap)}%` }}
                        />
                      </div>
                    </div>

                    {/* Day-by-Day Plan WITH CHECKBOXES */}
                    {roadmap.daily_plan && roadmap.daily_plan.length > 0 && (
                      <div className="space-y-3 mb-6">
                        <h4 className="text-xl font-bold text-white mb-4">📅 Day-by-Day Learning Plan</h4>
                        {roadmap.daily_plan.map((day, dayIdx) => {
                          const isCompleted = roadmapProgress[roadmap.tech_stack]?.[day.day] || false
                          
                          return (
                            <details key={dayIdx} className={`bg-[#0f1115] border rounded-lg ${
                              isCompleted ? 'border-emerald-500/40' : 'border-[#2d3139]'
                            }`}>
                              <summary className="p-4 cursor-pointer hover:bg-[#1c1f26] transition-colors">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        toggleDayCompletion(roadmap.tech_stack, day.day)
                                      }}
                                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                                        isCompleted
                                          ? 'bg-emerald-500 border-emerald-500'
                                          : 'border-[#195de6] hover:border-emerald-500'
                                      }`}
                                    >
                                      {isCompleted && <Check size={16} className="text-white" />}
                                    </button>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                                      isCompleted ? 'bg-emerald-500' : 'bg-[#195de6]'
                                    }`}>
                                      {day.day}
                                    </div>
                                    <div>
                                      <h5 className={`font-bold ${isCompleted ? 'text-emerald-500' : 'text-white'}`}>
                                        {day.title}
                                      </h5>
                                      <p className="text-sm text-slate-400">{day.focus}</p>
                                    </div>
                                  </div>
                                  <span className="text-xs text-slate-500">{day.estimated_hours}h</span>
                                </div>
                              </summary>
                              <div className="p-4 border-t border-[#2d3139] space-y-4">
                                {day.topics && (
                                  <div>
                                    <p className="text-sm font-medium text-slate-300 mb-2">📚 Topics:</p>
                                    <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                                      {day.topics.map((topic, i) => <li key={i}>{topic}</li>)}
                                    </ul>
                                  </div>
                                )}
                                {day.hands_on_tasks && (
                                  <div>
                                    <p className="text-sm font-medium text-slate-300 mb-2">💻 Hands-on Tasks:</p>
                                    <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                                      {day.hands_on_tasks.map((task, i) => <li key={i}>{task}</li>)}
                                    </ul>
                                  </div>
                                )}
                                {day.checkpoint && (
                                  <div className="p-3 bg-[#195de6]/10 border border-[#195de6]/20 rounded">
                                    <p className="text-sm font-medium text-[#195de6] mb-1">✓ Checkpoint:</p>
                                    <p className="text-sm text-slate-300">{day.checkpoint}</p>
                                  </div>
                                )}
                              </div>
                            </details>
                          )
                        })}
                      </div>
                    )}

                    {/* Projects */}
                    {roadmap.projects && roadmap.projects.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-xl font-bold text-white mb-4">🚀 Projects</h4>
                        <div className="space-y-3">
                          {roadmap.projects.map((project, pIdx) => (
                            <div key={pIdx} className="p-4 bg-[#0f1115] border border-[#2d3139] rounded-lg">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <span className="text-xs text-slate-500">{project.day_range}</span>
                                  <h5 className="font-bold text-white">{project.title}</h5>
                                </div>
                                <span className="text-xs text-slate-500">{project.estimated_hours}h</span>
                              </div>
                              <p className="text-sm text-slate-400 mb-2">{project.description}</p>
                              {project.objectives && (
                                <div className="text-xs text-slate-500">
                                  Objectives: {project.objectives.join(', ')}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Capstone Project */}
                    {roadmap.capstone_project && (
                      <div className="p-4 bg-gradient-to-r from-[#195de6]/20 to-blue-600/20 border border-[#195de6]/40 rounded-lg">
                        <h4 className="font-bold text-white mb-2">🎯 Final Capstone Project</h4>
                        <h5 className="text-lg font-bold text-[#195de6] mb-2">{roadmap.capstone_project.title}</h5>
                        <p className="text-slate-300 mb-3">{roadmap.capstone_project.description}</p>
                        {roadmap.capstone_project.features && (
                          <div className="text-sm text-slate-400">
                            <p className="font-medium mb-1">Features to implement:</p>
                            <ul className="list-disc list-inside space-y-1">
                              {roadmap.capstone_project.features.map((f, i) => <li key={i}>{f}</li>)}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}

                <button
                  onClick={() => {
                    setStep(1)
                    setInterests('')
                    setSuggestedTechStacks([])
                    setSelectedTechStacks([])
                    setConfigurations({})
                    setGeneratedRoadmap(null)
                  }}
                  className="px-6 py-3 bg-[#1c1f26] hover:bg-[#2d3139] text-white border border-[#2d3139] rounded-lg font-medium transition-colors"
                >
                  Create New Roadmap
                </button>
              </div>
            )}
          </>
        )}
          </div>
        </main>
      </div>
    </div>
  )
}
