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
  const [showFallback, setShowFallback] = useState(false); // Empezar intentando el video
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(
          userAgent
        );
      const isTouchDevice =
        'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;

      return isMobileDevice || isTouchDevice || isSmallScreen;
    };

    const attemptAutoplay = async () => {
      const video = videoRef.current;
      if (!video) return;

      try {
        // Asegurar que el video esté cargado
        if (video.readyState < 2) {
          video.load();
          // Esperar a que esté listo
          await new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject(new Error('Timeout')), 3000);
            video.addEventListener('loadeddata', () => {
              clearTimeout(timer);
              resolve(void 0);
            }, { once: true });
          });
        }

        // Intentar reproducir
        const playPromise = video.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
        
        setShowFallback(false);
        console.log('Video autoplay successful');
      } catch (err) {
        console.log('Autoplay failed, showing fallback:', err);
        setShowFallback(true);
        
        // En móviles, configurar para activar en primera interacción
        const mobile = checkMobile();
        if (mobile && !hasUserInteracted) {
          console.log('Mobile detected, waiting for user interaction');
        }
      }
    };

    setIsMobile(checkMobile());

    // Intentar autoplay en todos los dispositivos primero
    setTimeout(() => {
      attemptAutoplay();
    }, 500); // Un poco más de tiempo para que el video se cargue
  }, [hasUserInteracted]);

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
    document.addEventListener('touchstart', handleInteraction, {
      passive: true,
      once: true,
    });
    document.addEventListener('click', handleInteraction, {
      passive: true,
      once: true,
    });
    document.addEventListener('scroll', handleInteraction, {
      passive: true,
      once: true,
    });

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
        autoPlay
        muted
        loop
        playsInline
        poster={posterImage}
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          showFallback ? 'opacity-0' : 'opacity-100'
        }`}
        aria-label={ariaLabel}
        preload="auto"
        webkit-playsinline="true"
        crossOrigin="anonymous"
        style={{
          zIndex: showFallback ? 1 : 2,
        }}
        onCanPlay={() => {
          // Intentar reproducir cuando el video esté listo
          const video = videoRef.current;
          if (video && video.paused && !showFallback) {
            video.play().catch(() => {
              setShowFallback(true);
            });
          }
        }}
        onError={() => {
          console.log('Video error, showing fallback');
          setShowFallback(true);
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

      {/* Indicador más prominente para móviles */}
      {showFallback && isMobile && !hasUserInteracted && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="bg-black/80 backdrop-blur-sm text-white px-6 py-4 rounded-2xl flex flex-col items-center gap-3 shadow-2xl animate-pulse">
            <div className="text-4xl">▶️</div>
            <div className="text-center">
              <div className="text-lg font-semibold">Video de fondo</div>
              <div className="text-sm opacity-90">Toca cualquier lugar para activar</div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/30 z-10" />
    </div>
  );
};

export default CloudinaryVideoBackground;
