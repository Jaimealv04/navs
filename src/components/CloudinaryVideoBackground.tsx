import React from 'react';

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
  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={posterImage}
        className="w-full h-full object-cover"
        aria-label={ariaLabel}
        preload="metadata"
      >
        <source src={cloudinaryUrl} type="video/mp4" />

        {/* Fallback para navegadores que no soportan video */}
        <img
          src={posterImage}
          alt="EGO HOUSE Madrid - Ambiente del lounge"
          className="w-full h-full object-cover"
        />
      </video>

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/30 z-10" />
    </div>
  );
};

export default CloudinaryVideoBackground;
