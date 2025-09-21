import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Coffee,
  Utensils,
  Wine,
  UtensilsCrossed,
  ImageIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  fullMenuData,
  type MenuSubcategory,
  type NewMenuItem,
} from '../data/menuData';
import SEOHead from '../components/SEOHead';

const categoryIcons = {
  bebidas: Wine,
  desayunos: Coffee,
  meriendas: UtensilsCrossed,
  cocktails: Wine,
} as const;

const formatPrice = (price: number, currency: string = '€'): string => {
  return `${price.toFixed(2).replace('.00', '')}${currency}`;
};

// Componente para imagen placeholder
const ProductImagePlaceholder: React.FC = () => (
  <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center border border-gray-600">
    <ImageIcon className="w-8 h-8 text-gray-400" />
  </div>
);

const MenuItemComponent: React.FC<{ item: NewMenuItem; currency: string }> = ({
  item,
  currency,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-300"
  >
    <div className="flex items-start space-x-4">
      {/* Imagen placeholder */}
      <ProductImagePlaceholder />

      {/* Contenido */}
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-white font-medium text-lg font-['Poppins']">
            {item.name}
          </h4>
          <div className="text-yellow-400 font-semibold ml-4">
            {item.variants ? (
              <div className="text-right space-y-1">
                {item.variants.map((variant, idx) => (
                  <div key={idx} className="text-sm">
                    <span className="text-gray-300">{variant.size}: </span>
                    {formatPrice(variant.price, currency)}
                  </div>
                ))}
              </div>
            ) : (
              item.price && formatPrice(item.price, currency)
            )}
          </div>
        </div>

        {item.description && (
          <p className="text-gray-300 text-sm mb-2 italic">
            {item.description}
          </p>
        )}

        {item.tagline && (
          <p className="text-yellow-400/80 text-sm font-medium mb-2">
            "{item.tagline}"
          </p>
        )}

        {item.notes && <p className="text-gray-400 text-xs">{item.notes}</p>}
      </div>
    </div>
  </motion.div>
);

const SubcategorySection: React.FC<{
  subcategory: MenuSubcategory;
  currency: string;
  isSignature?: boolean;
}> = ({ subcategory, currency, isSignature = false }) => (
  <div className="mb-8">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="mb-6"
    >
      <h3
        className={`text-2xl font-bold mb-2 font-['Poppins'] ${
          isSignature
            ? 'text-yellow-400 text-center text-3xl'
            : 'text-white border-b border-yellow-400/30 pb-2'
        }`}
      >
        {subcategory.name}
      </h3>
      {isSignature && (
        <p className="text-center text-gray-300 italic text-lg mb-4">
          Cocktails de autor únicos
        </p>
      )}
    </motion.div>

    {subcategory.items && (
      <div className="grid gap-4">
        {subcategory.items.map((item, idx) => (
          <MenuItemComponent key={idx} item={item} currency={currency} />
        ))}
      </div>
    )}

    {subcategory.subsections && (
      <div className="space-y-6">
        {subcategory.subsections.map((subsection, idx) => (
          <div key={idx}>
            <h4 className="text-xl font-semibold text-yellow-400 mb-4 border-l-4 border-yellow-400 pl-4 font-['Poppins']">
              {subsection.name}
            </h4>
            <div className="grid gap-4">
              {subsection.items.map((item, itemIdx) => (
                <MenuItemComponent
                  key={itemIdx}
                  item={item}
                  currency={currency}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const FullMenuPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredCategories = selectedCategory
    ? fullMenuData.categories.filter((cat) => cat.slug === selectedCategory)
    : fullMenuData.categories;

  return (
    <>
      <SEOHead
        title="Carta Completa | EGO HOUSE Madrid - Bebidas, Desayunos, Meriendas y Cocktails"
        description="Explora la carta completa de EGO HOUSE Madrid. Bebidas premium, desayunos gourmet, meriendas exquisitas y cocktails de autor en un ambiente único."
        keywords="carta ego house madrid, menú completo madrid, bebidas premium madrid, desayunos madrid, cocktails madrid, gastronomía madrid, restaurante madrid"
        url="https://egohousebynavs.com/menu/general"
        image="/comida.jpg"
      />
      <div className="min-h-screen relative font-['Poppins']">
        {/* Background Image */}
        <div
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/HomeMobile.png')",
          }}
        />
        {/* Dark overlay for readability */}
        <div className="fixed inset-0 z-10 bg-black/70" />

        {/* Content */}
        <div className="relative z-20">
          {/* Header */}
          <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-700/50">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors"
              >
                <ArrowLeft size={24} />
                <span>Volver</span>
              </button>

              <div className="flex items-center space-x-3">
                <UtensilsCrossed className="text-yellow-400" size={32} />
                <h1 className="text-3xl font-bold text-white">
                  Carta Completa
                </h1>
              </div>

              <div className="text-sm text-gray-400">
                v{fullMenuData.version}
              </div>
            </div>
          </div>

          {/* Category Navigation */}
          <div className="bg-black/20 backdrop-blur-sm border-b border-gray-700/50">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    selectedCategory === null
                      ? 'bg-yellow-400 text-black font-semibold'
                      : 'bg-gray-800/50 text-white hover:bg-gray-700/50'
                  }`}
                >
                  Todas las categorías
                </button>
                {fullMenuData.categories.map((category) => {
                  const Icon =
                    categoryIcons[
                      category.slug as keyof typeof categoryIcons
                    ] || Utensils;
                  return (
                    <button
                      key={category.slug}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`px-4 py-2 rounded-full transition-all flex items-center space-x-2 ${
                        selectedCategory === category.slug
                          ? 'bg-yellow-400 text-black font-semibold'
                          : 'bg-gray-800/50 text-white hover:bg-gray-700/50'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Menu Content */}
          <div className="max-w-6xl mx-auto px-4 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory || 'all'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                {filteredCategories.map((category, categoryIdx) => {
                  const Icon =
                    categoryIcons[
                      category.slug as keyof typeof categoryIcons
                    ] || Utensils;
                  return (
                    <div key={categoryIdx} className="space-y-8">
                      {/* Título de categoría si se muestran todas */}
                      {!selectedCategory && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center py-8"
                        >
                          <div className="flex items-center justify-center space-x-4 mb-4">
                            <Icon className="text-yellow-400" size={40} />
                            <h2 className="text-4xl font-bold text-white">
                              {category.name}
                            </h2>
                          </div>
                          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full" />
                        </motion.div>
                      )}

                      {/* Subcategorías */}
                      {category.subcategories.map((subcategory, idx) => (
                        <SubcategorySection
                          key={idx}
                          subcategory={subcategory}
                          currency={fullMenuData.currency}
                          isSignature={subcategory.type === 'signature'}
                        />
                      ))}
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="bg-black/40 backdrop-blur-sm border-t border-gray-700/50 py-6 mt-12">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <p className="text-gray-400 text-sm">
                Carta actualizada • Precios en {fullMenuData.currency} • IVA
                incluido
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullMenuPage;
