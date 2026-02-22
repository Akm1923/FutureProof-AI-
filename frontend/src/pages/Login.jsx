import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { Sparkles } from 'lucide-react'

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password)

      if (error) throw error

      toast.success(isSignUp ? 'Account created! Please check your email.' : 'Welcome back!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-[#0a0a0c]">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#195de6] to-blue-700 p-12 flex-col justify-between relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)',
            backgroundSize: '24px 24px'
          }}
        />
        
        <div className="relative z-10">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity"
          >
            <div className="size-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Sparkles size={24} />
            </div>
            <span className="text-2xl font-bold">FutureProof AI</span>
          </button>
        </div>
        
        <div className="text-white relative z-10">
          <h1 className="text-4xl font-bold mb-4">Transform Your Career Journey</h1>
          <p className="text-xl text-white/80">AI-powered resume parsing and career insights in seconds</p>
          
          <div className="mt-12 space-y-4">
            <div className="flex items-start gap-3">
              <Sparkles className="text-white/60 mt-1" size={20} />
              <div>
                <h3 className="font-semibold">Smart Extraction</h3>
                <p className="text-white/70">Advanced OCR and AI to extract every detail</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="text-white/60 mt-1" size={20} />
              <div>
                <h3 className="font-semibold">Career Insights</h3>
                <p className="text-white/70">Get AI-powered recommendations for your career</p>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-white/60 text-sm relative z-10">© 2024 FutureProof AI. All rights reserved.</p>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#0a0a0c]">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <button 
              onClick={() => navigate('/')}
              className="lg:hidden flex items-center gap-2 mx-auto mb-6 text-white"
            >
              <div className="size-8 bg-[#195de6] rounded-lg flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <span className="text-xl font-bold">FutureProof AI</span>
            </button>
            
            <h2 className="text-3xl font-bold text-white mb-2">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="text-slate-400">
              {isSignUp ? 'Start your career transformation today' : 'Sign in to continue to your dashboard'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#195de6] hover:text-[#1450cc] font-medium"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-slate-400 hover:text-white text-sm"
            >
              ← Back to home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
