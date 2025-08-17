import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hook para detectar el scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil cuando se hace scroll
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Prevenir scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const menuItems = [
    { name: 'Inicio', id: 'hero' },
    { name: 'Carta', id: 'menu' },
    { name: 'Ubicación', id: 'location' },
    // { name: 'Galería', id: 'gallery' }, // Oculto temporalmente
    // { name: 'Eventos', id: 'events' }, // Oculto temporalmente
    { name: 'Contacto', id: 'contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/90 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo - Más simple */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center"
            >
              <span className="text-2xl font-light text-white tracking-wider">
                EGO HOUSE
              </span>
            </motion.div>

            {/* Desktop Navigation - Más limpio */}
            <div className="hidden md:flex items-center gap-1">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ y: -1 }}
                  className="px-6 py-2 text-white/70 hover:text-white transition-colors duration-300 text-sm font-medium"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>

            {/* Desktop Login Button - Más minimalista */}
            <motion.button
              onClick={onLoginClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden md:block px-6 py-2 text-white border border-white/20 rounded-full hover:bg-white/5 transition-all duration-300 text-sm font-medium"
            >
              Acceder
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors duration-300"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-72 bg-black/95 backdrop-blur-md z-50 md:hidden"
            >
              <div className="flex flex-col h-full p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-12 pt-4">
                  <span className="text-xl font-light text-white tracking-wider">
                    EGO HOUSE
                  </span>
                  <motion.button
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    className="p-2 text-white/70 hover:text-white"
                  >
                    <X size={18} />
                  </motion.button>
                </div>

                {/* Menu Items */}
                <div className="flex-1 space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-full text-left p-4 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
                      onClick={() => scrollToSection(item.id)}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </div>

                {/* Login Button */}
                <motion.button
                  onClick={() => {
                    onLoginClick();
                    setMobileMenuOpen(false);
                  }}
                  whileHover={{ scale: 1.02 }}
                  className="w-full border border-white/20 text-white py-3 px-6 rounded-full hover:bg-white/5 transition-all duration-300"
                >
                  Acceder
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
