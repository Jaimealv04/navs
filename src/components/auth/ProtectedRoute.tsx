import type { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';

interface ProtectedRouteProps {
  children: ReactNode;
  requireRole?: 'admin' | 'user';
}

export function ProtectedRoute({ children, requireRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="text-white text-xl"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Cargando...
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Video de fondo */}
        <video 
          autoPlay 
          muted 
          loop 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <h1 className="text-3xl font-bold text-white mb-4">Acceso Denegado</h1>
            <p className="text-white/80 mb-6">Necesitas iniciar sesión para acceder a esta página.</p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-colors"
            >
              Volver al Inicio
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (requireRole && user.role !== requireRole) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Video de fondo */}
        <video 
          autoPlay 
          muted 
          loop 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <h1 className="text-3xl font-bold text-white mb-4">Permisos Insuficientes</h1>
            <p className="text-white/80 mb-6">No tienes permisos para acceder a esta página.</p>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-colors"
            >
              Ir al Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}