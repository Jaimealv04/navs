import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SpaceInfo {
  id: string;
  name: string;
  title: string;
  description: string;
  capacity: string;
  atmosphere: string;
  images: string[];
  highlights: string[];
}

const LocalSpaces: React.FC = () => {
  const [activeSpace, setActiveSpace] = useState<string>('sala');

  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: string]: number;
  }>({
    sala: 0,
    reservado: 0,
    terraza: 0,
  });

  const spaces: SpaceInfo[] = [
    {
      id: 'sala',
      name: 'Sala Principal',
      title: 'Ambiente Social',
      description:
        'Un espacio acogedor diseñado para momentos compartidos, donde cada detalle invita a la conversación y el disfrute.',
      capacity: '40-50 personas',
      atmosphere: 'Social y relajado',
      images: [
        '/FondoSalaPrincipal1.jpeg',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      ],
      highlights: ['Mesas compartidas', 'Música ambiente', 'Servicio completo'],
    },
    {
      id: 'reservado',
      name: 'Zona Reservado',
      title: 'Experiencia Exclusiva',
      description:
        'Un refugio íntimo para celebraciones especiales, donde la privacidad y la atención personalizada crean momentos únicos.',
      capacity: '8-12 personas',
      atmosphere: 'Íntimo y exclusivo',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1571669997387-4a74fceb1a74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      ],
      highlights: ['Espacio privado', 'Servicio dedicado', 'Carta premium'],
    },
    {
      id: 'terraza',
      name: 'Terraza',
      title: 'Aire Libre',
      description:
        'Conecta con el exterior en un ambiente natural y relajante, perfecto para disfrutar bajo el cielo de Madrid.',
      capacity: '20-25 personas',
      atmosphere: 'Natural y fresco',
      images: [
        '/FondoTerraza1.jpeg',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      ],
      highlights: ['Al aire libre', 'Vista panorámica', 'Ambiente natural'],
    },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [activeSpace]: (prev[activeSpace] + 1) % currentSpace.images.length,
    }));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [activeSpace]:
        prev[activeSpace] === 0
          ? currentSpace.images.length - 1
          : prev[activeSpace] - 1,
    }));
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [activeSpace]: index,
    }));
  };

  const currentSpace =
    spaces.find((space) => space.id === activeSpace) || spaces[0];

  return (
    <section id="local" className="relative bg-black py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Minimal Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-extralight mb-6 text-white tracking-tight">
            Espacios
          </h2>
          <div className="w-24 h-px bg-white/30 mx-auto"></div>
        </motion.div>

        {/* Simple Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div className="flex gap-1 bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/10">
            {spaces.map((space) => (
              <button
                key={space.id}
                onClick={() => setActiveSpace(space.id)}
                className={`relative px-8 py-3 rounded-full text-sm font-light transition-all duration-300 ${
                  activeSpace === space.id
                    ? 'text-black bg-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {space.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSpace}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            {/* Image Carousel */}
            <div className="relative overflow-hidden rounded-lg group">
              {/* Main Image */}
              <motion.img
                key={`${activeSpace}-${currentImageIndex[activeSpace]}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={currentSpace.images[currentImageIndex[activeSpace]]}
                alt={`${currentSpace.name} - Imagen ${
                  currentImageIndex[activeSpace] + 1
                }`}
                className="w-full h-[400px] lg:h-[500px] object-cover transition-all duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20"></div>

              {/* Navigation Arrows */}
              {currentSpace.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {currentSpace.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {currentSpace.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentImageIndex[activeSpace] === index
                          ? 'bg-white'
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Image Counter */}
              {currentSpace.images.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm z-10">
                  {currentImageIndex[activeSpace] + 1} /{' '}
                  {currentSpace.images.length}
                </div>
              )}
            </div>

            {/* Text Content */}
            <div className="space-y-8">
              <div>
                <h3 className="text-4xl md:text-5xl font-extralight text-white mb-4 tracking-tight">
                  {currentSpace.title}
                </h3>
                <p className="text-white/70 text-lg leading-relaxed font-light">
                  {currentSpace.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                {currentSpace.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <span className="text-white/60 text-sm font-light">
                      {highlight}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Simple Info Grid */}
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-widest mb-2">
                    Capacidad
                  </p>
                  <p className="text-white font-light">
                    {currentSpace.capacity}
                  </p>
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-widest mb-2">
                    Ambiente
                  </p>
                  <p className="text-white font-light">
                    {currentSpace.atmosphere}
                  </p>
                </div>
              </div>

              {/* Special Info for Reservado - Minimal Version */}
              {activeSpace === 'reservado' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 mt-8"
                >
                  <h4 className="text-white text-lg font-light mb-4">
                    Información del Reservado
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Reserva mínima</span>
                      <span className="text-white">3 horas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Consumición mínima</span>
                      <span className="text-white">150€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Servicio</span>
                      <span className="text-white">Camarero dedicado</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LocalSpaces;
