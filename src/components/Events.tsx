import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Event } from '../data/galleryData';
import { mockEvents } from '../data/galleryData';
import { Calendar, Clock, MapPin, Users, Euro, Tag, Search, ArrowRight, Phone, Mail, Heart, Share2 } from 'lucide-react';

const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const statusOptions = [
    { id: 'all', name: 'Todos', color: 'bg-white/10' },
    { id: 'upcoming', name: 'Próximos', color: 'bg-green-500' },
    { id: 'ongoing', name: 'En curso', color: 'bg-blue-500' },
    { id: 'completed', name: 'Completados', color: 'bg-gray-500' },
    { id: 'cancelled', name: 'Cancelados', color: 'bg-red-500' },
  ];

  const categoryOptions = [
    { id: 'all', name: 'Todas', icon: '📅' },
    { id: 'musica', name: 'Música', icon: '🎵' },
    { id: 'gastronomia', name: 'Gastronomía', icon: '🍽️' },
    { id: 'fiesta', name: 'Fiestas', icon: '🎉' },
    { id: 'educativo', name: 'Educativo', icon: '📚' },
    { id: 'entretenimiento', name: 'Entretenimiento', icon: '🎪' },
  ];

  const filteredEvents = mockEvents.filter(event => {
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5); // Remove seconds
  };

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find(opt => opt.id === status);
    return statusOption?.color || 'bg-gray-500';
  };

  const handleShare = (event: Event) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href + `#event-${event.slug}`
      });
    } else {
      navigator.clipboard.writeText(window.location.href + `#event-${event.slug}`);
      alert('Enlace copiado al portapapeles');
    }
  };

  const handleBooking = (event: Event) => {
    if (event.contact?.whatsapp) {
      const message = `Hola, me interesa el evento "${event.title}" del ${formatDate(event.date)}. ¿Podrían darme más información?`;
      window.open(`https://wa.me/${event.contact.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  return (
    <section id="events" className="relative bg-black text-white py-24">
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
            Eventos
          </h2>
          <p className="text-white/70 font-light text-lg max-w-2xl mx-auto">
            Descubre nuestros próximos eventos y vive experiencias únicas en EGO HOUSE
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar eventos..."
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-white/40 focus:outline-none transition-all duration-300 text-white placeholder-white/50"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap gap-2">
            {statusOptions.map(status => (
              <motion.button
                key={status.id}
                onClick={() => setFilterStatus(status.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                  filterStatus === status.id
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${status.color}`} />
                <span className="font-light">{status.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map(category => (
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
            {filteredEvents.length} {filteredEvents.length === 1 ? 'evento' : 'eventos'} encontrados
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Status badge */}
                <div className="absolute top-4 left-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(event.status)}`}>
                    {statusOptions.find(s => s.id === event.status)?.name}
                  </div>
                </div>

                {/* Featured badge */}
                {event.featured && (
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 bg-yellow-500 rounded-full text-xs font-medium text-black">
                      Destacado
                    </div>
                  </div>
                )}

                {/* Price */}
                {event.price && (
                  <div className="absolute bottom-4 right-4">
                    <div className="px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-sm font-medium text-white flex items-center gap-1">
                      <Euro className="w-3 h-3" />
                      {event.price}
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Date and Time */}
                <div className="flex items-center gap-4 mb-4 text-sm text-white/70">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(event.time)}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-medium mb-3 group-hover:text-white/90 transition-colors">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Capacity */}
                {event.capacity && (
                  <div className="flex items-center gap-2 mb-4 text-sm text-white/70">
                    <Users className="w-4 h-4" />
                    <span>{event.currentAttendees || 0} / {event.capacity} personas</span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="flex-1 bg-white text-black py-2 px-4 rounded-lg hover:bg-white/90 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    Ver detalles
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare(event)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredEvents.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-white/50" />
            </div>
            <h3 className="text-xl font-medium mb-2">No se encontraron eventos</h3>
            <p className="text-white/70">Intenta con otros términos de búsqueda o filtros</p>
          </motion.div>
        )}
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] bg-black/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-y-auto max-h-[90vh]">
                {/* Header Image */}
                <div className="relative h-64 md:h-80">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Close button */}
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    ×
                  </button>

                  {/* Status and Featured badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(selectedEvent.status)}`}>
                      {statusOptions.find(s => s.id === selectedEvent.status)?.name}
                    </div>
                    {selectedEvent.featured && (
                      <div className="px-3 py-1 bg-yellow-500 rounded-full text-xs font-medium text-black">
                        Destacado
                      </div>
                    )}
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-3xl md:text-4xl font-light mb-2">{selectedEvent.title}</h2>
                    <p className="text-white/80">{selectedEvent.description}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Event details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Detalles del evento</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-white/70" />
                          <span>{formatDate(selectedEvent.date)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-white/70" />
                          <span>
                            {formatTime(selectedEvent.time)}
                            {selectedEvent.endTime && ` - ${formatTime(selectedEvent.endTime)}`}
                          </span>
                        </div>
                        {selectedEvent.location && (
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-white/70" />
                            <span>{selectedEvent.location}</span>
                          </div>
                        )}
                        {selectedEvent.capacity && (
                          <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-white/70" />
                            <span>{selectedEvent.currentAttendees || 0} / {selectedEvent.capacity} personas</span>
                          </div>
                        )}
                        {selectedEvent.price && (
                          <div className="flex items-center gap-3">
                            <Euro className="w-5 h-5 text-white/70" />
                            <span>{selectedEvent.price}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Organización</h3>
                      <div className="space-y-3">
                        {selectedEvent.organizer && (
                          <div>
                            <span className="text-white/70">Organizado por:</span>
                            <div className="font-medium">{selectedEvent.organizer}</div>
                          </div>
                        )}
                        {selectedEvent.contact && (
                          <div className="space-y-2">
                            {selectedEvent.contact.phone && (
                              <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-white/70" />
                                <a href={`tel:${selectedEvent.contact.phone}`} className="hover:text-white/80">
                                  {selectedEvent.contact.phone}
                                </a>
                              </div>
                            )}
                            {selectedEvent.contact.email && (
                              <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-white/70" />
                                <a href={`mailto:${selectedEvent.contact.email}`} className="hover:text-white/80">
                                  {selectedEvent.contact.email}
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Full description */}
                  {selectedEvent.fullDescription && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-4">Descripción completa</h3>
                      <p className="text-white/80 leading-relaxed whitespace-pre-line">
                        {selectedEvent.fullDescription}
                      </p>
                    </div>
                  )}

                  {/* Requirements */}
                  {selectedEvent.requirements && selectedEvent.requirements.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-4">Requisitos</h3>
                      <ul className="space-y-2">
                        {selectedEvent.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-white/70 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-white/80">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">Etiquetas</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80 flex items-center gap-1"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {selectedEvent.status === 'upcoming' && (
                      <button
                        onClick={() => handleBooking(selectedEvent)}
                        className="flex-1 bg-white text-black py-3 px-6 rounded-lg hover:bg-white/90 transition-colors font-medium"
                      >
                        Reservar ahora
                      </button>
                    )}
                    <button
                      onClick={() => handleShare(selectedEvent)}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Compartir
                    </button>
                    <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                      <Heart className="w-4 h-4" />
                      Me interesa
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Events;
