import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, User, Lock, Eye, EyeOff, Mail, UserPlus, LogIn } from 'lucide-react';

interface LoginFormProps {
  onBack: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación
    console.log('Auth attempt:', { email, password, isLogin, name });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <motion.div
        className="w-full max-w-2xl relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Back button */}
        <motion.button
          onClick={onBack}
          className="flex items-center text-gray-300 hover:text-white transition-colors mb-8 text-lg font-medium"
          whileHover={{ x: -8 }}
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ChevronLeft className="w-6 h-6 mr-2" />
          Volver
        </motion.button>

        {/* Form container */}
        <motion.div
          className="bg-gray-900/40 backdrop-blur-xl border border-white/20 rounded-3xl p-8 lg:p-12 shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl backdrop-blur-sm border border-purple-400/30 mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
            >
              {isLogin ? (
                <LogIn className="w-10 h-10 text-purple-400" />
              ) : (
                <UserPlus className="w-10 h-10 text-purple-400" />
              )}
            </motion.div>

            <motion.h1
              className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {isLogin ? 'Bienvenido de Vuelta' : 'Únete a NABS'}
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {isLogin
                ? 'Accede a tu experiencia personalizada y favoritos guardados'
                : 'Crea tu cuenta y comienza tu viaje hacia la experiencia perfecta'
              }
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name field - only for registration */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label className="block text-lg font-medium mb-3 text-gray-200">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 text-lg bg-gray-800/50 border-2 border-gray-600 rounded-2xl focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
              </motion.div>
            )}

            {/* Email field */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: isLogin ? 0.6 : 0.7 }}
            >
              <label className="block text-lg font-medium mb-3 text-gray-200">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 text-lg bg-gray-800/50 border-2 border-gray-600 rounded-2xl focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </motion.div>

            {/* Password field */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: isLogin ? 0.7 : 0.8 }}
            >
              <label className="block text-lg font-medium mb-3 text-gray-200">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-14 py-4 text-lg bg-gray-800/50 border-2 border-gray-600 rounded-2xl focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
              </div>
            </motion.div>

            {/* Submit button */}
            <motion.button
              type="submit"
              className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-[1.02]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isLogin ? 0.8 : 0.9, duration: 0.8 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLogin ? 'Iniciar Sesión' : 'Crear Mi Cuenta'}
            </motion.button>
          </form>

          {/* Toggle login/register */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <p className="text-lg text-gray-300">
              {isLogin ? '¿Primera vez en NABS?' : '¿Ya tienes una cuenta?'}
            </p>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="mt-2 text-xl font-semibold text-purple-400 hover:text-purple-300 transition-colors hover:underline"
            >
              {isLogin ? 'Crear Cuenta Nueva' : 'Iniciar Sesión'}
            </button>
          </motion.div>

          {/* Additional features for login */}
          {isLogin && (
            <motion.div
              className="flex justify-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <button className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
                ¿Olvidaste tu contraseña?
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Sketch/Demo Notice */}
        <motion.div
          className="mt-8 p-6 bg-amber-500/10 backdrop-blur-sm border border-amber-500/30 rounded-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
            <p className="text-amber-200 text-lg font-medium text-center">
              ⚠️ Modo Demostración - Los datos no se almacenan realmente
            </p>
          </div>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl -z-10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <motion.div
          className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl -z-10"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
      </motion.div>
    </div>
  );
};

export default LoginForm;
