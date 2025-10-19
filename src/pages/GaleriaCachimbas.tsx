import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import {
  shishaData,
  getShishasByCategory,
  type ShishaItem,
} from '../data/shishaData';

const GaleriaCachimbas: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('todas');
  const [selectedShisha, setSelectedShisha] = useState<ShishaItem | null>(null);

  // Obtener las cachimbas según la categoría seleccionada
  const currentShishas = getShishasByCategory(
    activeCategory === 'todas' ? undefined : activeCategory
  );

  const handleGoBack = () => {
    navigate('/');
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Categorías disponibles (solo "Todas" por ahora)
  const categories = [
    { id: 'todas', name: 'Todas' },
    { id: 'DARKSIDE', name: 'DARKSIDE' },
    { id: 'VOODOO', name: 'VOODOO' },
    { id: 'ALPHA', name: 'ALPHA' },
    { id: 'VZ', name: 'VZ' },
    { id: 'SHI CARVER', name: 'SHI CARVER' },
    { id: 'HOOB', name: 'HOOB' },
    { id: 'ZAR', name: 'ZAR' },
    { id: 'SAPONA', name: 'SAPONA' },
    { id: 'CONCEPTIC', name: 'CONCEPTIC' },
    { id: 'SNIS', name: 'SNIS' },
    { id: 'MIG', name: 'MIG' },
    { id: 'REGAL', name: 'REGAL' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead
        title="Galería de Cachimbas - EGO HOUSE Madrid"
        description="Explora nuestra amplia selección de cachimbas premium en EGO HOUSE Madrid. Descubre diferentes estilos y diseños de hookah para tu experiencia perfecta."
        keywords="galería cachimbas madrid, hookah gallery madrid, pipas agua madrid, cachimbas premium madrid, ego house cachimbas, shisha gallery madrid, cachimbas diseño madrid, hookahs madrid centro, galería shisha madrid, cachimbas exclusivas madrid"
        url="https://www.egohousebynavs.com/galeria-cachimbas"
        image="https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180347/_5047204_ketf7p.jpg"
      />

      {/* Botón de volver fijo */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={handleGoBack}
        className="fixed top-6 left-6 z-50 flex items-center space-x-2 bg-black/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-black/40 transition-all duration-300"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Volver</span>
      </motion.button>

      <div className="min-h-screen bg-black ">
        {/* Banner superior */}
        <div className="relative h-64 md:h-100 overflow-hidden">
          <img
            src="https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180347/_5047204_ketf7p.jpg"
            alt="Banner galería de cachimbas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* Título */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-light text-white text-center font-['Poppins'] [text-shadow:_0_4px_12px_rgb(0_0_0_/_50%)]"
            >
              Galería de Cachimbas
            </motion.h1>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tabs de categorías */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10">
              <div className="flex flex-wrap gap-1">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      scale: { type: 'spring', stiffness: 400, damping: 25 },
                    }}
                    className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-500 overflow-hidden group ${
                      activeCategory === category.id
                        ? 'text-black shadow-lg shadow-white/25'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {/* Background animado para el tab activo */}
                    {activeCategory === category.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 rounded-xl"
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Efecto de brillo en hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />

                    {/* Texto del tab */}
                    <span className="relative z-10 font-['Poppins'] tracking-wide">
                      {category.name}
                    </span>

                    {/* Indicador de cantidad para cada categoría */}
                    <span className="relative z-10 ml-2 text-xs bg-black/20 px-2 py-1 rounded-full">
                      {category.id === 'todas'
                        ? shishaData.length
                        : getShishasByCategory(category.id).length}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Grid de imágenes */}
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {currentShishas.map((shisha) => (
              <motion.div
                key={shisha.id}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { type: 'spring', stiffness: 400, damping: 25 },
                }}
                className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm cursor-pointer"
                onClick={() => setSelectedShisha(shisha)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={shisha.imageUrl}
                    alt={shisha.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Overlay en hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                {/* Información de la cachimba */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white text-sm font-medium">
                    {shisha.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mensaje si no hay imágenes */}
          {currentShishas.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-white/60 text-lg">
                No hay cachimbas disponibles en esta categoría
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Modal para imagen ampliada */}
      {selectedShisha && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedShisha(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        >
          {/* Botón de cerrar */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            onClick={() => setSelectedShisha(null)}
            className="absolute top-6 right-6 z-60 flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-colors duration-300"
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* Contenedor de la imagen y información */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] w-full"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10">
              <img
                src={selectedShisha.imageUrl}
                alt={selectedShisha.name}
                className="w-full h-96 object-cover"
              />

              {/* Información de la cachimba */}
              <div className="p-6 text-white">
                <h2 className="text-2xl font-semibold mb-3">
                  {selectedShisha.name}
                </h2>
                {selectedShisha.category && (
                  <span className="inline-block bg-white/10 px-3 py-1 rounded-full text-sm text-white/90 capitalize">
                    {selectedShisha.category}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default GaleriaCachimbas;
