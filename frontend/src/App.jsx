import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ResumeUpload from './pages/ResumeUpload'
import ResumeForm from './pages/ResumeForm'
import LearningRoadmap from './pages/LearningRoadmap'
import SkillsAnalytics from './pages/SkillsAnalytics'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#0a0a0c]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#195de6]"></div>
    </div>
  }
  
  return user ? children : <Navigate to="/login" />
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/upload" element={
            <ProtectedRoute>
              <ResumeUpload />
            </ProtectedRoute>
          } />
          <Route path="/form" element={
            <ProtectedRoute>
              <ResumeForm />
            </ProtectedRoute>
          } />
          <Route path="/learning-roadmap" element={
            <ProtectedRoute>
              <LearningRoadmap />
            </ProtectedRoute>
          } />
          <Route path="/skills-analytics" element={
            <ProtectedRoute>
              <SkillsAnalytics />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
