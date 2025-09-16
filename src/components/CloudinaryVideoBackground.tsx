import React, { useEffect, useRef, useState } from 'react';

interface CloudinaryVideoBackgroundProps {
  cloudinaryUrl: string;
  posterImage: string;
  className?: string;
  ariaLabel?: string;
}

const CloudinaryVideoBackground: React.FC<CloudinaryVideoBackgroundProps> = ({
  cloudinaryUrl,
  posterImage,
  className = '',
  ariaLabel = 'Video de fondo de EGO HOUSE Madrid',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = async () => {
      try {
        // Intentar reproducir el video
        await video.play();
        setIsVideoPlaying(true);
        setShowFallback(false);
      } catch (err) {
        console.log('Autoplay blocked or failed, showing poster image:', err);
        setIsVideoPlaying(false);
        setShowFallback(true);
      }
    };

    // Intentar reproducir cuando el video esté listo
    const handleCanPlay = () => {
      attemptPlay();
    };

    // Manejar eventos de usuario para intentar reproducir
    const handleUserInteraction = () => {
      if (!isVideoPlaying) {
        attemptPlay();
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    
    // Escuchar interacciones del usuario para activar el video
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('click', handleUserInteraction, { once: true });

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
    };
  }, [isVideoPlaying]);

  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={posterImage}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          showFallback ? 'opacity-0' : 'opacity-100'
        }`}
        aria-label={ariaLabel}
        preload="metadata"
        webkit-playsinline="true"
      >
        <source src={cloudinaryUrl} type="video/mp4" />
      </video>

      {/* Imagen de fallback que aparece cuando el video no puede reproducirse */}
      <img
        src={posterImage}
        alt="EGO HOUSE Madrid - Ambiente del lounge"
        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${
          showFallback ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ zIndex: showFallback ? 2 : 1 }}
      />

      {/* Indicador sutil para móviles cuando el video está pausado */}
      {showFallback && (
        <div className="absolute bottom-4 right-4 z-10">
          <div className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <span>📱</span>
            <span>Toca para reproducir</span>
          </div>
        </div>
      )}

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/30 z-10" />
    </div>
  );
};

export default CloudinaryVideoBackground;
