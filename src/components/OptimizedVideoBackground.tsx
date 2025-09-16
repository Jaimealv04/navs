import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDeviceDetection } from '../hooks/useDeviceDetection';
import VideoModeToggle from './VideoModeToggle';

interface OptimizedVideoBackgroundProps {
  videoSrc: string;
  posterImage: string;
  posterImageWebP?: string;
  className?: string;
  'aria-label'?: string;
  showModeToggle?: boolean;
}

const OptimizedVideoBackground: React.FC<OptimizedVideoBackgroundProps> = ({
  videoSrc,
  posterImage,
  posterImageWebP,
  className = '',
  'aria-label': ariaLabel,
  showModeToggle = true,
}) => {
  const {
    shouldUseStaticMedia,
    isMobile,
    isLowPerformance,
    hasSlowConnection,
    prefersReducedData,
    prefersReducedMotion,
  } = useDeviceDetection();
  const [manualMode, setManualMode] = useState<'auto' | 'video' | 'image'>(
    'auto'
  );

  // Determinar el modo actual basado en la configuración manual o auto-detección
  const currentlyUsingVideo =
    manualMode === 'video' || (manualMode === 'auto' && !shouldUseStaticMedia);

  const isAutoDetected = manualMode === 'auto';
  const currentMode = currentlyUsingVideo ? 'video' : 'image';

  const handleModeChange = (useVideo: boolean) => {
    setManualMode(useVideo ? 'video' : 'image');
  };

  useEffect(() => {
    // Guardar preferencia en localStorage
    if (manualMode !== 'auto') {
      localStorage.setItem('egohouse-video-mode', manualMode);
    } else {
      localStorage.removeItem('egohouse-video-mode');
    }
  }, [manualMode]);

  useEffect(() => {
    // Restaurar preferencia desde localStorage
    const savedMode = localStorage.getItem('egohouse-video-mode');
    if (savedMode && (savedMode === 'video' || savedMode === 'image')) {
      setManualMode(savedMode);
    }
  }, []);

  return (
    <>
      <div className={`absolute inset-0 z-0 ${className}`}>
        {!currentlyUsingVideo ? (
          // Mostrar imagen estática para dispositivos móviles o de bajo rendimiento
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full relative"
          >
            <picture>
              {posterImageWebP && (
                <source srcSet={posterImageWebP} type="image/webp" />
              )}
              <img
                src={posterImage}
                alt="EGO HOUSE Madrid - Ambiente del lounge"
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
            </picture>

            {/* Overlay con información del modo optimizado */}
            {isAutoDetected &&
              (isMobile ||
                isLowPerformance ||
                hasSlowConnection ||
                prefersReducedData ||
                prefersReducedMotion) && (
                <div className="absolute bottom-4 left-4 z-10">
                  <div className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                    📱 Modo optimizado{' '}
                    {isMobile
                      ? '(Móvil)'
                      : hasSlowConnection
                      ? '(Conexión lenta)'
                      : prefersReducedData
                      ? '(Ahorro datos)'
                      : prefersReducedMotion
                      ? '(Menos animaciones)'
                      : '(Bajo rendimiento)'}
                  </div>
                </div>
              )}
          </motion.div>
        ) : (
          // Mostrar video para dispositivos de escritorio con buen rendimiento
          <motion.video
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            autoPlay
            muted
            loop
            playsInline
            poster={posterImageWebP || posterImage}
            className="w-full h-full object-cover"
            aria-label={ariaLabel}
            preload="metadata"
          >
            <source src={videoSrc} type="video/mp4" />
            <track
              kind="captions"
              src="/captions.vtt"
              srcLang="es"
              label="Español"
            />

            {/* Fallback para navegadores que no soportan video */}
            <picture>
              {posterImageWebP && (
                <source srcSet={posterImageWebP} type="image/webp" />
              )}
              <img
                src={posterImage}
                alt="EGO HOUSE Madrid - Ambiente del lounge"
                className="w-full h-full object-cover"
              />
            </picture>
          </motion.video>
        )}

        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Control de modo de video */}
      {showModeToggle && (
        <VideoModeToggle
          onModeChange={handleModeChange}
          isAutoDetected={isAutoDetected}
          currentMode={currentMode}
        />
      )}
    </>
  );
};

export default OptimizedVideoBackground;
