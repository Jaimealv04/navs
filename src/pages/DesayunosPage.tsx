import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import WhatsAppButton from '../components/WhatsAppButton';

interface BreakfastMenu {
  id: string;
  name: string;
  description: string;
  price: number;
  items: string[];
}

interface OrderData {
  name: string;
  phone: string;
  email: string;
  selectedMenu: string;
  quantity: number;
  observations: string;
}

const DesayunosPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const [orderData, setOrderData] = useState<OrderData>({
    name: '',
    phone: '',
    email: '',
    selectedMenu: '',
    quantity: 1,
    observations: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breakfastMenus: BreakfastMenu[] = [
    {
      id: 'menu1',
      name: 'Desayuno Clásico',
      description: 'La combinación perfecta para empezar el día',
      price: 4,
      items: ['Café', 'Zumo de naranja', 'Croissant'],
    },
    {
      id: 'menu2',
      name: 'Desayuno Tradicional',
      description: 'Sabor auténtico con mollete de jamón',
      price: 5,
      items: ['Café', 'Zumo de naranja', 'Mollete jamón'],
    },
    {
      id: 'menu3',
      name: 'Desayuno Premium',
      description: 'Una experiencia gourmet para paladares exigentes',
      price: 6,
      items: ['Café', 'Zumo de naranja', 'Mollete aguacate y salmón'],
    },
  ];

  const handleMenuSelect = (menuId: string) => {
    setSelectedMenu(menuId);
    setOrderData((prev) => ({ ...prev, selectedMenu: menuId }));
  };

  const handleInputChange = (
    field: keyof OrderData,
    value: string | number
  ) => {
    setOrderData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const selectedMenuData = breakfastMenus.find(
      (menu) => menu.id === orderData.selectedMenu
    );
    const total = selectedMenuData
      ? selectedMenuData.price * orderData.quantity
      : 0;

    // Create WhatsApp message
    const message = `*PEDIDO DE DESAYUNO - EGO HOUSE*

*Detalles del pedido:*
• Menú: ${selectedMenuData?.name}
• Cantidad: ${orderData.quantity}
• Precio unitario: ${selectedMenuData?.price}€
• Total: ${total}€

*Datos del cliente:*
• Nombre: ${orderData.name}
• Teléfono: ${orderData.phone}
• Email: ${orderData.email}

${orderData.observations ? `*Observaciones:* ${orderData.observations}` : ''}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/34646149112?text=${encodedMessage}`, '_blank');

    setIsSubmitting(false);
    setOrderSubmitted(true);
  };

  if (orderSubmitted) {
    return (
      <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/HomeMobile.png)',
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center max-w-md mx-auto"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-light text-white mb-4">
            ¡Pedido Enviado!
          </h2>
          <p className="text-white/70 mb-8">
            Tu pedido ha sido enviado por WhatsApp. Te confirmaremos la
            disponibilidad y tiempo de preparación.
          </p>
          <button
            onClick={() => setOrderSubmitted(false)}
            className="bg-white text-black px-6 py-2 font-light hover:bg-white/90 transition-all duration-300"
          >
            Hacer otro pedido
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead
        title="Desayunos - EGO HOUSE Madrid"
        description="Disfruta de nuestros deliciosos desayunos en EGO HOUSE Madrid. Menús completos desde 4€ con café, zumo y opciones gourmet."
        keywords="desayunos madrid, café madrid, mollete madrid, ego house desayunos, brunch madrid"
        url="https://www.egohousebynavs.com/desayunos"
        image="https://www.egohousebynavs.com/hookas.jpg"
      />

      {/* Navbar */}
      <Navbar onLoginClick={() => setShowLogin(true)} />

      {/* Main Content */}
      <main className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/HomeMobile.png)',
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-extralight text-white mb-6 tracking-tight">
              Desayunos
            </h1>
            <div className="w-24 h-px bg-white/30 mx-auto mb-6"></div>
            <p className="text-xl text-white/70 font-light">
              Comienza tu día con el sabor de EGO HOUSE
            </p>
          </motion.div>

          {/* Menu Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-light text-white mb-8 text-center">
              Elige tu menú
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {breakfastMenus.map((menu) => (
                <motion.div
                  key={menu.id}
                  whileHover={{ scale: 1.02 }}
                  className={`relative p-6 bg-white/5 backdrop-blur-sm rounded-lg border cursor-pointer transition-all duration-300 ${
                    selectedMenu === menu.id
                      ? 'border-white bg-white/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  onClick={() => handleMenuSelect(menu.id)}
                >
                  <div className="text-center">
                    <h3 className="text-xl font-light text-white mb-2">
                      {menu.name}
                    </h3>
                    <p className="text-white/60 text-sm mb-4">
                      {menu.description}
                    </p>
                    <div className="space-y-1 mb-4">
                      {menu.items.map((item, index) => (
                        <p key={index} className="text-white/80 text-sm">
                          • {item}
                        </p>
                      ))}
                    </div>
                    <div className="text-2xl font-light text-white">
                      {menu.price}€
                    </div>
                  </div>
                  {selectedMenu === menu.id && (
                    <motion.div
                      layoutId="selectedMenu"
                      className="absolute inset-0 border-2 border-white rounded-lg"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Order Form */}
          {selectedMenu && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmitOrder}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/20"
            >
              <h3 className="text-2xl font-light text-white mb-8 text-center">
                Datos del pedido
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={orderData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-white/50 focus:border-white focus:outline-none transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    value={orderData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-white/50 focus:border-white focus:outline-none transition-colors"
                    placeholder="+34 600 000 000"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={orderData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-white/50 focus:border-white focus:outline-none transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    Cantidad
                  </label>
                  <select
                    value={orderData.quantity}
                    onChange={(e) =>
                      handleInputChange('quantity', parseInt(e.target.value))
                    }
                    className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white focus:border-white focus:outline-none transition-colors"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num} className="bg-black">
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Observations */}
              <div className="mb-8">
                <label className="block text-white/70 text-sm mb-2">
                  Observaciones (opcional)
                </label>
                <textarea
                  value={orderData.observations}
                  onChange={(e) =>
                    handleInputChange('observations', e.target.value)
                  }
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-white/50 focus:border-white focus:outline-none transition-colors resize-none"
                  placeholder="Alguna preferencia o comentario..."
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-white text-black px-8 py-3 font-light hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando pedido...' : 'Realizar pedido'}
                </button>
                <p className="text-white/50 text-sm mt-4">
                  * El pedido se enviará por WhatsApp para confirmación
                </p>
              </div>
            </motion.form>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppButton
        phoneNumber="34646149112"
        defaultMessage="¡Hola! Me interesa información sobre los desayunos de EGO HOUSE Madrid."
      />
    </>
  );
};

export default DesayunosPage;