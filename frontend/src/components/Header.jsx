import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, LogOut, RefreshCw, Calendar as CalendarIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Calendar from './Calendar'
import toast from 'react-hot-toast'

export default function Header({ title, subtitle, showRefresh = false, onRefresh }) {
  const navigate = useNavigate()
  const { signOut, user } = useAuth()
  const [showCalendar, setShowCalendar] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    toast.success('Signed out successfully')
    navigate('/')
  }

  return (
    <>
      <header className="h-16 border-b border-[#2d3139] px-8 flex items-center justify-between sticky top-0 bg-[#0f1115]/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-400">Overview</span>
          <span className="text-slate-600">›</span>
          <span className="text-white font-medium">{title}</span>
        </div>

        <div className="flex items-center gap-4">
          {showRefresh && (
            <>
              <div className="text-right mr-4">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Last Synced</p>
                <p className="text-xs text-slate-300">Just now</p>
              </div>
              <button 
                onClick={onRefresh}
                className="flex items-center gap-2 px-4 py-2 bg-[#195de6] hover:bg-[#1450cc] text-white text-xs font-bold rounded-lg transition-all"
              >
                <RefreshCw size={14} />
                REFRESH DATA
              </button>
            </>
          )}
          
          <div className="w-px h-6 bg-[#2d3139]"></div>
          
          <button 
            onClick={() => setShowCalendar(true)}
            className="p-2 text-slate-400 hover:text-white transition-colors"
            title="Learning Calendar"
          >
            <CalendarIcon size={20} />
          </button>

          <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#195de6] rounded-full border-2 border-[#0f1115]"></span>
          </button>

          <button
            onClick={handleSignOut}
            className="p-2 text-slate-400 hover:text-white transition-colors"
            title="Sign Out"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <Calendar 
        userId={user?.id}
        isOpen={showCalendar}
        onClose={() => setShowCalendar(false)}
      />
    </>
  )
}
