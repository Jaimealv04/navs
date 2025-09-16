import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Eye, EyeOff, User, Lock, Mail } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface LoginFormProps {
  onBack: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Por favor completa todos los campos');
      setIsLoading(false);
      return;
    }

    if (!isLogin && password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, name);
      }
      // El hook de auth manejará la redirección automáticamente
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de autenticación');
    } finally {
      setIsLoading(false);
    }
  };

  const fillTestCredentials = (type: 'admin' | 'user') => {
    if (type === 'admin') {
      setEmail('admin@example.com');
      setPassword('admin123');
    } else {
      setEmail('user@example.com');
      setPassword('user123');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back button */}
        <motion.button
          onClick={onBack}
          className="flex items-center text-white/70 hover:text-white transition-colors mb-12"
          whileHover={{ x: -2 }}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Volver
        </motion.button>

        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-3xl md:text-4xl font-light mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {isLogin ? 'Bienvenido' : 'Crear cuenta'}
          </motion.h1>
          <motion.p
            className="text-white/70 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {isLogin ? 'Accede a tu experiencia' : 'Únete a la experiencia'}
          </motion.p>
        </div>

        {/* Botones de credenciales de prueba - solo en modo login */}
        {isLogin && (
          <motion.div 
            className="grid grid-cols-2 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button
              type="button"
              onClick={() => fillTestCredentials('admin')}
              className="px-4 py-3 bg-red-600/20 text-red-400 border border-red-400/30 rounded-lg text-sm hover:bg-red-600/30 transition-colors font-medium"
            >
              🔑 Admin Test
            </button>
            <button
              type="button"
              onClick={() => fillTestCredentials('user')}
              className="px-4 py-3 bg-blue-600/20 text-blue-400 border border-blue-400/30 rounded-lg text-sm hover:bg-blue-600/30 transition-colors font-medium"
            >
              👤 User Test
            </button>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error message */}
          {error && (
            <motion.div 
              className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="flex items-center space-x-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            </motion.div>
          )}
          {/* Name field - only for registration */}
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-transparent border border-white/20 rounded-lg focus:border-white focus:outline-none transition-all duration-300"
                placeholder="Nombre completo"
              />
            </motion.div>
          )}

          {/* Email field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isLogin ? 0.4 : 0.5 }}
            className="relative"
          >
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-transparent border border-white/20 rounded-lg focus:border-white focus:outline-none transition-all duration-300"
              placeholder="Email"
              required
            />
          </motion.div>

          {/* Password field */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isLogin ? 0.5 : 0.6 }}
          >
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-transparent border border-white/20 rounded-lg focus:border-white focus:outline-none transition-all duration-300"
              placeholder="Contraseña"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </motion.div>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isLogin ? 0.6 : 0.7 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                <span>{isLogin ? 'Iniciando sesión...' : 'Creando cuenta...'}</span>
              </div>
            ) : (
              isLogin ? 'Acceder' : 'Crear cuenta'
            )}
          </motion.button>
        </form>

        {/* Toggle login/register */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-white/70">
            {isLogin ? '¿Primera vez?' : '¿Ya tienes cuenta?'}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-white hover:text-white/80 transition-colors underline mt-1"
          >
            {isLogin ? 'Crear cuenta' : 'Iniciar sesión'}
          </button>
        </motion.div>

        {/* Demo notice */}
        <motion.div
          className="mt-8 p-4 border border-white/10 rounded-lg text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <p className="text-white/50 text-sm">
            Modo demostración - Los datos no se almacenan
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
