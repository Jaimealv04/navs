import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LocalSpaces from '../components/LocalSpaces';
import SEOHead from '../components/SEOHead';
import LoginForm from '../components/LoginForm';

const LocalPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (showLogin) {
    return <LoginForm onBack={() => setShowLogin(false)} />;
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead
        title="Nuestro Local - EGO HOUSE Madrid"
        description="Descubre los espacios únicos de EGO HOUSE Madrid: Sala principal, Reservado VIP y Terraza. Ambientes exclusivos para una experiencia sensorial completa."
        keywords="ego house madrid local, espacios ego house, reservado vip madrid, terraza cachimba madrid, sala principal ego house, ambientes exclusivos madrid"
        url="https://www.egohousebynavs.com/local"
        image="https://www.egohousebynavs.com/hookas.jpg"
      />

      {/* Navbar */}
      <Navbar onLoginClick={() => setShowLogin(true)} />

      {/* Local Spaces Section */}
      <section className="bg-black">
        <LocalSpaces />
      </section>

      {/* Footer */}
      <Footer />

    </>
  );
};

export default LocalPage;
