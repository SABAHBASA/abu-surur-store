/**
 * معلومات المتجر
 * Store Information & Configuration
 */

const storeInfo = {
  // معلومات أساسية
  storeName: 'متجر أبو سرور',
  storeNameEn: 'Abu Surur Store',
  storeSlogan: 'شحن سرعة الصاروخ 🚀',
  
  // الموقع والعنوان
  location: {
    country: 'سوريا',
    city: 'حلب',
    address: 'حلب - سوريا',
    region: 'سوريا'
  },

  // الإدارة
  management: {
    owner: 'صباح الباشا - أبو سرور',
    ownerArabic: 'أبو سرور',
    ownerEn: 'Abu Surur',
    title: 'مدير المتجر'
  },

  // معلومات التواصل
  contact: {
    whatsapp: '0994674800',
    whatsappLink: 'https://wa.me/963994674800',
    phone: '0994674800',
    whatsappDisplay: 'واتساب: 0994674800',
    // يمكن إضافة وسائل تواصل أخرى
    email: null,
    telegram: null,
    instagram: null,
    facebook: null
  },

  // الوصف
  description: {
    arabic: `متجر أبو سرور كارد - متجر موثوق لشحن البرامج والألعاب وتعبئة الرصيد
    
محل موجود في مدينة حلب - سوريا
إدارة: صباح الباشا - أبو سرور

🚀 شحن سرعة الصاروخ
⚡ خدمة سريعة وموثوقة
✅ منتجات أصلية
💯 ضمان جودة

تواصل معنا عبر الواتساب: 0994674800
الموقع: حلب - سوريا`,
    
    english: `Abu Surur Card Store - Trusted store for apps, games and credit recharging

Located in Aleppo - Syria
Management: Sabah Al-Pasha - Abu Surur

🚀 Rocket Speed Shipping
⚡ Fast and reliable service
✅ Original products
💯 Quality guarantee

Contact us via WhatsApp: 0994674800
Location: Aleppo - Syria`
  },

  // ساعات العمل
  workingHours: {
    saturday: '09:00 - 22:00',
    sunday: '09:00 - 22:00',
    monday: '09:00 - 22:00',
    tuesday: '09:00 - 22:00',
    wednesday: '09:00 - 22:00',
    thursday: '09:00 - 22:00',
    friday: '12:00 - 22:00',
    note: 'نفتح طوال أيام الأسبوع'
  },

  // سياسة الشحن
  shippingPolicy: {
    speed: '🚀 شحن سرعة الصاروخ',
    speedEn: 'Rocket Speed Shipping',
    description: 'نقوم بشحن البرامج والألعاب في أسرع وقت ممكن',
    deliveryTime: 'فوري - خلال دقائق',
    fee: 'مجاني',
    methods: [
      'شحن فوري عبر البريد الإلكتروني',
      'تحميل من الموقع',
      'ارسال رابط التحميل'
    ]
  },

  // وسائل الدفع المتاحة
  paymentMethods: {
    available: [
      'Sham Cash',
      'Syritel Cash',
      'Binance',
      'تحويل بنكي'
    ]
  },

  // الخدمات الإضافية
  services: {
    apps: 'شحن البرامج والتطبيقات',
    games: 'شحن الألعاب',
    recharge: 'تعبئة رصيد',
    support: 'دعم فني 24/7',
    support24: 'خدمة عملاء متاحة دائماً'
  },

  // التقييمات والإحصائيات
  statistics: {
    yearEstablished: 2024,
    totalCustomers: '1000+',
    totalOrders: '5000+',
    satisfaction: '99%',
    rating: 4.9,
    reviews: 'ممتاز'
  },

  // الشعارات والعلامات
  badges: [
    '✅ متجر موثوق',
    '🚀 شحن سريع',
    '💯 جودة عالية',
    '⚡ خدمة سريعة'
  ],

  // الكلمات المفتاحية
  keywords: [
    'متجر برامج',
    'شحن ألعاب',
    'تعبئة رصيد',
    'حلب',
    'سوريا',
    'شحن سريع',
    'أبو سرور'
  ]
};

module.exports = storeInfo;
