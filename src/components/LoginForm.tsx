import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Eye, EyeOff, User, Lock, Mail } from 'lucide-react';
import { useAuth } from '../hooks';

interface LoginFormProps {
  onBack: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  
  const { login, register, isLoading, error, clearError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      if (isLogin) {
        await login({ email, password });
      } else {
        await register({ email, password, name });
      }
      // Si llega aquí, la autenticación fue exitosa
      onBack(); // Volver a la página principal
    } catch (error) {
      // El error ya se maneja en el contexto
      console.error('Auth error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Back button - Fixed position */}
      <motion.button
        onClick={onBack}
        className="fixed top-6 left-6 z-50 flex items-center text-white/70 hover:text-white transition-colors bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full"
        whileHover={{ x: -2, scale: 1.05 }}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <ChevronLeft className="w-5 h-5 mr-2" />
        Volver
      </motion.button>

      {/* Desktop Layout - Diagonal Split */}
      <div className="hidden lg:flex min-h-screen relative">
        {/* Left Side - Image with Info (MÁS GRANDE) */}
        <motion.div
          className="flex-[3] relative overflow-hidden"
          style={{
            clipPath: 'polygon(0 0, 80% 0, 65% 100%, 0 100%)',
          }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/hookas.jpg)',
              transform: 'scale(1.05)'
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-end p-12 pb-24">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-5xl font-extralight mb-6 leading-tight">
                Experiencia<br />
                <span className="text-white/80">Sensorial</span>
              </h2>
              <p className="text-xl text-white/80 font-light mb-8 max-w-md">
                Sumérgete en un mundo de sabores únicos y momentos inolvidables
              </p>
              <div className="space-y-4 text-white/70">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white/60 rounded-full" />
                  <span>Cachimbas premium de todo el mundo</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white/60 rounded-full" />
                  <span>Ambiente único y exclusivo</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white/60 rounded-full" />
                  <span>Gastronomía de autor</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Form CENTRADO */}
        <motion.div
          className="flex-1 relative overflow-hidden bg-black flex items-center justify-center"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="w-full px-12">
            {/* Header */}
            <div className="text-center mb-12">
              <motion.h1
                className="text-3xl font-extralight mb-4 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {isLogin ? 'Bienvenido' : 'Únete'}
              </motion.h1>
              <motion.p
                className="text-white/60 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {isLogin ? 'Accede a tu experiencia EGO' : 'Crea tu cuenta EGO'}
              </motion.p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 max-w-sm mx-auto">
              {/* Name field - only for registration */}
              {!isLogin && (
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:bg-white/10 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    placeholder="Nombre completo"
                    required
                  />
                </motion.div>
              )}

              {/* Email field */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isLogin ? 1.0 : 1.1 }}
              >
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:bg-white/10 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                  placeholder="Email"
                  required
                />
              </motion.div>

              {/* Password field */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isLogin ? 1.1 : 1.2 }}
              >
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:bg-white/10 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                  placeholder="Contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </motion.div>
              

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm text-center bg-red-900/20 border border-red-500/30 rounded-lg p-3"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 bg-white text-black rounded-lg font-medium transition-all duration-300 text-lg ${
                  isLoading 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-white/90 hover:scale-[1.02] hover:-translate-y-0.5'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isLogin ? 1.2 : 1.3 }}
                whileHover={!isLoading ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                {isLoading ? 'Cargando...' : (isLogin ? 'Acceder' : 'Crear cuenta')}
              </motion.button>
            </form>

            {/* Toggle login/register */}
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <p className="text-white/60">
                {isLogin ? '¿Primera vez en EGO?' : '¿Ya tienes cuenta?'}
              </p>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:text-white/80 transition-colors font-medium mt-2"
              >
                {isLogin ? 'Crear cuenta nueva' : 'Iniciar sesión'}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Layout - Background image with form overlay */}
      <div className="lg:hidden min-h-screen relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/hookas.jpg)' }}
        />

        {/* Blur Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
          <motion.div
            className="w-full max-w-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.h1
                className="text-3xl font-extralight mb-3 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {isLogin ? 'Bienvenido' : 'Únete'}
              </motion.h1>
              <motion.p
                className="text-white/70 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {isLogin ? 'Accede a EGO HOUSE' : 'Crea tu cuenta'}
              </motion.p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name field - only for registration */}
              {!isLogin && (
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-white/40 focus:bg-white/15 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    placeholder="Nombre completo"
                    required
                  />
                </motion.div>
              )}

              {/* Email field */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isLogin ? 0.5 : 0.6 }}
              >
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-white/40 focus:bg-white/15 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                  placeholder="Email"
                  required
                />
              </motion.div>

              {/* Password field */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isLogin ? 0.6 : 0.7 }}
              >
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-white/40 focus:bg-white/15 focus:outline-none transition-all duration-300 backdrop-blur-sm"
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

              {/* Error message - Mobile */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm text-center bg-red-900/20 border border-red-500/30 rounded-lg p-3"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 bg-white text-black rounded-lg font-medium transition-all duration-300 ${
                  isLoading 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-white/90'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isLogin ? 0.7 : 0.8 }}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                {isLoading ? 'Cargando...' : (isLogin ? 'Acceder' : 'Crear cuenta')}
              </motion.button>
            </form>

            {/* Toggle login/register */}
            <motion.div
              className="text-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <p className="text-white/70 text-sm">
                {isLogin ? '¿Primera vez?' : '¿Ya tienes cuenta?'}
              </p>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:text-white/80 transition-colors font-medium mt-1"
              >
                {isLogin ? 'Crear cuenta' : 'Iniciar sesión'}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
