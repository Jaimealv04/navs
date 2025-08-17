import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MediaItem } from '../data/galleryData';
import { mockGalleryItems } from '../data/galleryData';
import { X, Play, Image, Search, Heart, Share } from 'lucide-react';

const Gallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode] = useState<'grid' | 'masonry'>('masonry');

  const categories = [
    { id: 'all', name: 'Todo', icon: '🖼️' },
    { id: 'ambiente', name: 'Ambiente', icon: '✨' },
    { id: 'cachimbas', name: 'Cachimbas', icon: '💨' },
    { id: 'gastronomia', name: 'Gastronomía', icon: '🍽️' },
    { id: 'eventos', name: 'Eventos', icon: '🎉' },
    { id: 'instalaciones', name: 'Instalaciones', icon: '🏢' },
  ];

  const filteredItems = mockGalleryItems.filter(item => {
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleShare = (item: MediaItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href + `#${item.id}`
      });
    } else {
      // Fallback - copiar al clipboard
      navigator.clipboard.writeText(window.location.href + `#${item.id}`);
      alert('Enlace copiado al portapapeles');
    }
  };

  return (
    <section id="gallery" className="relative bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extralight mb-4 tracking-tight">
            Galería
          </h2>
          <p className="text-white/70 font-light text-lg max-w-2xl mx-auto">
            Descubre la experiencia EGO HOUSE a través de nuestras imágenes y videos
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar en la galería..."
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-white/40 focus:outline-none transition-all duration-300 text-white placeholder-white/50"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <motion.button
                key={category.id}
                onClick={() => setFilterCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                  filterCategory === category.id
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <span>{category.icon}</span>
                <span className="font-light">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-white/70">
            {filteredItems.length} {filteredItems.length === 1 ? 'elemento' : 'elementos'} encontrados
          </p>
        </div>

        {/* Gallery Grid */}
        <div className={`grid gap-4 ${
          viewMode === 'grid'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}>
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`relative group cursor-pointer overflow-hidden rounded-lg ${
                viewMode === 'masonry' && index % 3 === 0 ? 'md:row-span-2' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedItem(item)}
              whileHover={{ scale: 1.02 }}
              style={{ aspectRatio: viewMode === 'masonry' && index % 3 === 0 ? '3/4' : '4/3' }}
            >
              {/* Image/Video Thumbnail */}
              <div className="relative w-full h-full">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <>
                    <img
                      src={item.thumbnail || item.url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                  </>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-medium mb-1">{item.title}</h3>
                  <p className="text-white/80 text-sm line-clamp-2">{item.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.slice(0, 2).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/20 rounded-full text-xs text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Type indicator */}
                <div className="absolute top-3 right-3">
                  <div className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                    {item.type === 'image' ? (
                      <Image className="w-4 h-4 text-white" />
                    ) : (
                      <Play className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>

                {/* Featured badge */}
                {item.featured && (
                  <div className="absolute top-3 left-3">
                    <div className="px-2 py-1 bg-yellow-500 rounded-full text-xs font-medium text-black">
                      Destacado
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white/50" />
            </div>
            <h3 className="text-xl font-medium mb-2">No se encontraron resultados</h3>
            <p className="text-white/70">Intenta con otros términos de búsqueda o filtros</p>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-full bg-black/50 backdrop-blur-xl rounded-2xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Media */}
              <div className="relative">
                {selectedItem.type === 'image' ? (
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.title}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                ) : (
                  <video
                    src={selectedItem.url}
                    controls
                    autoPlay
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                )}
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-light mb-2">{selectedItem.title}</h3>
                    <p className="text-white/80 mb-4">{selectedItem.description}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedItem.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/20 rounded-full text-sm text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleShare(selectedItem)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Share className="w-4 h-4" />
                    Compartir
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    Me gusta
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
