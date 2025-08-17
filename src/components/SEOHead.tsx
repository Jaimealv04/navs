import { useEffect } from 'react';

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
  useEffect(() => {
    // Actualizar título
    document.title = title;

    // Función para actualizar o crear meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let metaTag = document.querySelector(selector) as HTMLMetaElement;

      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (isProperty) {
          metaTag.setAttribute('property', property);
        } else {
          metaTag.setAttribute('name', property);
        }
        document.head.appendChild(metaTag);
      }

      metaTag.setAttribute('content', content);
    };

    // Basic Meta Tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'EGO HOUSE Madrid');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('language', 'es');

    // Open Graph Tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'EGO HOUSE Madrid', true);
    updateMetaTag('og:locale', 'es_ES', true);

    // Twitter Card Tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Additional Meta Tags
    updateMetaTag('theme-color', '#000000');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black');

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', url);

    // Schema.org JSON-LD
    const schemaScript = document.getElementById('schema-ld');
    if (schemaScript) {
      schemaScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'schema-ld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "EGO HOUSE Madrid",
      "description": description,
      "url": url,
      "image": image,
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
    });
    document.head.appendChild(script);

  }, [title, description, keywords, image, url, type]);

  // Este componente no renderiza nada visible
  return null;
};

export default SEOHead;
