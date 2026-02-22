import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, Brain, TrendingUp, Briefcase, Settings, Sparkles, User } from 'lucide-react'

export default function Sidebar({ user }) {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Brain, label: 'Learning Roadmap', path: '/learning-roadmap' },
    { icon: TrendingUp, label: 'Skills Analytics', path: '/skills-analytics' },
    { icon: Briefcase, label: 'Job Market', path: '/job-market' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <aside className="w-64 border-r border-[#2d3139] bg-[#0f1115] flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3 border-b border-[#2d3139]">
        <div className="w-8 h-8 bg-[#195de6] rounded-lg flex items-center justify-center text-white">
          <Sparkles size={20} />
        </div>
        <div>
          <h1 className="text-sm font-bold uppercase tracking-widest text-white">FutureProof AI</h1>
          <p className="text-[10px] text-slate-400 font-medium">CAREER OPERATING SYSTEM</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                active
                  ? 'bg-[#195de6]/10 text-[#195de6]'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-[#2d3139]">
        <button
          onClick={() => navigate('/profile')}
          className="w-full flex items-center gap-3 p-2 rounded-xl bg-[#1c1f26] border border-[#2d3139] hover:border-[#195de6]/40 transition-colors"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden bg-[#195de6]/20 flex items-center justify-center">
            <User size={18} className="text-[#195de6]" />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-xs font-bold text-white truncate">{user?.email?.split('@')[0] || 'User'}</p>
            <p className="text-[10px] text-slate-400 truncate">View Profile</p>
          </div>
        </button>
      </div>
    </aside>
  )
}
