export interface QuestionOption {
  value: string;
  label: string;
  description: string;
}

export interface SurveyQuestion {
  id: number;
  question: string;
  options: QuestionOption[];
}

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 1,
    question: '¿Qué tipo de sabores prefieres?',
    options: [
      {
        value: 'dulces',
        label: 'Dulces',
        description: 'Sabores tipo vainilla, chicle, caramelo o galleta.',
      },
      {
        value: 'frutales',
        label: 'Frutales',
        description: 'Fresas, manzana, melón, frutos tropicales y dulces.',
      },
      {
        value: 'mentolados',
        label: 'Mentolados',
        description:
          'Sensación de frescor intenso, como menta o hielo en garganta.',
      },
      {
        value: 'citricos',
        label: 'Cítricos',
        description: 'Lima, limón, naranja: sabores más ácidos y refrescantes.',
      },
      {
        value: 'especiados',
        label: 'Especiados',
        description:
          'Sabores cálidos e intensos como canela, cardamomo o clavo.',
      },
      {
        value: 'terrosos',
        label: 'Terrosos',
        description:
          'Sabores profundos, parecidos al tabaco natural o a especias secas, con un toque ahumado.',
      },
    ],
  },
  {
    id: 2,
    question: '¿Prefieres sabores más suaves o intensos?',
    options: [
      {
        value: 'muy-suaves',
        label: 'Muy suaves',
        description: 'Sabores delicados que no dominen la experiencia.',
      },
      {
        value: 'equilibrados',
        label: 'Equilibrados',
        description: 'Un punto medio entre suavidad e intensidad.',
      },
      {
        value: 'muy-intensos',
        label: 'Muy intensos',
        description: 'Sabores potentes y con mucho carácter.',
      },
    ],
  },
  {
    id: 3,
    question: '¿Fumas solo o acompañado normalmente?',
    options: [
      {
        value: 'solo',
        label: 'Solo',
        description:
          'Prefieres momentos de introspección y relajación personal.',
      },
      {
        value: 'pareja',
        label: 'En pareja',
        description: 'Disfrutas compartir la experiencia con alguien especial.',
      },
      {
        value: 'grupo',
        label: 'En grupo (3 o más)',
        description: 'La cachimba es tu excusa perfecta para socializar.',
      },
    ],
  },
  {
    id: 4,
    question: '¿Con qué bebida acompañarías tu fumada?',
    options: [
      {
        value: 'te',
        label: 'Té / infusión',
        description: 'Bebidas relajantes que complementen la experiencia.',
      },
      {
        value: 'cafe',
        label: 'Café',
        description:
          'Un contraste estimulante con la relajación de la cachimba.',
      },
      {
        value: 'coctel',
        label: 'Cóctel',
        description: 'Para ocasiones especiales y momentos de celebración.',
      },
      {
        value: 'refresco',
        label: 'Refresco',
        description: 'Algo refrescante y burbujeante.',
      },
      {
        value: 'agua',
        label: 'Agua',
        description: 'Simple, pura y que no interfiera con los sabores.',
      },
    ],
  },
  {
    id: 5,
    question: '¿Fumas cachimba regularmente?',
    options: [
      {
        value: 'a-menudo',
        label: 'Sí, a menudo',
        description: 'Es parte de tu rutina habitual de relajación.',
      },
      {
        value: 'a-veces',
        label: 'A veces',
        description: 'En ocasiones especiales o cuando tienes tiempo.',
      },
      {
        value: 'primera-vez',
        label: 'Es mi primera vez',
        description: 'Estás explorando esta nueva experiencia.',
      },
    ],
  },
  {
    id: 6,
    question: '¿Te molestan los sabores que raspan la garganta?',
    options: [
      {
        value: 'si',
        label: 'Sí',
        description: 'Prefieres experiencias completamente suaves.',
      },
      {
        value: 'no',
        label: 'No',
        description: 'No te importa un poco de intensidad en la garganta.',
      },
      {
        value: 'igual',
        label: 'Me da igual',
        description: 'Te adaptas a cualquier tipo de sensación.',
      },
    ],
  },
  {
    id: 7,
    question: '¿Te gustan los sabores exóticos o clásicos?',
    options: [
      {
        value: 'clasicos',
        label: 'Clásicos',
        description: 'Menta, uva, manzana... los sabores de toda la vida.',
      },
      {
        value: 'exoticos',
        label: 'Exóticos',
        description: 'Mango picante, mojito de kiwi... aventuras de sabor.',
      },
      {
        value: 'mezcla',
        label: 'Una mezcla de ambos',
        description: 'Lo mejor de ambos mundos según el momento.',
      },
    ],
  },
  {
    id: 8,
    question:
      '¿Te interesa probar mezclas personalizadas o algo más tradicional?',
    options: [
      {
        value: 'personalizado',
        label: 'Personalizado',
        description: 'Mezclas únicas creadas especialmente para ti.',
      },
      {
        value: 'tradicional',
        label: 'Tradicional',
        description: 'Combinaciones probadas y populares.',
      },
      {
        value: 'recomendacion',
        label: 'Lo que tú me recomiendes',
        description: 'Confías en la experiencia del especialista.',
      },
    ],
  },
  {
    id: 9,
    question: '¿Te apetece algo relajante o estimulante?',
    options: [
      {
        value: 'relajante',
        label: 'Relajante',
        description: 'Para desconectar y encontrar paz interior.',
      },
      {
        value: 'estimulante',
        label: 'Estimulante',
        description: 'Para activarte y disfrutar con energía.',
      },
      {
        value: 'no-se',
        label: 'No lo sé',
        description: 'Déjate sorprender por lo que el momento pida.',
      },
    ],
  },
  {
    id: 10,
    question:
      '¿Qué parte del menú degustación prefieres que tenga más protagonismo?',
    options: [
      {
        value: 'entrada-suave',
        label: 'Entrada suave',
        description: 'Un comienzo delicado que prepare el paladar.',
      },
      {
        value: 'plato-fuerte',
        label: 'Plato fuerte con mucha personalidad',
        description: 'El momento cumbre de sabores intensos.',
      },
      {
        value: 'final-dulce',
        label: 'Final dulce/postre',
        description: 'Un cierre memorable y reconfortante.',
      },
      {
        value: 'equilibrado',
        label: 'Equilibrado',
        description: 'Cada parte igual de importante en la experiencia.',
      },
    ],
  },
];
