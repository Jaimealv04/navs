// Interfaces para la nueva estructura de la carta
export interface MenuVariant {
  size: string;
  price: number;
}

export interface NewMenuItem {
  name: string;
  price?: number;
  variants?: MenuVariant[];
  description?: string;
  tagline?: string;
  notes?: string;
}

export interface MenuSubsection {
  name: string;
  items: NewMenuItem[];
}

export interface MenuSubcategory {
  name: string;
  type?: string;
  items?: NewMenuItem[];
  subsections?: MenuSubsection[];
}

export interface MenuCategory {
  name: string;
  slug: string;
  subcategories: MenuSubcategory[];
}

export interface MenuData {
  version: string;
  currency: string;
  categories: MenuCategory[];
}

// Nueva estructura de carta completa
export const fullMenuData: MenuData = {
  version: '1.0.1',
  currency: 'EUR',
  categories: [
    {
      name: 'Bebidas',
      slug: 'bebidas',
      subcategories: [
        {
          name: 'Refrescos',
          items: [
            { name: 'Agua', price: 3.0 },
            { name: 'Agua con gas', price: 3.5 },
            { name: 'Refresco pequeño', price: 3.0 },
            { name: 'CocaCola', price: 3.5 },
            { name: 'CocaCola Zero', price: 3.5 },
            { name: 'Sprite', price: 3.5 },
            { name: 'Fanta de naranja', price: 3.5 },
            { name: 'Fanta de limón', price: 3.5 },
            { name: 'Nestea sin azúcar', price: 3.5 },
            { name: 'Nestea de maracuyá', price: 3.5 },
            { name: 'Aquarius de limón', price: 3.5 },
            { name: 'Aquarius de naranja', price: 3.5 },
            { name: 'Monsters', price: 4.0 },
            { name: 'Red Bulls', price: 3.5 },
          ],
        },
        {
          name: 'Cervezas',
          items: [
            { name: 'Doble', price: 3.0 },
            { name: 'Tercio de Mahou', price: 3.5 },
            { name: 'Alhambra', price: 3.5 },
            { name: 'Radler', price: 3.5 },
            { name: 'Cerveza 0,0', price: 3.5 },
            { name: 'Coronita', price: 3.5 },
            { name: 'Salitos', price: 3.5 },
            { name: '1906', price: 3.5 },
            { name: 'Estrella Galicia', price: 3.5 },
          ],
        },
        {
          name: 'Zumos',
          items: [
            { name: 'Zumo de naranja', price: 2.5 },
            { name: 'Zumo de piña', price: 2.5 },
            { name: 'Zumo de melocotón', price: 2.5 },
          ],
        },
        {
          name: 'Ron',
          items: [
            { name: 'Barceló añejo', price: 10 },
            { name: 'Brugal añejo', price: 10 },
            { name: 'Legendario', price: 10 },
            { name: 'Havana club 7 años', price: 13 },
            { name: 'Zacapa', price: 13 },
            { name: 'Ron Santa Teresa 1796', price: 13 },
          ],
        },
        {
          name: 'Whisky',
          items: [
            { name: 'Johnnie Walker red label', price: 10 },
            { name: 'Johnnie Walker black label', price: 10 },
            { name: 'Johnnie Walker green label', price: 13 },
            { name: 'Johnnie Walker Blue Label', price: 28 },
            { name: 'Macallan 12 años', price: 25 },
            { name: "Dewar's 15 años", price: 13 },
            { name: 'DYC 8 años', price: 13 },
            { name: 'Cutty sark 12 años', price: 10 },
            { name: 'J&B', price: 10 },
          ],
        },
        {
          name: 'Whiskey',
          items: [{ name: 'Jack Daniels', price: 13 }],
        },
        {
          name: 'Tequila',
          items: [{ name: 'Don julio Reposado', price: 13 }],
        },
        {
          name: 'Chupitos',
          items: [
            { name: 'Don julio Reposado', price: 5 },
            { name: 'Jägermeister', price: 3.5 },
            { name: 'Tequila fresa', price: 2.5 },
          ],
        },
        {
          name: 'Vodka',
          items: [
            { name: 'Absolut', price: 10 },
            { name: 'Ciroc piña', price: 13 },
            { name: 'Ciroc frutos rojos', price: 13 },
            { name: 'Ciroc manzana', price: 13 },
            { name: 'Ciroc normal', price: 13 },
            { name: 'Belvedere', price: 13 },
            { name: 'Grey goose', price: 13 },
          ],
        },
        {
          name: 'Ginebra',
          items: [
            { name: "Martin miller's", price: 13 },
            { name: "Seagram's", price: 10 },
            { name: 'Tanqueray', price: 10 },
            { name: 'Larios 12', price: 10 },
            { name: 'Puerto indias fresa', price: 10 },
            { name: 'Nordés', price: 13 },
            { name: 'Masters Gin', price: 10 },
            { name: "G'vine", price: 13 },
            { name: 'Bulldog', price: 10 },
            { name: 'Citadelle', price: 10 },
            { name: 'London Number 1', price: 10 },
            { name: 'Ginmare', price: 10 },
            { name: "Tanqueray 0'0", price: 10 },
            { name: "Hendrick's", price: 13 },
          ],
        },
        {
          name: 'Vinos',
          subsections: [
            {
              name: 'Tintos',
              items: [
                { name: 'Rioja (Rama Corta Crianza)', price: 4 },
                { name: 'Ribera del Duero (La planta)', price: 4 },
              ],
            },
            {
              name: 'Blancos',
              items: [
                { name: 'Semidulce (Alma)', price: 4 },
                { name: 'Albariño (Márquez de Vizhoja)', price: 4 },
              ],
            },
            {
              name: 'Botellas',
              items: [
                { name: 'Rama Corta Crianza', price: 20 },
                { name: 'La planta', price: 20 },
                { name: 'Alma', price: 18 },
                { name: 'Márquez de Vizhoja', price: 20 },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Batidos',
      slug: 'batidos',
      subcategories: [
        {
          name: 'Batidos',
          items: [
            { name: 'Batido de Oreo', price: 7.0 },
            { name: 'Batido de Kinder Bueno', price: 7.0 },
            { name: 'Batido de KitKat', price: 7.0 },
            { name: 'Batido de Filipinos blancos', price: 7.0 },
            { name: 'Batido de Huesitos', price: 7.0 },
            { name: 'Batido de Donut', price: 7.0 },
            { name: 'Batido de Pantera Rosa', price: 7.0 },
          ],
        },
      ],
    },
    {
      name: 'Entrantes',
      slug: 'entrantes',
      subcategories: [
        {
          name: 'Entrantes',
          items: [
            { name: 'Bacon cheese fries', price: 10 },
            { name: 'Fingers', price: 8.5 },
            { name: 'Tequeños', price: 9 },
            { name: 'Croquetas de jamón', price: 9 },
            { name: 'Quesadillas', price: 7 },
            { name: 'Alitas tailandesas', price: 8 },
            { name: 'Ensalada de burrata con tomate', price: 9 },
            { name: 'Ensalada Cesar', price: 12 },
          ],
        },
      ],
    },
    {
      name: 'Comidas',
      slug: 'comidas',
      subcategories: [
        {
          name: 'Comidas principales',
          items: [
            { name: 'Cheese burger', price: 13.5 },
            { name: 'Lady BBQ', price: 13.5 },
            { name: 'Egocentrica', price: 14.5 },
            { name: 'Club sandwich', price: 13 },
            { name: 'Entrecot', price: 21 },
            { name: 'Poke de pollo', price: 12 },
            { name: 'Poke de salmon', price: 12 },
          ],
        },
      ],
    },
    {
      name: 'Postres',
      slug: 'postres',
      subcategories: [
        {
          name: 'Postres',
          items: [
            { name: 'Tarta de queso', price: 5.5 },
            { name: 'Plato de fruta', price: 6 },
            { name: 'Fondee de chocolate', price: 15 },
            { name: 'Brownie', price: 5.5 },
            { name: 'Culan', price: 5.5 },
          ],
        },
      ],
    },
    {
      name: 'Cocktails',
      slug: 'cocktails',
      subcategories: [
        {
          name: 'Clásicos',
          items: [
            { name: 'Mojito clásico', price: 9.0 },
            { name: 'Mojito de sabores', price: 9.0, notes: 'Sabores varios' },
            { name: 'Piña colada', price: 9.0 },
            { name: 'Daiquiri clásico', price: 9.0 },
            { name: 'Daiquiri de frutas', price: 9.0 },
            { name: 'Sex on the Beach', price: 9.0 },
            { name: 'Margarita', price: 9.0 },
            { name: 'San Francisco', price: 9.0 },
            { name: 'Caipirinha', price: 9.0 },
          ],
        },
        {
          name: '¿A qué sabe tu Ego?',
          type: 'signature',
          items: [
            {
              name: 'Umi Oriental',
              price: 11.0,
              description:
                'yuzu, melón, albahaca, blue curaçao, lima y ginebra',
              tagline: 'minimalista y delicado',
            },
            {
              name: 'Rosé de minuit',
              price: 11.0,
              description: 'naranja, fresa y cava',
              tagline: 'sofisticado y misterioso',
            },
            {
              name: 'Baobab Dreams',
              price: 11.0,
              description: 'piña, plátano, coco y ron',
              tagline: 'exótico y evocador',
            },
            {
              name: 'Smoky Tennessee',
              price: 11.0,
              description: "naranja, limón, granadina y Jack Daniel's",
              tagline: 'dulzura ahumada',
            },
            {
              name: 'Rojo Zar',
              price: 11.0,
              description:
                'zumo de granada, limón, azúcar, agua con gas y vodka',
              tagline: 'Desde Rusia con amor',
            },
          ],
        },
      ],
    },
  ],
};

// Funciones helper para la nueva carta
export const getCategoryBySlug = (slug: string): MenuCategory | undefined => {
  return fullMenuData.categories.find((category) => category.slug === slug);
};

export const getAllCategories = (): MenuCategory[] => {
  return fullMenuData.categories;
};

export const getMenuVersion = (): string => {
  return fullMenuData.version;
};

export const getCurrency = (): string => {
  return fullMenuData.currency;
};

// Mantener interfaces originales para compatibilidad con componentes existentes
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: 'comida' | 'bebida';
  featured?: boolean;
}

// Datos originales simplificados (sin cachimbas)
export const menuItems: MenuItem[] = [
  // Comida
  {
    id: 'f1',
    name: 'Mezze Árabe Premium',
    description:
      'Selección de entrantes árabes con hummus, baba ganoush, falafel y pan pita recién horneado.',
    price: '18€',
    image: '/food-1.jpg',
    category: 'comida',
    featured: true,
  },
  {
    id: 'f2',
    name: 'Shawarma de Cordero',
    description:
      'Tierno cordero marinado con especias árabes, servido con arroz basmati y salsa tahini.',
    price: '22€',
    image: '/food-2.jpg',
    category: 'comida',
  },
  {
    id: 'f3',
    name: 'Baklava Artesanal',
    description:
      'Delicioso postre de hojaldre con miel, pistachos y almendras. Hecho en casa.',
    price: '8€',
    image: '/food-3.jpg',
    category: 'comida',
  },
  // Bebidas
  {
    id: 'b1',
    name: 'Té Árabe Especiado',
    description:
      'Mezcla tradicional de té negro con cardamomo, canela y menta fresca.',
    price: '6€',
    image: '/drink-1.jpg',
    category: 'bebida',
  },
  {
    id: 'b2',
    name: 'Café Turco Premium',
    description:
      'Auténtico café turco preparado de forma tradicional con cardamomo.',
    price: '5€',
    image: '/drink-2.jpg',
    category: 'bebida',
  },
];

// Funciones helper para datos originales
export const getItemsByCategory = (category: 'comida' | 'bebida') => {
  return menuItems.filter((item) => item.category === category);
};

export const getFeaturedItems = () => {
  return menuItems.filter((item) => item.featured);
};
