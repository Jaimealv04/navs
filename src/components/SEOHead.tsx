import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "EGO HOUSE - Experiencia Sensorial Única | Cachimbas y Gastronomía Madrid",
  description = "Descubre EGO HOUSE Madrid, el lugar donde la experiencia sensorial cobra vida. Cachimbas premium, gastronomía exquisita y ambiente único en el corazón de Madrid.",
  keywords = "ego house, cachimbas madrid, hookah madrid, gastronomía madrid, experiencia sensorial, lounge madrid, cachimba premium, restaurante madrid, ocio nocturno madrid",
  image = "/og-image.jpg",
  url = "https://egohouse.es",
  type = "website"
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="EGO HOUSE Madrid" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="language" content="es" />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="EGO HOUSE Madrid" />
      <meta property="og:locale" content="es_ES" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "EGO HOUSE Madrid",
            "description": "${description}",
            "url": "${url}",
            "image": "${image}",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Calle de Manuel Pombo Angulo 10",
              "addressLocality": "Madrid",
              "addressCountry": "ES"
            },
            "telephone": "+34 123 456 789",
            "openingHours": [
              "Mo-Fr 18:00-02:00",
              "Sa-Su 16:00-03:00"
            ],
            "servesCuisine": ["Mediterranean", "International"],
            "priceRange": "$$",
            "amenityFeature": [
              {
                "@type": "LocationFeatureSpecification",
                "name": "Hookah Lounge"
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Live Entertainment"
              }
            ]
          }
        `}
      </script>
    </Helmet>
  );
};

export default SEOHead;
