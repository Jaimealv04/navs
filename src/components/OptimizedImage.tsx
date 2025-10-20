import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
  sizes?: string;
  style?: React.CSSProperties;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
  sizes,
  style,
}) => {
  // Generar URLs para diferentes formatos
  const getImageSources = (originalSrc: string) => {
    if (originalSrc.startsWith('http')) {
      // Para imágenes de Cloudinary, usar transformaciones automáticas
      return {
        webp: originalSrc.replace('/upload/', '/upload/f_webp,q_auto/'),
        avif: originalSrc.replace('/upload/', '/upload/f_avif,q_auto/'),
        original: originalSrc,
      };
    }

    // Para imágenes locales, generar nombres de archivos optimizados
    const extension = originalSrc.split('.').pop();
    const baseName = originalSrc.replace(`.${extension}`, '');

    return {
      webp: `${baseName}.webp`,
      avif: `${baseName}.avif`,
      original: originalSrc,
    };
  };

  const sources = getImageSources(src);

  return (
    <picture>
      {/* AVIF - Mejor compresión */}
      <source srcSet={sources.avif} type="image/avif" sizes={sizes} />

      {/* WebP - Buena compresión y compatibilidad */}
      <source srcSet={sources.webp} type="image/webp" sizes={sizes} />

      {/* Fallback original */}
      <img
        src={sources.original}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        style={style}
        sizes={sizes}
      />
    </picture>
  );
};

export default OptimizedImage;
