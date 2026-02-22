import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Target, Award, Brain } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export default function SkillsAnalytics() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [userSkills, setUserSkills] = useState(null)
  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {
    fetchUserSkills()
  }, [user])

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
        setUserSkills(resumeData)
        analyzeSkills(resumeData)
      }
    } catch (error) {
      console.error('Error fetching skills:', error)
      toast.error('Failed to load skills data')
    } finally {
      setLoading(false)
    }
  }

  const analyzeSkills = (data) => {
    // Analyze skills and create analytics - USE REAL DATA ONLY
    const technical = data.skills?.technical || []
    const tools = data.skills?.tools || []
    const domain = data.skills?.domain || []
    const soft = data.skills?.soft || []

    // Calculate total skills (technical + tools only, matching Learning Roadmap)
    const totalSkills = technical.length + tools.length

    // Market demand analysis (simplified - in production use real job market API)
    const marketDemand = {
      high: ['React', 'Python', 'JavaScript', 'AWS', 'Docker', 'Kubernetes', 'TypeScript', 'Node.js', 'LangChain', 'LangGraph'],
      medium: ['Vue', 'Angular', 'Java', 'C++', 'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL'],
      low: ['jQuery', 'PHP', 'Ruby']
    }

    const skillsWithRisk = [...technical, ...tools].map(skill => {
      let risk = 'medium' // Default to medium
      let trend = 'stable'
      let demand = 'medium'

      const skillLower = skill.toLowerCase()
      
      if (marketDemand.high.some(s => skillLower.includes(s.toLowerCase()) || s.toLowerCase().includes(skillLower))) {
        risk = 'low'
        trend = 'growing'
        demand = 'high'
      } else if (marketDemand.low.some(s => skillLower.includes(s.toLowerCase()) || s.toLowerCase().includes(skillLower))) {
        risk = 'high'
        trend = 'declining'
        demand = 'low'
      }

      return { name: skill, risk, trend, demand }
    })

    const riskBreakdown = {
      low: skillsWithRisk.filter(s => s.risk === 'low').length,
      medium: skillsWithRisk.filter(s => s.risk === 'medium').length,
      high: skillsWithRisk.filter(s => s.risk === 'high').length
    }

    setAnalytics({
      totalSkills: totalSkills, // Use calculated total
      skillsWithRisk,
      riskBreakdown,
      domainExpertise: domain,
      softSkills: soft,
      experienceYears: data.user_profile?.experience_years || 0,
      careerStage: data.user_profile?.career_stage || 'beginner'
    })
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-[#0f1115]">
        <Sidebar user={user} />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#195de6]"></div>
        </div>
      </div>
    )
  }

  if (!userSkills) {
    return (
      <div className="flex h-screen bg-[#0f1115]">
        <Sidebar user={user} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title="Skills Analytics" subtitle="AI-powered skill intelligence" />
          <main className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <Brain className="mx-auto text-slate-600 mb-4" size={64} />
              <h2 className="text-2xl font-bold text-white mb-2">No Skills Data Found</h2>
              <p className="text-slate-400 mb-6">Upload your resume to get AI-powered skill analytics</p>
              <button
                onClick={() => window.location.href = '/upload'}
                className="px-6 py-3 bg-[#195de6] hover:bg-[#1450cc] text-white rounded-lg font-medium transition-colors"
              >
                Upload Resume
              </button>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#0f1115]">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Skills Analytics" subtitle="Real-time skill intelligence and market insights" showRefresh onRefresh={fetchUserSkills} />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Overview Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-[#195de6]/10 rounded-lg">
                    <Target className="text-[#195de6]" size={24} />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{analytics?.totalSkills || 0}</h3>
                <p className="text-sm text-slate-400">Total Skills</p>
              </div>

              <div className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-emerald-500/10 rounded-lg">
                    <CheckCircle className="text-emerald-500" size={24} />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{analytics?.riskBreakdown.low || 0}</h3>
                <p className="text-sm text-slate-400">Low Risk Skills</p>
              </div>

              <div className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-yellow-500/10 rounded-lg">
                    <AlertTriangle className="text-yellow-500" size={24} />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{analytics?.riskBreakdown.medium || 0}</h3>
                <p className="text-sm text-slate-400">Medium Risk Skills</p>
              </div>

              <div className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-red-500/10 rounded-lg">
                    <TrendingDown className="text-red-500" size={24} />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{analytics?.riskBreakdown.high || 0}</h3>
                <p className="text-sm text-slate-400">High Risk Skills</p>
              </div>
            </div>

            {/* Skill Risk Breakdown */}
            <div className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Skill Risk Analysis</h2>
              <p className="text-slate-400 mb-6">Market demand and obsolescence risk for your skills</p>

              <div className="space-y-3">
                {analytics?.skillsWithRisk.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-[#0f1115] border border-[#2d3139] rounded-lg">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`p-2 rounded-lg ${
                        skill.risk === 'low' ? 'bg-emerald-500/10' :
                        skill.risk === 'medium' ? 'bg-yellow-500/10' :
                        'bg-red-500/10'
                      }`}>
                        {skill.risk === 'low' ? (
                          <CheckCircle className="text-emerald-500" size={20} />
                        ) : skill.risk === 'medium' ? (
                          <AlertTriangle className="text-yellow-500" size={20} />
                        ) : (
                          <TrendingDown className="text-red-500" size={20} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-white">{skill.name}</h3>
                        <p className="text-sm text-slate-400">
                          {skill.trend === 'growing' ? '📈 Growing' : 
                           skill.trend === 'declining' ? '📉 Declining' : '➡️ Stable'} • 
                          Market Demand: {skill.demand.charAt(0).toUpperCase() + skill.demand.slice(1)}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      skill.risk === 'low' ? 'bg-emerald-500/20 text-emerald-500' :
                      skill.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {skill.risk.toUpperCase()} RISK
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Domain Expertise */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-[#195de6]/10 rounded-lg">
                    <Award className="text-[#195de6]" size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Domain Expertise</h2>
                </div>
                <div className="space-y-2">
                  {analytics?.domainExpertise.length > 0 ? (
                    analytics.domainExpertise.map((domain, index) => (
                      <div key={index} className="px-4 py-2 bg-[#0f1115] border border-[#2d3139] rounded-lg text-white">
                        {domain}
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400">No domain expertise listed</p>
                  )}
                </div>
              </div>

              <div className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-[#195de6]/10 rounded-lg">
                    <Brain className="text-[#195de6]" size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Soft Skills</h2>
                </div>
                <div className="space-y-2">
                  {analytics?.softSkills.length > 0 ? (
                    analytics.softSkills.map((skill, index) => (
                      <div key={index} className="px-4 py-2 bg-[#0f1115] border border-[#2d3139] rounded-lg text-white">
                        {skill}
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400">No soft skills listed</p>
                  )}
                </div>
              </div>
            </div>

            {/* Career Profile */}
            <div className="bg-gradient-to-r from-[#195de6] to-blue-600 rounded-xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">Career Profile</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-white/70 text-sm mb-1">Experience</p>
                  <p className="text-2xl font-bold">{analytics?.experienceYears} years</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-1">Career Stage</p>
                  <p className="text-2xl font-bold capitalize">{analytics?.careerStage}</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-1">Skill Health</p>
                  <p className="text-2xl font-bold">
                    {analytics?.riskBreakdown.low > analytics?.riskBreakdown.high ? '✅ Good' : '⚠️ Needs Attention'}
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-[#1c1f26] border border-[#2d3139] rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Recommendations</h2>
              <div className="space-y-3">
                {analytics?.riskBreakdown.high > 0 && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-400 font-medium mb-2">⚠️ Update High-Risk Skills</p>
                    <p className="text-slate-300 text-sm">
                      You have {analytics.riskBreakdown.high} skills with declining market demand. Consider learning modern alternatives.
                    </p>
                  </div>
                )}
                <div className="p-4 bg-[#195de6]/10 border border-[#195de6]/20 rounded-lg">
                  <p className="text-[#195de6] font-medium mb-2">💡 Expand Your Skillset</p>
                  <p className="text-slate-300 text-sm">
                    Check out the Learning Roadmap to discover new technologies aligned with your career goals.
                  </p>
                  <button
                    onClick={() => window.location.href = '/learning-roadmap'}
                    className="mt-3 px-4 py-2 bg-[#195de6] hover:bg-[#1450cc] text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Create Learning Roadmap
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
