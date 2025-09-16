import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

export function Dashboard() {
  const { user, logout } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Datos mock para el admin
  const mockData = {
    totalReservations: 47,
    totalRevenue: 12850,
    activeUsers: 156,
    averageRating: 4.8
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Video de fondo */}
      <video 
        autoPlay 
        muted 
        loop 
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <motion.div
        className="relative z-10 container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div 
          className="flex justify-between items-center mb-12"
          variants={itemVariants}
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard EGO HOUSE</h1>
            <p className="text-white/80">
              Bienvenido{user?.name && `, ${user.name}`} | {user?.role === 'admin' ? 'Administrador' : 'Usuario'}
            </p>
          </div>
          <button
            onClick={logout}
            className="px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
          >
            Cerrar Sesión
          </button>
        </motion.div>

        {user?.role === 'admin' ? (
          <>
            {/* Dashboard Admin */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
              variants={itemVariants}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white/80 mb-2">Reservaciones</h3>
                <p className="text-3xl font-bold text-white">{mockData.totalReservations}</p>
                <p className="text-green-400 text-sm mt-2">+12% este mes</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white/80 mb-2">Ingresos</h3>
                <p className="text-3xl font-bold text-white">${mockData.totalRevenue.toLocaleString()}</p>
                <p className="text-green-400 text-sm mt-2">+8% este mes</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white/80 mb-2">Usuarios Activos</h3>
                <p className="text-3xl font-bold text-white">{mockData.activeUsers}</p>
                <p className="text-blue-400 text-sm mt-2">+23% este mes</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white/80 mb-2">Calificación</h3>
                <p className="text-3xl font-bold text-white">{mockData.averageRating}/5</p>
                <p className="text-yellow-400 text-sm mt-2">Excelente</p>
              </div>
            </motion.div>

            {/* Funciones Admin */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={itemVariants}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">Gestión de Reservas</h3>
                <p className="text-white/80 mb-6">Administra las reservaciones de mesas y eventos.</p>
                <button className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-colors">
                  Ver Reservas
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">Gestión de Usuarios</h3>
                <p className="text-white/80 mb-6">Administra los usuarios y sus permisos.</p>
                <button className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-colors">
                  Ver Usuarios
                </button>
              </div>
            </motion.div>
          </>
        ) : (
          <>
            {/* Dashboard Usuario */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={itemVariants}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">Mis Reservas</h3>
                <p className="text-white/80 mb-6">Ver y gestionar tus reservaciones.</p>
                <button className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-colors">
                  Ver Reservas
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">Nueva Reserva</h3>
                <p className="text-white/80 mb-6">Reserva una mesa para tu próxima visita.</p>
                <button className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-colors">
                  Reservar Mesa
                </button>
              </div>
            </motion.div>

            <motion.div 
              className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Perfil de Usuario</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-white/80">Email:</label>
                  <p className="text-white font-semibold">{user?.email}</p>
                </div>
                {user?.name && (
                  <div>
                    <label className="text-white/80">Nombre:</label>
                    <p className="text-white font-semibold">{user.name}</p>
                  </div>
                )}
                <div>
                  <label className="text-white/80">Rol:</label>
                  <p className="text-white font-semibold">{(user?.role as string) === 'admin' ? 'Administrador' : 'Usuario'}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}