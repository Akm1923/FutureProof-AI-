import { useNavigate } from 'react-router-dom'
import { Sparkles, BarChart3, Brain, Rocket, CheckCircle } from 'lucide-react'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-[#195de6] rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">FutureProof AI</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="bg-[#195de6] hover:bg-[#195de6]/90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-[#195de6]/20"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6">
          <div 
            className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
            style={{
              background: 'radial-gradient(circle at top center, rgba(25, 93, 230, 0.15) 0%, rgba(10, 10, 12, 0) 70%)',
              backgroundImage: 'radial-gradient(#195de6 0.5px, transparent 0.5px)',
              backgroundSize: '24px 24px'
            }}
          />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#195de6]/10 border border-[#195de6]/20 text-[#195de6] text-xs font-bold uppercase tracking-widest mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#195de6] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#195de6]"></span>
              </span>
              Now in Early Access
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              Your Career Operating System for the AI Age
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Bridge skill gaps, mitigate automation risks, and land your next role with confidence. AI-powered resume parsing and career intelligence in one platform.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto px-8 py-4 bg-[#195de6] text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-[#195de6]/30"
              >
                Secure Your Career Now
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-[#111621]/50 border border-white/10 text-white rounded-xl font-bold text-lg hover:bg-[#111621]/80 transition-all backdrop-blur-sm">
                Watch Demo
              </button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-6 bg-[#0a0a0c]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Master the AI Transition</h2>
              <p className="text-slate-400">Our three-step framework designed for the modern professional.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="relative group">
                <div className="mb-6 size-16 rounded-2xl bg-[#195de6]/10 border border-[#195de6]/20 flex items-center justify-center text-[#195de6] group-hover:bg-[#195de6] group-hover:text-white transition-all duration-300">
                  <BarChart3 size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">01. Upload Resume</h3>
                <p className="text-slate-400 leading-relaxed">AI-powered OCR extracts every detail from your resume. Our system understands your experience, skills, and career trajectory.</p>
              </div>
              
              <div className="relative group">
                <div className="mb-6 size-16 rounded-2xl bg-[#195de6]/10 border border-[#195de6]/20 flex items-center justify-center text-[#195de6] group-hover:bg-[#195de6] group-hover:text-white transition-all duration-300">
                  <Brain size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">02. Intelligence</h3>
                <p className="text-slate-400 leading-relaxed">Dynamic skill gap analysis. We map your capabilities against the evolving market to create a personalized roadmap.</p>
              </div>
              
              <div className="relative group">
                <div className="mb-6 size-16 rounded-2xl bg-[#195de6]/10 border border-[#195de6]/20 flex items-center justify-center text-[#195de6] group-hover:bg-[#195de6] group-hover:text-white transition-all duration-300">
                  <Rocket size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">03. Action</h3>
                <p className="text-slate-400 leading-relaxed">AI-optimized profile building and career tracking. Land roles that value your unique skill set.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Precision Engineering for your Career</h2>
              <p className="text-slate-400">Everything you need to stay ahead of the curve.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#111621]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#195de6]/40 transition-all">
                <div className="bg-[#195de6]/20 text-[#195de6] px-3 py-1 rounded-full text-xs font-bold w-fit mb-4">MOST POPULAR</div>
                <h3 className="text-2xl font-bold mb-4">AI-Powered Resume Parser</h3>
                <p className="text-slate-400 mb-6">Advanced OCR and LLM technology extracts every detail from your resume with precision.</p>
                <button className="flex items-center gap-2 text-[#195de6] font-bold">
                  Try it now →
                </button>
              </div>
              
              <div className="bg-[#111621]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#195de6]/40 transition-all">
                <h3 className="text-xl font-bold mb-2">Smart Profile Builder</h3>
                <p className="text-slate-400 text-sm">Build your professional profile with AI assistance. Highlight skills that matter in today's market.</p>
              </div>
              
              <div className="bg-[#111621]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#195de6]/40 transition-all">
                <h3 className="text-xl font-bold mb-2">Career Intelligence</h3>
                <p className="text-slate-400 text-sm">Get insights on skill gaps and market trends specific to your career path.</p>
              </div>
              
              <div className="bg-[#111621]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#195de6]/40 transition-all">
                <h3 className="text-xl font-bold mb-2">Secure Storage</h3>
                <p className="text-slate-400 text-sm">Your data is encrypted and stored securely in Supabase with row-level security.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-slate-400">Start for free, upgrade when you're ready to accelerate.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#111621]/80 backdrop-blur-sm rounded-2xl p-8 border border-white/5 flex flex-col">
                <h3 className="text-xl font-bold mb-2">Basic</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold">$0</span>
                  <span className="text-slate-400">/forever</span>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle className="text-emerald-500" size={20} />
                    Resume Upload & Parsing
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle className="text-emerald-500" size={20} />
                    Basic Profile Building
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle className="text-emerald-500" size={20} />
                    Secure Data Storage
                  </li>
                </ul>
                <button 
                  onClick={() => navigate('/login')}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg transition-all border border-white/10"
                >
                  Get Started Free
                </button>
              </div>
              
              <div className="bg-[#111621]/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-[#195de6] relative flex flex-col shadow-[0_0_30px_rgba(25,93,230,0.15)]">
                <div className="absolute -top-4 right-8 bg-[#195de6] text-white px-3 py-1 rounded-full text-xs font-bold">COMING SOON</div>
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold">$19</span>
                  <span className="text-slate-400">/month</span>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle className="text-[#195de6]" size={20} />
                    Everything in Basic
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle className="text-[#195de6]" size={20} />
                    AI Career Intelligence
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle className="text-[#195de6]" size={20} />
                    Skill Gap Analysis
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle className="text-[#195de6]" size={20} />
                    Priority Support
                  </li>
                </ul>
                <button className="w-full py-3 bg-[#195de6] text-white font-bold rounded-lg transition-all shadow-lg shadow-[#195de6]/20">
                  Join Waitlist
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 mb-12">
          <div className="max-w-7xl mx-auto rounded-[2rem] bg-gradient-to-br from-[#195de6] to-blue-700 p-12 text-center relative overflow-hidden">
            <h2 className="text-4xl font-bold mb-6 relative z-10">Don't wait for the AI age to disrupt you.</h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto relative z-10">
              Join thousands of professionals building their careers on FutureProof AI.
            </p>
            <button 
              onClick={() => navigate('/login')}
              className="px-10 py-5 bg-white text-[#195de6] font-black text-xl rounded-2xl hover:bg-slate-100 transition-all shadow-2xl relative z-10"
            >
              Get Started For Free
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a0c] py-12 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="size-6 bg-[#195de6] rounded flex items-center justify-center">
              <Sparkles className="text-white" size={16} />
            </div>
            <span className="text-lg font-bold tracking-tight">FutureProof AI</span>
          </div>
          <p className="text-slate-500 mb-6">
            The OS for the next generation of professional excellence.
          </p>
          <p className="text-xs text-slate-600">© 2024 FutureProof AI Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
