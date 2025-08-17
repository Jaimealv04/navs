import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SurveyForm from '../components/SurveyForm';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';
import LocationMap from '../components/LocationMap';
import Footer from '../components/Footer';
import MenuCategories from '../components/MenuCategories';
import MenuCarousel from '../components/MenuCarousel';
// import Gallery from '../components/Gallery'; // Oculto temporalmente
// import Events from '../components/Events'; // Oculto temporalmente
import SEOHead from '../components/SEOHead';
import WhatsAppButton from '../components/WhatsAppButton';
import { getItemsByCategory } from '../data/menuData';

const LandingPage: React.FC = () => {
  const [showSurvey, setShowSurvey] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCarousel, setShowCarousel] = useState(false);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowCarousel(true);
  };

  const cachimbas = getItemsByCategory('cachimba');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  if (showSurvey) {
    return <SurveyForm onBack={() => setShowSurvey(false)} />;
  }

  if (showLogin) {
    return <LoginForm onBack={() => setShowLogin(false)} />;
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

      {/* Hero Section with Video Background */}
      <main>
        <section id="hero" className="relative min-h-screen overflow-hidden bg-black flex items-center">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-60"
              aria-label="Video de ambiente de EGO HOUSE Madrid"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
              <track kind="captions" src="/captions.vtt" srcLang="es" label="Español" />
            </video>
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Main Content */}
          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              className="text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Main Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-6xl md:text-8xl lg:text-9xl font-extralight mb-8 leading-none tracking-tighter"
              >
                <span className="text-white block">EGO HOUSE</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-white/70 mb-16 font-light tracking-wide"
              >
                Experiencia sensorial única
              </motion.p>

              {/* CTA Button */}
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
    <section id="menu" className="relative bg-black py-24">
      {/* Content */}
      <div className="relative z-10">
        {!showCarousel ? (
          <MenuCategories onCategorySelect={handleCategorySelect} />
        ) : (
          <div className="space-y-12">
            {/* Back Button */}
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <motion.button
                onClick={() => setShowCarousel(false)}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300"
              >
                ← Volver
              </motion.button>
            </div>

            {/* Menu Carousel */}
            <MenuCarousel
              items={selectedCategory === 'cachimba' ? cachimbas :
                     selectedCategory === 'comida' ? getItemsByCategory('comida') :
                     selectedCategory === 'bebida' ? getItemsByCategory('bebida') : cachimbas}
              title={`${selectedCategory === 'cachimba' ? 'Cachimbas' : selectedCategory === 'comida' ? 'Gastronomía' : 'Bebidas'}`}
              autoPlay={false}
            />
          </div>
        )}
      </div>
    </section>

    {/* Location Map Section */}
    <LocationMap />

    {/* Gallery Section - Oculta temporalmente */}
    {/* <Gallery /> */}

    {/* Events Section - Oculta temporalmente */}
    {/* <Events /> */}
    </main>

    {/* Footer */}
    <Footer />

    {/* WhatsApp Floating Button */}
    <WhatsAppButton
      phoneNumber="34123456789"
      defaultMessage="¡Hola! Me interesa conocer más sobre EGO HOUSE Madrid. ¿Podrían darme información sobre reservas y experiencias disponibles?"
    />
  </>
  );
};

export default LandingPage;
