export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: 'cachimba' | 'comida' | 'bebida';
  featured?: boolean;
  intensity?: 'Suave' | 'Medio' | 'Intenso';
  flavors?: string[];
}

export const menuItems: MenuItem[] = [
  // Cachimbas Featured
  {
    id: 'c1',
    name: 'Double Apple Deluxe',
    description:
      'Mezcla clásica de manzana con toques dulces y especiados. Perfecta para principiantes.',
    price: '25€',
    image: '/cachimba-1.jpg',
    category: 'cachimba',
    featured: true,
    intensity: 'Suave',
    flavors: ['Manzana', 'Canela', 'Miel'],
  },
  {
    id: 'c2',
    name: 'Mint Fusion Premium',
    description:
      'Explosión refrescante de menta con hierbabuena y eucalipto. Sensación glacial única.',
    price: '28€',
    image: '/cachimba-2.jpg',
    category: 'cachimba',
    featured: true,
    intensity: 'Intenso',
    flavors: ['Menta', 'Hierbabuena', 'Eucalipto'],
  },
  {
    id: 'c3',
    name: 'Tropical Paradise',
    description:
      'Combinación exótica de frutas tropicales con un toque de coco y lima fresca.',
    price: '30€',
    image: '/cachimba-3.jpg',
    category: 'cachimba',
    featured: true,
    intensity: 'Medio',
    flavors: ['Mango', 'Piña', 'Coco', 'Lima'],
  },
  {
    id: 'c4',
    name: 'Berry Mix Exclusive',
    description:
      'Selección premium de frutos rojos con arándanos, frambuesas y un toque de vainilla.',
    price: '32€',
    image: '/cachimba-4.jpg',
    category: 'cachimba',
    featured: true,
    intensity: 'Medio',
    flavors: ['Arándanos', 'Frambuesas', 'Vainilla'],
  },
  {
    id: 'c5',
    name: 'Chocolate Dreams',
    description:
      'Indulgente mezcla de chocolate belga con toques de café y avellana tostada.',
    price: '35€',
    image: '/cachimba-5.jpg',
    category: 'cachimba',
    featured: true,
    intensity: 'Intenso',
    flavors: ['Chocolate', 'Café', 'Avellana'],
  },
  {
    id: 'c6',
    name: 'Citrus Blast',
    description:
      'Energizante combinación de cítricos con naranja, limón y pomelo rosa.',
    price: '27€',
    image: '/cachimba-6.jpg',
    category: 'cachimba',
    featured: true,
    intensity: 'Medio',
    flavors: ['Naranja', 'Limón', 'Pomelo'],
  },
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

export const getItemsByCategory = (
  category: 'cachimba' | 'comida' | 'bebida'
) => {
  return menuItems.filter((item) => item.category === category);
};

export const getFeaturedItems = () => {
  return menuItems.filter((item) => item.featured);
};
