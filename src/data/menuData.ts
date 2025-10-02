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
  imageUrl?: string;
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
            {
              name: 'Agua',
              price: 3.0,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413205/Agua_demd03.png',
            },
            {
              name: 'Agua con gas',
              price: 3.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413205/Agua_demd03.png',
            },
            {
              name: 'Refresco pequeño',
              price: 3.0,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759420149/Refresco_peque%C3%B1o_fyulcy.png',
            },
            {
              name: 'CocaCola',
              price: 3.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413206/Coca_cola_neoe67.png',
            },
            {
              name: 'CocaCola Zero',
              price: 3.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413206/Coca_cola_zero_ayzngu.png',
            },
            {
              name: 'Sprite',
              price: 3.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413212/Sprite_aburvy.png',
            },
            {
              name: 'Fanta de naranja',
              price: 3.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413206/Fanta_naranja_bf6n6a.png',
            },
            {
              name: 'Fanta de limón',
              price: 3.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413206/Fanta_limon_ibrrte.png',
            },
            {
              name: 'Nestea sin azúcar',
              price: 3.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413211/Nestea_sin_azucar_sq1ttg.png',
            },
            {
              name: 'Nestea de maracuyá',
              price: 3.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413211/Nestea_de_maracuyá_qfdwdy.png',
            },
            {
              name: 'Aquarius de limón',
              price: 3.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413205/Aquarius_limon_wzhz8a.png',
            },
            {
              name: 'Aquarius de naranja',
              price: 3.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413205/Aquarius_naranja_hykvig.png',
            },
            {
              name: 'Monsters',
              price: 4.0,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413206/Monsters_npjrwc.png',
            },
            {
              name: 'Red Bulls',
              price: 3.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413211/Redbull_pvnclm.png',
            },
          ],
        },
        {
          name: 'Cervezas',
          items: [
            {
              name: 'Doble',
              price: 3.0,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413206/Doble_Cerveza_dsxn3t.png',
            },
            {
              name: 'Tercio de Mahou',
              price: 3.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413215/Tercio_Mahou_wmgbmt.png',
            },
            {
              name: 'Alhambra',
              price: 3.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413205/Alhambra_owcjdu.png',
            },
            {
              name: 'Radler',
              price: 3.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413211/Radler_trkkpz.png',
            },
            {
              name: 'Cerveza 0,0',
              price: 3.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413205/Cerveza_0.0_x9xmvb.png',
            },
            {
              name: 'Coronita',
              price: 3.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413206/Coronita_wtala8.png',
            },
            {
              name: 'Salitos',
              price: 3.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759416343/Salitos_dcwq5w.png',
            },
            {
              name: '1906',
              price: 3.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759416343/1906_ounkv6.png',
            },
            {
              name: 'Estrella Galicia',
              price: 3.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759417271/Estrella_Galicia_cxqfgc.png',
            },
          ],
        },
        {
          name: 'Zumos',
          items: [
            {
              name: 'Zumo de naranja',
              price: 2.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759416344/Zumo_naranja_byq7cc.png',
            },
            {
              name: 'Zumo de piña',
              price: 2.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759416343/Zumo_piña_e4edq1.png',
            },
            {
              name: 'Zumo de melocotón',
              price: 2.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759416343/Zumo_melocoton_jtyq1q.png',
            },
          ],
        },
        {
          name: 'Ron',
          items: [
            {
              name: 'Barceló añejo',
              price: 10,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/BARCELO_zfmecg',
            },
            {
              name: 'Brugal añejo',
              price: 10,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/Brugal_rnbgsh',
            },
            {
              name: 'Legendario',
              price: 10,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/Legendario_cluljd',
            },
            {
              name: 'Havana club 7 años',
              price: 13,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/HAVANA_ielo5y',
            },
            { name: 'Zacapa', price: 13 },
            {
              name: 'Ron Santa Teresa 1796',
              price: 13,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/SANTA_TERESA_i7dqnk',
            },
          ],
        },
        {
          name: 'Whisky',
          items: [
            {
              name: 'Johnnie Walker red label',
              price: 10,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/RED_LABEL_v4k69u',
            },
            {
              name: 'Johnnie Walker black label',
              price: 10,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/BLACK_LABEL_gj3ov2',
            },
            {
              name: 'Johnnie Walker green label',
              price: 13,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/GREEN_LABEL_og1ajs',
            },
            {
              name: 'Johnnie Walker Blue Label',
              price: 28,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/BLUE_LABEL_wp0e6k',
            },
            {
              name: 'Macallan 12 años',
              price: 25,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172300/MCALLAN_alijbr.jpg',
            },
            {
              name: "Dewar's 15 años",
              price: 13,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172274/DEWARS_nhxafd.jpg',
            },
            {
              name: 'DYC 8 años',
              price: 13,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/DYC_uzyjiv',
            },
            {
              name: 'Cutty sark 12 años',
              price: 10,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/CUTTY_SARK_inukfj',
            },
            {
              name: 'J&B',
              price: 10,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/JB_dinago',
            },
            {
              name: 'Jack Daniels',
              price: 13,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/JACK_DANIELS_dmynw7',
            },
          ],
        },
        {
          name: 'Tequila',
          items: [
            {
              name: 'Don julio Reposado',
              price: 13,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/DON_JULIO_v5jhp0',
            },
          ],
        },
        {
          name: 'Chupitos',
          items: [
            {
              name: 'Don julio Reposado',
              price: 5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/DON_JULIO_v5jhp0',
            },
            {
              name: 'Jägermeister',
              price: 3.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/JAGERMEISTER_kaql1a',
            },
            {
              name: 'Tequila fresa',
              price: 2.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/SOMBRERO_MEXICANO_ehrbqx',
            },
          ],
        },
        {
          name: 'Vodka',
          items: [
            {
              name: 'Absolut',
              price: 10,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/ABSOLUT_VODKA_fgu1ru',
            },
            {
              name: 'Ciroc piña',
              price: 13,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/CIROC_PINEAPPLE_fnwbvo',
            },
            {
              name: 'Ciroc frutos rojos',
              price: 13,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/CIROC_RED_BERRY_tdvprz',
            },
            {
              name: 'Ciroc manzana',
              price: 13,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/CIROC_APPLE_tizlru',
            },
            {
              name: 'Ciroc normal',
              price: 13,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/CIROC_VODKA_fxytqv',
            },
            {
              name: 'Belvedere',
              price: 13,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/BELVEDERE_plqh4n',
            },
            {
              name: 'Grey goose',
              price: 13,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/GREY_GOOSE_w0tf3e',
            },
          ],
        },
        {
          name: 'Ginebra',
          items: [
            {
              name: "Martin miller's",
              price: 13,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/MARTIN_MILLERS_tnow7c',
            },
            {
              name: "Seagram's",
              price: 10,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/SEAGRAMS_DRY_i2jhyu',
            },
            {
              name: 'Tanqueray',
              price: 10,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/TANQUERAY_exdr1h',
            },
            {
              name: 'Larios 12',
              price: 10,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/LARIOS_12_ua6ezv',
            },
            {
              name: 'Puerto indias fresa',
              price: 10,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/PUERTO_DE_INDIAS_ihvxih',
            },
            {
              name: 'Nordés',
              price: 13,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/NORDES_kxtgdj',
            },
            {
              name: 'Masters Gin',
              price: 10,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/MASTERS_GIN_ygkcyu',
            },
            {
              name: "G'vine",
              price: 13,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172283/GVINE_GIN_DE_TRANCE_wfeh1x.jpg',
            },
            {
              name: 'Bulldog',
              price: 10,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/BULLDOG_h71zmp',
            },
            {
              name: 'Citadelle',
              price: 10,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/CITADELLE_ezpjoj',
            },
            {
              name: 'London Number 1',
              price: 10,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/THE_LONDON_ngb1dh',
            },
            {
              name: 'Ginmare',
              price: 10,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/GIN_MARE_qv4o3m',
            },
            {
              name: "Tanqueray 0'0",
              price: 10,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/TANQUERAY_00_qv2itc',
            },
            {
              name: "Hendrick's",
              price: 13,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/HENDRICKS_pbayx3',
            },
          ],
        },
        {
          name: 'Vinos',
          subsections: [
            {
              name: 'Tintos',
              items: [
                {
                  name: 'Rioja (Rama Corta Crianza)',
                  price: 4,
                  imageUrl:
                    'https://res.cloudinary.com/dm70hhhnm/image/upload/RAMA_CORTA_j6tz3a',
                },
                {
                  name: 'Ribera del Duero (La planta)',
                  price: 4,
                  imageUrl:
                    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172290/LA_PLANTA_RIBERA_DEL_DUERO_dzucnd.jpg',
                },
              ],
            },
            {
              name: 'Blancos',
              items: [
                {
                  name: 'Semidulce (Alma)',
                  price: 4,
                  imageUrl:
                    'https://res.cloudinary.com/dm70hhhnm/image/upload/ALMA_rmvygx',
                },
                {
                  name: 'Albariño (Márquez de Vizhoja)',
                  price: 4,
                  imageUrl:
                    'https://res.cloudinary.com/dm70hhhnm/image/upload/MARQUES_DE_VIZHOJA_zfmwby',
                },
              ],
            },
            {
              name: 'Botellas',
              items: [
                {
                  name: 'Rama Corta Crianza',
                  price: 20,
                  imageUrl:
                    'https://res.cloudinary.com/dm70hhhnm/image/upload/RAMA_CORTA_j6tz3a',
                },
                {
                  name: 'La planta',
                  price: 20,
                  imageUrl:
                    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172290/LA_PLANTA_RIBERA_DEL_DUERO_dzucnd.jpg',
                },
                {
                  name: 'Alma',
                  price: 18,
                  imageUrl:
                    'https://res.cloudinary.com/dm70hhhnm/image/upload/ALMA_rmvygx',
                },
                {
                  name: 'Márquez de Vizhoja',
                  price: 20,
                  imageUrl:
                    'https://res.cloudinary.com/dm70hhhnm/image/upload/MARQUES_DE_VIZHOJA_zfmwby',
                },
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
            {
              name: 'Batido de Oreo',
              price: 7.0,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/OREO_n7xkb2',
            },
            {
              name: 'Batido de Kinder Bueno',
              price: 7.0,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/KINDER_BUENO_NEGRO_oauu15',
            },
            {
              name: 'Batido de KitKat',
              price: 7.0,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/KIT_KAT_ph9mnp',
            },
            {
              name: 'Batido de Filipinos blancos',
              price: 7.0,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/FILIPINO_h1ynyz',
            },
            {
              name: 'Batido de Huesitos',
              price: 7.0,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/HUESITOS_gpkxsk',
            },
            {
              name: 'Batido de Donut',
              price: 7.0,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/DONUT_lmyanz',
            },
            {
              name: 'Batido de Pantera Rosa',
              price: 7.0,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/PANTERA_ROSA_e17u1s',
            },
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
            {
              name: 'Bacon cheese fries',
              price: 10,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/PATATAS_BACON_Y_QUESO_lnibyb',
            },
            {
              name: 'Fingers',
              price: 8.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/TIRAS_DE_POLLO_kbtuvf',
            },
            {
              name: 'Tequeños',
              price: 9,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/TEQUEÑOS_vftqlw',
            },
            {
              name: 'Croquetas de jamón',
              price: 9,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/CROQUETAS_e4c25k',
            },
            {
              name: 'Quesadillas',
              price: 7,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/COMIDA_2_2_a3nssr',
            },
            {
              name: 'Alitas tailandesas',
              price: 8,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/ALITAS_2_i2q313',
            },
            {
              name: 'Ensalada de burrata con tomate',
              price: 9,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/BURRATA_a5u73h',
            },
            {
              name: 'Ensalada Cesar',
              price: 12,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/ENSALADA_CESAR_dv7pp6',
            },
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
            {
              name: 'Cheese burger',
              price: 13.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172140/HAMBURGUESA_1_kpeok1.jpg',
            },
            {
              name: 'Lady BBQ',
              price: 13.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172140/HAMBURGUESA_2_cjpkzb.jpg',
            },
            {
              name: 'Egocentrica',
              price: 14.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172141/HAMBURGUESA_3_nixycj.jpg',
            },
            {
              name: 'Club sandwich',
              price: 13,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/COMIDA_3_jo8flu',
            },
            {
              name: 'Entrecot',
              price: 21,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/ENTRECOT_gwlgu2',
            },
            {
              name: 'Poke de pollo',
              price: 12,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/COMIDA_1_lp57cc',
            },
            {
              name: 'Poke de salmon',
              price: 12,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/COMIDA_2_lizzfn',
            },
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
            { name: 'Tarta de queso', price: 5.5, imageUrl: '' },
            {
              name: 'Plato de fruta',
              price: 6,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/BOWL_DE_FRUTAS_DE_TEMPORADA_fwcjbk',
            },
            {
              name: 'Fondee de chocolate',
              price: 15,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/BOWL_DE_FRUTAS_DE_TEMPORADA_CHOCOLATE_m6nfi6',
            },
            {
              name: 'Brownie',
              price: 5.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/POSTRE_2_l0zycj',
            },
            {
              name: 'Culan',
              price: 5.5,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/POSTRE_1_l4plzo',
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
            { name: 'Mojito clásico', price: 9.0, imageUrl: '' },
            {
              name: 'Mojito de sabores',
              price: 9.0,
              notes: 'Sabores varios',
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/Mojito_de_sabores_whiz0m',
            },
            {
              name: 'Piña colada',
              price: 9.0,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/PIÑA_COLADA_iuojwr',
            },
            {
              name: 'Daiquiri clásico',
              price: 9.0,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/Daiquiri_clásico_m2cqc0',
            },
            { name: 'Daiquiri de frutas', price: 9.0, imageUrl: '' },
            { name: 'Sex on the Beach', price: 9.0, imageUrl: '' },
            {
              name: 'Margarita',
              price: 9.0,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172218/MARGARITA_wqvxko.jpg',
            },
            {
              name: 'San Francisco',
              price: 9.0,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172219/SAN_FRANCISCO_ikkbl9.jpg',
            },
            {
              name: 'Caipirinha',
              price: 9.0,
              imageUrl:
                'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172217/CAIPIRIÑA_lozz49.jpg',
            },
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
              imageUrl: '',
            },
            {
              name: 'Rosé de minuit',
              price: 11.0,
              description: 'naranja, fresa y cava',
              tagline: 'sofisticado y misterioso',
              imageUrl: '',
            },
            {
              name: 'Baobab Dreams',
              price: 11.0,
              description: 'piña, plátano, coco y ron',
              tagline: 'exótico y evocador',
              imageUrl: '',
            },
            {
              name: 'Smoky Tennessee',
              price: 11.0,
              description: "naranja, limón, granadina y Jack Daniel's",
              tagline: 'dulzura ahumada',
              imageUrl: '',
            },
            {
              name: 'Rojo Zar',
              price: 11.0,
              description:
                'zumo de granada, limón, azúcar, agua con gas y vodka',
              tagline: 'Desde Rusia con amor',
              imageUrl: '',
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
