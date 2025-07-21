import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SurveyForm from '../components/SurveyForm';
import LoginForm from '../components/LoginForm';

const LandingPage: React.FC = () => {
  const [showSurvey, setShowSurvey] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const stats = [
    { label: 'Sabores Premium', value: '50+', description: 'Mezclas artesanales exclusivas' },
    { label: 'Experiencias Únicas', value: '100+', description: 'Sesiones personalizadas' },
    { label: 'Atención Profesional', value: '24/7', description: 'Servicio premium continuo' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  const smokeVariants = {
    animate: {
      y: [-30, -80, -30],
      x: [-10, 10, -10],
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.3, 1],
      transition: {
        duration: 12,
        repeat: Infinity
      }
    }
  };

  if (showSurvey) {
    return <SurveyForm onBack={() => setShowSurvey(false)} />;
  }

  if (showLogin) {
    return <LoginForm onBack={() => setShowLogin(false)} />;
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Main gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(75,85,99,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(79,70,229,0.2),transparent_50%)]" />

        {/* Animated smoke effects */}
        <motion.div
          variants={smokeVariants}
          animate="animate"
          className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-gray-600/15 to-slate-600/10 rounded-full blur-3xl"
        />
        <motion.div
          variants={smokeVariants}
          animate="animate"
          style={{ animationDelay: '3s' }}
          className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-full blur-3xl"
        />
        <motion.div
          variants={smokeVariants}
          animate="animate"
          style={{ animationDelay: '6s' }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-slate-600/8 to-gray-600/8 rounded-full blur-3xl"
        />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20 blur-sm"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -120, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 8,
            }}
          />
        ))}
      </div>

      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-50 flex justify-between items-center p-6 lg:p-8"
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-75"></div>
            <div className="relative bg-slate-900 rounded-xl p-3 border border-indigo-500/30 flex items-center justify-center">
              <div className="w-6 h-6 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              NAVS
            </span>
            <span className="text-xs text-slate-400 font-medium">EXPERIENCE</span>
          </div>
        </motion.div>

        {/* Navigation Menu */}
        <div className="hidden md:flex items-center gap-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="text-slate-300 hover:text-white transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-slate-800/50 font-medium"
          >
            Inicio
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="text-slate-300 hover:text-white transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-slate-800/50 font-medium"
          >
            Experiencias
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="text-slate-300 hover:text-white transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-slate-800/50 font-medium"
          >
            Reservas
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="text-slate-300 hover:text-white transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-slate-800/50 font-medium"
          >
            Contacto
          </motion.button>
        </div>

        {/* Login Button */}
        <motion.button
          onClick={() => setShowLogin(true)}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-slate-800/60 backdrop-blur-xl rounded-full text-slate-300 hover:text-white transition-all duration-300 border border-slate-600/50 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/20 font-medium"
        >
          Iniciar Sesión
        </motion.button>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* Premium Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-full blur-lg opacity-60 animate-pulse-slow"></div>
              <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-full px-8 py-4 border border-indigo-500/30 flex items-center gap-4">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-semibold text-lg">
                  Experiencia Premium de Shisha
                </span>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
          >
            <span className="text-white block mb-4">Descubre el Arte de</span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent block relative">
              NAVS Experience
              <motion.div
                className="absolute -top-4 -right-8 w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl text-slate-300 mb-16 max-w-5xl mx-auto leading-relaxed"
          >
            <span className="text-white font-light">Donde cada sesión es una</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent font-medium">
              experiencia sensorial única
            </span>
          </motion.p>

          {/* CTA Buttons with Dropdowns */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-20"
          >
            {/* Primary CTA */}
            <motion.button
              onClick={() => setShowSurvey(true)}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 25px 50px rgba(79, 70, 229, 0.4)',
                filter: 'brightness(1.1)'
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-full lg:w-auto overflow-hidden z-20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300">
                <div className="flex items-center justify-center gap-4 text-xl">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="font-medium">Crear Mi Experiencia</span>
                  <motion.span
                    className="text-2xl"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </motion.button>
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 + index * 0.2 }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  boxShadow: '0 20px 40px rgba(79, 70, 229, 0.3)'
                }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 group-hover:border-indigo-500/50 transition-all duration-300">
                  <div className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-lg text-slate-300 group-hover:text-white transition-colors duration-300 mb-2 font-medium">
                    {stat.label}
                  </div>
                  <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="border-t border-slate-700/50 pt-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-400 text-lg">
              <div className="flex items-center justify-center gap-3">
                <motion.div
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="hover:text-white transition-colors duration-300 font-medium">Abierto hasta las 2:00 AM</span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <motion.div
                  className="w-3 h-3 bg-orange-400 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <span className="hover:text-white transition-colors duration-300 font-medium">Carbones Premium Naturales</span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <motion.div
                  className="w-3 h-3 bg-purple-400 rounded-full"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="hover:text-white transition-colors duration-300 font-medium">Ambiente VIP Exclusivo</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Floating Decorative Elements */}
      <div className="absolute top-32 left-16 w-32 h-32 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-full backdrop-blur-xl border border-white/5 hidden lg:block">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity
          }}
          className="w-full h-full rounded-full border border-indigo-400/20"
        />
      </div>

      <div className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 rounded-full backdrop-blur-xl border border-white/5 hidden lg:block">
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity
          }}
          className="w-full h-full rounded-full border border-purple-400/20"
        />
      </div>

      <div className="absolute top-1/2 left-12 w-20 h-20 bg-gradient-to-r from-slate-500/5 to-gray-500/5 rounded-full backdrop-blur-xl border border-white/5 hidden lg:block">
        <motion.div
          animate={{
            rotate: [0, 180, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity
          }}
          className="w-full h-full rounded-full border border-slate-400/20"
        />
      </div>
    </section>
  );
};

export default LandingPage;
