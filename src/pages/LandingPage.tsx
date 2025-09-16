import React, {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import MenuCategories from '../components/MenuCategories';
import OptimizedVideoBackground from '../components/OptimizedVideoBackground';
import SEOHead from '../components/SEOHead';
import { getItemsByCategory } from '../data/menuData';

const SurveyForm = lazy(() => import('../components/SurveyForm'));
const LoginForm = lazy(() => import('../components/LoginForm'));
const MenuCarousel = lazy(() => import('../components/MenuCarousel'));
const LocationMap = lazy(() => import('../components/LocationMap'));
const Footer = lazy(() => import('../components/Footer'));
const WhatsAppButton = lazy(() => import('../components/WhatsAppButton'));

const FullscreenFallback: React.FC<{ message: string }> = ({ message }) => (
  <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
    <div className="text-white/70 animate-pulse text-center" role="status" aria-live="polite">
      {message}
    </div>
  </div>
);

const MenuCarouselFallback = () => (
  <div className="w-full max-w-6xl mx-auto px-6 lg:px-8">
    <div className="text-center mb-16">
      <div className="h-10 w-48 mx-auto bg-white/10 rounded-full animate-pulse" />
    </div>
    <div className="bg-white/[0.06] border border-white/10 rounded-2xl h-72 animate-pulse" />
  </div>
);

const MapPlaceholder = () => (
  <section
    id="location"
    className="relative bg-zinc-950 text-white py-24 overflow-hidden"
    aria-hidden="true"
  >
    <div className="absolute inset-0">
      <div className="absolute top-20 left-1/3 w-44 h-44 bg-white/5 blur-3xl" />
      <div className="absolute bottom-16 right-1/4 w-36 h-36 bg-white/5 blur-3xl" />
    </div>
    <div className="relative z-10 max-w-6xl mx-auto px-6 space-y-16">
      <div className="text-center space-y-4">
        <div className="h-8 w-64 mx-auto bg-white/10 rounded-full animate-pulse" />
        <div className="h-4 w-48 mx-auto bg-white/5 rounded-full animate-pulse" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-square rounded-3xl border border-white/10 bg-white/[0.04] animate-pulse" />
        <div className="space-y-6">
          <div className="h-24 rounded-3xl border border-white/10 bg-white/[0.04] animate-pulse" />
          <div className="h-24 rounded-3xl border border-white/10 bg-white/[0.04] animate-pulse" />
          <div className="h-24 rounded-3xl border border-white/10 bg-white/[0.04] animate-pulse" />
        </div>
      </div>
    </div>
  </section>
);

const FooterFallback = () => (
  <div className="bg-black py-16 text-center text-white/50">
    <span className="animate-pulse">Cargando información...</span>
  </div>
);

const LandingPage: React.FC = () => {
  const [showSurvey, setShowSurvey] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCarousel, setShowCarousel] = useState(false);
  const [shouldRenderMap, setShouldRenderMap] = useState(false);
  const [shouldRenderWhatsApp, setShouldRenderWhatsApp] = useState(false);
  const mapSectionRef = useRef<HTMLDivElement | null>(null);

  const cachimbas = useMemo(() => getItemsByCategory('cachimba'), []);
  const carouselItems = useMemo(() => {
    if (selectedCategory === 'comida') {
      return getItemsByCategory('comida');
    }
    if (selectedCategory === 'bebida') {
      return getItemsByCategory('bebida');
    }
    return cachimbas;
  }, [selectedCategory, cachimbas]);

  const carouselTitle = useMemo(() => {
    if (selectedCategory === 'comida') return 'Gastronomía';
    if (selectedCategory === 'bebida') return 'Bebidas';
    return 'Cachimbas';
  }, [selectedCategory]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowCarousel(true);
  };

  useEffect(() => {
    const element = mapSectionRef.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setShouldRenderMap(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldRenderMap(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '0px 0px 200px 0px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (typeof win.requestIdleCallback === 'function') {
      const idleHandle = win.requestIdleCallback(
        () => setShouldRenderWhatsApp(true),
        { timeout: 2500 }
      );

      return () => win.cancelIdleCallback?.(idleHandle);
    }

    const timer = window.setTimeout(() => setShouldRenderWhatsApp(true), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  if (showSurvey) {
    return (
      <Suspense fallback={<FullscreenFallback message="Cargando experiencia personalizada..." />}>
        <SurveyForm onBack={() => setShowSurvey(false)} />
      </Suspense>
    );
  }

  if (showLogin) {
    return (
      <Suspense fallback={<FullscreenFallback message="Cargando acceso seguro..." />}>
        <LoginForm onBack={() => setShowLogin(false)} />
      </Suspense>
    );
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead
        title="EGO HOUSE Madrid - Experiencia Sensorial Única | Cachimbas Premium"
        description="Descubre EGO HOUSE, el lounge más exclusivo de Madrid. Cachimbas premium, gastronomía exquisita y ambiente único. Reserva tu experiencia sensorial."
        keywords="ego house madrid, cachimbas madrid, hookah lounge, gastronomía madrid, experiencia sensorial, lounge exclusivo, cachimba premium"
        url="https://egohouse.es"
      />

      {/* Navbar Component */}
      <Navbar onLoginClick={() => setShowLogin(true)} />

      {/* Hero Section with Optimized Video Background */}
      <main>
        <section
          id="hero"
          className="relative min-h-screen overflow-hidden bg-black flex items-center"
        >
          <OptimizedVideoBackground
            videoSrc="https://res.cloudinary.com/dm70hhhnm/video/upload/f_auto,q_auto/Portada_1080_editada_bflw9o.mp4"
            posterImage="https://res.cloudinary.com/dm70hhhnm/image/upload/f_auto,q_auto/Portada_1080_editada_bflw9o.jpg"
            aria-label="Video de ambiente de EGO HOUSE Madrid"
            showModeToggle={false}
          />

          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              className="text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                variants={itemVariants}
                className="text-6xl md:text-8xl lg:text-9xl font-extralight mb-8 leading-none tracking-tighter"
              >
                <span className="text-white block">EGO HOUSE</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-white/70 mb-16 font-light tracking-wide"
              >
                Experiencia sensorial única
              </motion.p>

              <motion.button
                variants={itemVariants}
                onClick={() => setShowSurvey(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-all duration-300"
                aria-label="Comenzar experiencia personalizada en EGO HOUSE"
              >
                Comenzar experiencia
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Menu Categories and Carousel Section */}
        <section id="menu" className="relative bg-black py-10 pb-50">
          <div className="relative z-10">
            {!showCarousel ? (
              <MenuCategories onCategorySelect={handleCategorySelect} />
            ) : (
              <div className="space-y-12">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                  <motion.button
                    onClick={() => setShowCarousel(false)}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300"
                  >
                    ← Volver
                  </motion.button>
                </div>

                <Suspense fallback={<MenuCarouselFallback />}>
                  <MenuCarousel
                    items={carouselItems}
                    title={carouselTitle}
                    autoPlay={false}
                  />
                </Suspense>
              </div>
            )}
          </div>
        </section>

        {/* Location Map Section */}
        <div ref={mapSectionRef}>
          {shouldRenderMap ? (
            <Suspense fallback={<MapPlaceholder />}>
              <LocationMap />
            </Suspense>
          ) : (
            <MapPlaceholder />
          )}
        </div>
      </main>

      {/* Footer */}
      <Suspense fallback={<FooterFallback />}>
        <Footer />
      </Suspense>

      {/* WhatsApp Floating Button */}
      {shouldRenderWhatsApp && (
        <Suspense fallback={null}>
          <WhatsAppButton
            phoneNumber="34123456789"
            defaultMessage="¡Hola! Me interesa conocer más sobre EGO HOUSE Madrid. ¿Podrían darme información sobre reservas y experiencias disponibles?"
          />
        </Suspense>
      )}
    </>
  );
};

export default LandingPage;
