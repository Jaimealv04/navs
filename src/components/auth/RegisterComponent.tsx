import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

interface RegisterComponentProps {
  onToggleMode: () => void;
}

export function RegisterComponent({ onToggleMode }: RegisterComponentProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await register(email, password, name);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en el registro');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

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
        className="relative z-10 w-full max-w-md mx-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">EGO HOUSE</h1>
            <p className="text-white/80">Crear Cuenta</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div 
                className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {error}
              </motion.div>
            )}

            <div>
              <input
                type="text"
                placeholder="Nombre (opcional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/60 focus:outline-none focus:border-white/40 backdrop-blur-sm"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/60 focus:outline-none focus:border-white/40 backdrop-blur-sm"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/60 focus:outline-none focus:border-white/40 backdrop-blur-sm"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black py-4 rounded-full font-semibold hover:bg-white/90 transition-colors disabled:opacity-50"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </motion.button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={onToggleMode}
              className="text-white/80 hover:text-white transition-colors"
            >
              ¿Ya tienes cuenta? <span className="underline">Inicia sesión</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}