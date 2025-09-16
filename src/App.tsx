import { useState } from 'react'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { LoginComponent, RegisterComponent, Dashboard, ProtectedRoute } from './components/auth'
import LandingPage from './pages/LandingPage'
import TableManagement from './pages/TableManagement'

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'home' | 'admin' | 'auth' | 'dashboard'>('home')
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const { isAuthenticated, user } = useAuth()

  // Simple routing basado en URL o estado
  const getPageFromURL = () => {
    const path = window.location.pathname
    if (path.includes('/admin')) return 'admin'
    if (path.includes('/auth')) return 'auth'
    if (path.includes('/dashboard')) return 'dashboard'
    return 'home'
  }

  // Sincronizar con URL al cargar
  useState(() => {
    setCurrentPage(getPageFromURL())
  })

  const navigateToHome = () => {
    window.history.pushState({}, '', '/')
    setCurrentPage('home')
  }

  const navigateToAuth = () => {
    window.history.pushState({}, '', '/auth')
    setCurrentPage('auth')
  }

  const navigateToDashboard = () => {
    window.history.pushState({}, '', '/dashboard')
    setCurrentPage('dashboard')
  }

  const navigateToAdmin = () => {
    window.history.pushState({}, '', '/admin')
    setCurrentPage('admin')
  }

  // Si el usuario está autenticado y está en la página de auth, redirigir al dashboard
  if (isAuthenticated && currentPage === 'auth') {
    navigateToDashboard()
    return null
  }

  if (currentPage === 'auth') {
    return authMode === 'login' ? (
      <LoginComponent onToggleMode={() => setAuthMode('register')} />
    ) : (
      <RegisterComponent onToggleMode={() => setAuthMode('login')} />
    )
  }

  if (currentPage === 'dashboard') {
    return (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  }

  if (currentPage === 'admin') {
    return (
      <ProtectedRoute requireRole="admin">
        <TableManagement />
        {/* Botón para volver al home */}
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={navigateToHome}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            ← Volver al Sitio
          </button>
        </div>
      </ProtectedRoute>
    )
  }

  // Página home con botones de navegación
  return (
    <>
      <LandingPage />
      {/* Botones de navegación */}
      <div className="fixed top-4 right-4 z-50 space-x-2">
        {!isAuthenticated ? (
          <button
            onClick={navigateToAuth}
            className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-white/90 transition-colors"
          >
            Iniciar Sesión
          </button>
        ) : (
          <>
            <button
              onClick={navigateToDashboard}
              className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-white/90 transition-colors"
            >
              Dashboard
            </button>
            {user?.role === 'admin' && (
              <button
                onClick={navigateToAdmin}
                className="bg-gray-900 text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors"
              >
                Admin Panel
              </button>
            )}
          </>
        )}
      </div>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
