import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import TableManagement from './pages/TableManagement'

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'admin'>('home')

  // Simple routing basado en URL o estado
  const getPageFromURL = () => {
    const path = window.location.pathname
    if (path.includes('/admin')) return 'admin'
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

  // Agregar botón temporal para acceder al admin (en producción sería con login)
  if (currentPage === 'home') {
    return (
      <>
        <LandingPage />
        {/* Botón temporal para acceder al admin - Oculto temporalmente */}
        {/*
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={navigateToAdmin}
            className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors"
          >
            Admin Panel
          </button>
        </div>
        */}
      </>
    )
  }

  if (currentPage === 'admin') {
    return (
      <>
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
      </>
    )
  }

  return <LandingPage />
}

export default App
