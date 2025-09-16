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
  const [showFallback, setShowFallback] = useState(true); // Empezar con fallback por defecto
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      
      return isMobileDevice || isTouchDevice || isSmallScreen;
    };

    setIsMobile(checkMobile());
    
    // En móviles, empezar siempre con la imagen
    if (checkMobile()) {
      setShowFallback(true);
    } else {
      // En desktop, intentar reproducir automáticamente
      setShowFallback(false);
      // Pequeño delay para que el video se cargue
      setTimeout(() => {
        attemptAutoplay();
      }, 100);
    }
  }, []);

  const attemptAutoplay = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      setShowFallback(false);
    } catch (err) {
      console.log('Autoplay blocked, fallback to poster:', err);
      setShowFallback(true);
    }
  };

  useEffect(() => {
    // Solo escuchar interacciones si no hemos interactuado ya
    if (hasUserInteracted) return;

    const handleInteraction = async () => {
      if (hasUserInteracted) return;
      
      setHasUserInteracted(true);
      const video = videoRef.current;
      
      if (!video) return;

      try {
        // Cargar el video si no está cargado
        if (video.readyState < 2) {
          video.load();
          await new Promise((resolve) => {
            video.addEventListener('loadeddata', resolve, { once: true });
          });
        }

        await video.play();
        setShowFallback(false);
      } catch (err) {
        console.log('Failed to play video on user interaction:', err);
      }
    };

    // Usar passive listeners para mejor rendimiento
    document.addEventListener('touchstart', handleInteraction, { passive: true, once: true });
    document.addEventListener('click', handleInteraction, { passive: true, once: true });
    document.addEventListener('scroll', handleInteraction, { passive: true, once: true });

    return () => {
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, [hasUserInteracted]);

  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      {/* Video element */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        poster={posterImage}
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          showFallback ? 'opacity-0' : 'opacity-100'
        }`}
        aria-label={ariaLabel}
        preload={isMobile ? 'none' : 'metadata'}
        webkit-playsinline="true"
        style={{ 
          zIndex: showFallback ? 1 : 2,
        }}
      >
        <source src={cloudinaryUrl} type="video/mp4" />
      </video>

      {/* Imagen de fallback que aparece por defecto en móviles */}
      <img
        src={posterImage}
        alt="EGO HOUSE Madrid - Ambiente del lounge"
        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
          showFallback ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ zIndex: showFallback ? 2 : 1 }}
        loading="eager"
      />

      {/* Indicador sutil para móviles cuando el video está pausado */}
      {showFallback && isMobile && !hasUserInteracted && (
        <div className="absolute bottom-4 right-4 z-20 animate-pulse">
          <div className="bg-black/70 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-lg flex items-center gap-2 shadow-lg">
            <span className="text-lg">🎬</span>
            <span>Toca para ver el video</span>
          </div>
        </div>
      )}

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/30 z-10" />
    </div>
  );
};

export default CloudinaryVideoBackground;
