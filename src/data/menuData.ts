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
            { name: 'Mosto', price: 2.5 },
          ],
        },
        {
          name: 'Vinos',
          items: [
            {
              name: 'Vino blanco Verdejo',
              variants: [
                { size: 'copa', price: 4.0 },
                { size: 'botella', price: 20.0 },
              ],
            },
            {
              name: 'Vino blanco semidulce',
              variants: [
                { size: 'copa', price: 4.0 },
                { size: 'botella', price: 20.0 },
              ],
            },
            {
              name: 'Vino tinto Rioja',
              variants: [
                { size: 'copa', price: 4.0 },
                { size: 'botella', price: 20.0 },
              ],
            },
            { name: 'Tinto de verano', price: 3.5 },
          ],
        },
      ],
    },
    {
      name: 'Desayunos',
      slug: 'desayunos',
      subcategories: [
        {
          name: 'Tostas',
          items: [
            { name: 'Tosta de aguacate con salmón', price: 6.0 },
            { name: 'Tosta de jamón y tomate', price: 4.5 },
            {
              name: 'Tostas clásicas',
              price: 4.0,
              notes: 'Mermelada, mantequilla, aceite',
            },
            { name: 'Tosta de huevos revueltos y pavo', price: 6.0 },
            { name: 'Sándwich mixto', price: 3.5 },
          ],
        },
        {
          name: 'Bollería',
          items: [
            { name: 'Croissant', price: 3.5 },
            { name: 'Croissant mixto', price: 4.0 },
            { name: 'Tortitas', price: 4.5 },
            { name: 'Crepes', price: 4.0 },
          ],
        },
        {
          name: 'Healthy',
          items: [
            { name: 'Té matcha', price: 4.0 },
            { name: 'Bowl de frutas de temporada', price: 5.0 },
            {
              name: 'Bowl de yogur kéfir con frutos del bosque y miel',
              price: 6.5,
            },
          ],
        },
        {
          name: 'Cafés',
          items: [
            { name: 'Café con leche', price: 2.5 },
            { name: 'Café bombón', price: 3.0 },
            { name: 'Café cortado', price: 2.5 },
            { name: 'Café solo', price: 2.5 },
            { name: 'Café americano', price: 2.5 },
            { name: 'Capuccino', price: 3.0 },
            { name: 'Café irlandés', price: 3.5 },
          ],
        },
      ],
    },
    {
      name: 'Meriendas',
      slug: 'meriendas',
      subcategories: [
        {
          name: 'Dulces',
          items: [
            { name: 'Tortitas', price: 4.5 },
            { name: 'Gofres', price: 4.5 },
            {
              name: 'Brownie con helado de vainilla y caramelo salado',
              price: 5.0,
            },
            { name: 'Crepes', price: 4.0 },
            { name: 'Sándwich mixto', price: 3.5 },
            { name: 'Croissant', price: 3.5 },
            { name: 'Croissant mixto', price: 4.0 },
            { name: 'Tequeños de Nutella', price: 7.0 },
            { name: 'Tarta de queso', price: 6.0 },
          ],
        },
        {
          name: 'Healthy',
          items: [
            { name: 'Té matcha', price: 4.0 },
            { name: 'Bowl de frutas de temporada', price: 5.0 },
            { name: 'Bowl de yogur kéfir con melocotón y fresas', price: 6.5 },
          ],
        },
        {
          name: 'Batidos',
          subsections: [
            {
              name: 'Galletas',
              items: [
                { name: 'Batido de Oreo', price: 7.0 },
                { name: 'Batido de Happy Hippo', price: 7.0 },
                { name: 'Batido de Kinder Bueno', price: 7.0 },
                { name: 'Batido de KitKat', price: 7.0 },
                { name: 'Batido de Filipinos blancos', price: 7.0 },
                { name: 'Batido de Huesitos', price: 7.0 },
              ],
            },
            {
              name: 'Bollería',
              items: [
                { name: 'Batido de Donut', price: 7.0 },
                { name: 'Batido de Fosquito', price: 7.0 },
                { name: 'Batido de Pantera Rosa', price: 7.0 },
              ],
            },
            {
              name: 'Smoothies',
              items: [
                { name: 'Smoothie Tropical', price: 7.0 },
                { name: 'Smoothie de kiwi, pepino y melón', price: 7.0 },
                {
                  name: 'Smoothie de naranja, pomelo rosa y mandarina',
                  price: 7.0,
                },
                {
                  name: 'Smoothie de frutas',
                  price: 7.0,
                  notes: 'A consultar',
                },
              ],
            },
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
