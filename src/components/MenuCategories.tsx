import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Coffee, Sparkles, ArrowRight } from 'lucide-react';

interface MenuCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  count: number;
  accents: string[];
}

interface MenuCategoriesProps {
  onCategorySelect: (category: string) => void;
}

const MenuCategories: React.FC<MenuCategoriesProps> = ({ onCategorySelect }) => {
  const categories: MenuCategory[] = [
    {
      id: 'cachimba',
      name: 'Cachimbas Premium',
      description: 'Más de 50 sabores únicos y mezclas exclusivas artesanales',
      icon: <Sparkles className="w-8 h-8" />,
      gradient: 'from-purple-600 via-indigo-600 to-blue-600',
      count: 25,
      accents: ['bg-fuchsia-400/40', 'bg-indigo-400/40', 'bg-blue-500/30']
    },
    {
      id: 'comida',
      name: 'Gastronomía Árabe',
      description: 'Auténticos sabores del Medio Oriente preparados con amor',
      icon: <Utensils className="w-8 h-8" />,
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      count: 15,
      accents: ['bg-amber-300/40', 'bg-rose-400/40', 'bg-orange-400/30']
    },
    {
      id: 'bebida',
      name: 'Bebidas Tradicionales',
      description: 'Tés, cafés y refrescos para complementar tu experiencia',
      icon: <Coffee className="w-8 h-8" />,
      gradient: 'from-green-500 via-teal-500 to-cyan-500',
      count: 12,
      accents: ['bg-emerald-300/40', 'bg-cyan-400/40', 'bg-teal-500/30']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <motion.h2
          variants={itemVariants}
          className="text-5xl md:text-7xl font-light mb-8 text-white tracking-tight"
        >
          Nuestra Carta
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Descubre una experiencia gastronómica única
        </motion.p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {categories.map((category) => (
          <motion.div
            key={category.id}
            variants={itemVariants}
            whileHover={{
              y: -4,
              transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
            onClick={() => onCategorySelect(category.id)}
            className="group relative cursor-pointer overflow-hidden"
          >
            {/* Background Illustration */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90 transition-transform duration-500 group-hover:scale-105`}
              />
              {category.accents.map((accent, index) => (
                <div
                  key={index}
                  className={`absolute rounded-full blur-3xl ${accent} transition-transform duration-500 group-hover:scale-110`}
                  style={{
                    width: index === 0 ? '16rem' : index === 1 ? '14rem' : '12rem',
                    height: index === 0 ? '16rem' : index === 1 ? '14rem' : '12rem',
                    top:
                      index === 0 ? '-4rem' : index === 1 ? '60%' : 'auto',
                    left:
                      index === 0 ? '-3rem' : index === 1 ? 'auto' : '55%',
                    right: index === 1 ? '-3rem' : 'auto',
                    bottom: index === 2 ? '-3rem' : 'auto',
                  }}
                />
              ))}
              <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition-colors duration-300" />
            </div>

            {/* Card Content */}
            <div className="relative h-80 flex flex-col justify-between p-8 text-white">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                  <div className="w-6 h-6">
                    {category.icon}
                  </div>
                </div>
                <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                  {category.count}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-2xl font-semibold mb-3 [text-shadow:_0_2px_8px_rgb(0_0_0_/_50%)]">
                  {category.name}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed mb-6 [text-shadow:_0_1px_4px_rgb(0_0_0_/_50%)]">
                  {category.description}
                </p>

                {/* CTA */}
                <div className="flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                  <span>Explorar</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MenuCategories;
