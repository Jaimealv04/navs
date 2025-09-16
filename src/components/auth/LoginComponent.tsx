import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

interface LoginComponentProps {
  onToggleMode: () => void;
}

export function LoginComponent({ onToggleMode }: LoginComponentProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de autenticación');
    } finally {
      setIsLoading(false);
    }
  };

  const fillTestCredentials = (type: 'admin' | 'user') => {
    if (type === 'admin') {
      setEmail('admin@test.com');
      setPassword('admin123');
    } else {
      setEmail('user@test.com');
      setPassword('user123');
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
            <p className="text-white/80">Iniciar Sesión</p>
          </div>

          {/* Botones de credenciales de prueba */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.button
              type="button"
              onClick={() => fillTestCredentials('admin')}
              className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-400/30 rounded-full text-sm hover:bg-red-600/30 transition-colors"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Admin Test
            </motion.button>
            <motion.button
              type="button"
              onClick={() => fillTestCredentials('user')}
              className="px-4 py-2 bg-blue-600/20 text-blue-400 border border-blue-400/30 rounded-full text-sm hover:bg-blue-600/30 transition-colors"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              User Test
            </motion.button>
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
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </motion.button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={onToggleMode}
              className="text-white/80 hover:text-white transition-colors"
            >
              ¿No tienes cuenta? <span className="underline">Regístrate</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}