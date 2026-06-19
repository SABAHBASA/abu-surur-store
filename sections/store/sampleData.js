/**
 * بيانات رمزية - البرامج والألعاب
 * Sample Data - Apps and Games
 */

const apps = [
  {
    id: 'APP_001',
    type: 'app',
    name: 'ملي النصوص',
    nameEn: 'Text Editor Pro',
    description: 'محرر نصوص قوي للبرمجة وكتابة النصوص',
    category: 'productivity',
    publisher: 'Pro Software',
    image: 'https://via.placeholder.com/400x300?text=Text+Editor+Pro',
    thumbnail: 'https://via.placeholder.com/200x200?text=TE',
    screenshots: [
      'https://via.placeholder.com/800x600?text=Screenshot+1',
      'https://via.placeholder.com/800x600?text=Screenshot+2'
    ],
    rating: 4.8,
    reviews: 2456,
    downloads: '500K+',
    version: '2.1.0',
    size: '45MB',
    os: 'Windows 7+',
    language: 'عربي, إنجليزي',
    pricing: {
      original: 150,
      current: 99,
      currency: 'SYP',
      packages: [
        { id: 1, name: 'رخيصة فردية', price: 99, features: ['1 Computer', 'Email Support'] },
        { id: 2, name: 'رخيصة عائلية', price: 199, features: ['3 Computers', 'Priority Support'] }
      ]
    },
    isActive: true,
    isPromoted: true,
    createdAt: '2026-01-15'
  },
  {
    id: 'APP_002',
    type: 'app',
    name: 'أداة التسجيل
    nameEn: 'Screen Recorder HD',
    description: 'تسجيل شاشة وفيديو بجودة عالية',
    category: 'utilities',
    publisher: 'Tech Solutions',
    image: 'https://via.placeholder.com/400x300?text=Screen+Recorder',
    thumbnail: 'https://via.placeholder.com/200x200?text=SR',
    screenshots: [],
    rating: 4.5,
    reviews: 1823,
    downloads: '300K+',
    version: '3.0.5',
    size: '120MB',
    os: 'Windows 10+',
    language: 'عربي, إنجليزي',
    pricing: {
      original: 200,
      current: 149,
      currency: 'SYP',
      packages: []
    },
    isActive: true,
    isPromoted: false,
    createdAt: '2026-01-20'
  },
  {
    id: 'APP_003',
    type: 'app',
    name: 'مروبي الزياروس',
    nameEn: 'Antivirus Pro',
    description: 'برنامج حماية ضد الفيروسات',
    category: 'security',
    publisher: 'Security Corp',
    image: 'https://via.placeholder.com/400x300?text=Antivirus+Pro',
    thumbnail: 'https://via.placeholder.com/200x200?text=AV',
    screenshots: [],
    rating: 4.6,
    reviews: 3200,
    downloads: '2M+',
    version: '4.2.1',
    size: '200MB',
    os: 'Windows XP+',
    language: 'عربي, إنجليزي',
    pricing: {
      original: 250,
      current: 179,
      currency: 'SYP',
      packages: []
    },
    isActive: true,
    isPromoted: true,
    createdAt: '2026-02-01'
  }
];

const games = [
  {
    id: 'GAME_001',
    type: 'game',
    name: 'حرب الفضاء الشهيرة',
    nameEn: 'Space Warriors',
    description: 'لعبة حرب فضاء مثيرة مع رسومات برعبة عالية',
    category: 'action',
    publisher: 'Epic Games Studio',
    image: 'https://via.placeholder.com/400x300?text=Space+Warriors',
    thumbnail: 'https://via.placeholder.com/200x200?text=SW',
    screenshots: [
      'https://via.placeholder.com/800x600?text=Game+Screenshot+1'
    ],
    rating: 4.9,
    reviews: 5678,
    downloads: '5M+',
    version: '1.2.0',
    size: '2.5GB',
    os: 'Windows 10/11, Intel Core i5+',
    language: 'عربي, إنجليزي, فرنسي',
    pricing: {
      original: 500,
      current: 399,
      currency: 'SYP',
      packages: [
        { id: 1, name: 'لعبة أساسية', price: 399, features: ['Main Game'] },
        { id: 2, name: 'مع DLC', price: 549, features: ['Main Game', 'Season Pass'] }
      ]
    },
    isActive: true,
    isPromoted: true,
    createdAt: '2026-01-10'
  },
  {
    id: 'GAME_002',
    type: 'game',
    name: 'مينه بالأبعاد الثلاثة',
    nameEn: 'Minecraft Classic',
    description: 'لعبة بناء في عالم مفتوح',
    category: 'sandbox',
    publisher: 'Mojang Studios',
    image: 'https://via.placeholder.com/400x300?text=Minecraft',
    thumbnail: 'https://via.placeholder.com/200x200?text=MC',
    screenshots: [],
    rating: 4.7,
    reviews: 8934,
    downloads: '50M+',
    version: '1.18.2',
    size: '1.8GB',
    os: 'Windows 7+, Linux, Mac',
    language: 'عربي, إنجليزي',
    pricing: {
      original: 300,
      current: 249,
      currency: 'SYP',
      packages: []
    },
    isActive: true,
    isPromoted: false,
    createdAt: '2026-02-05'
  },
  {
    id: 'GAME_003',
    type: 'game',
    name: 'لعبة السيارات',
    nameEn: 'Racing Thunder',
    description: 'لعبة سباق سيارات سريعة عوالم مختلفة',
    category: 'racing',
    publisher: 'Codemasters',
    image: 'https://via.placeholder.com/400x300?text=Racing+Game',
    thumbnail: 'https://via.placeholder.com/200x200?text=RT',
    screenshots: [],
    rating: 4.4,
    reviews: 3421,
    downloads: '2M+',
    version: '2.0.1',
    size: '3GB',
    os: 'Windows 10/11, RTX Graphics Card',
    language: 'إنجليزي, عربي',
    pricing: {
      original: 600,
      current: 449,
      currency: 'SYP',
      packages: []
    },
    isActive: true,
    isPromoted: true,
    createdAt: '2026-02-10'
  },
  {
    id: 'GAME_004',
    type: 'game',
    name: 'رومنزا قاذطة',
    nameEn: 'Dark Fantasy RPG',
    description: 'لعبة RPG خيال مظلمة مع عالم ضخم',
    category: 'rpg',
    publisher: 'Dark Fantasy Inc',
    image: 'https://via.placeholder.com/400x300?text=Dark+Fantasy',
    thumbnail: 'https://via.placeholder.com/200x200?text=DF',
    screenshots: [],
    rating: 4.5,
    reviews: 4567,
    downloads: '3M+',
    version: '1.5.0',
    size: '4.2GB',
    os: 'Windows 10+, GTX 1060+',
    language: 'عربي, إنجليزي',
    pricing: {
      original: 700,
      current: 549,
      currency: 'SYP',
      packages: [
        { id: 1, name: 'اللعبة الأساسية', price: 549, features: ['Main Game'] },
        { id: 2, name: 'مع شران كامل', price: 799, features: ['Main Game', 'Expansion Pack'] }
      ]
    },
    isActive: true,
    isPromoted: false,
    createdAt: '2026-02-15'
  }
];

module.exports = {
  apps,
  games
};
