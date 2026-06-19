# معرض البرامج والألعاب 🎮

معرض شامل للبرامج والألعاب مع الصور والأسعار

## المميزات

### 1. جلب البرامج والألعاب
- البرامج (Applications)
- الألعاب (Games)
- معلومات كاملة (ISO, الحجم, المطور, etc)

### 2. أسعار مرنة
- التعديل بالسعر
- عروض موسمية
- حزم بأسعار مختلفة

### 3. صورهم ومعلومات
- الدرجة والقائمة
- موصوفات
- معلومات نظام التشغيل

### 4. البحث والترشيح
- البحث بالاسم
- البحث بالفئة
- الالعاب المجهزة

## API Endpoints

```
# البرامج
GET    /api/store/apps                   - قائمة البرامج
GET    /api/store/apps/:id               - تفاصيل البرنامج
GET    /api/store/apps/search?q=         - بحث
POST   /api/store/apps/purchase         - شراء

# الألعاب
GET    /api/store/games                 - قائمة الألعاب
GET    /api/store/games/:id             - تفاصيل اللعبة
GET    /api/store/games/category/:cat   - الألعاب حسب الفئة
POST   /api/store/games/purchase        - شراء

# لوحة التحكم (المسئول)
POST   /api/admin/products/add          - إضافة برنامج/لعبة
PUT    /api/admin/products/:id/price    - تعديل السعر
PUT    /api/admin/products/:id          - تعديل المعلومات
DELETE /api/admin/products/:id          - حذف
GET    /api/admin/products              - قائمة في لوحة التحكم
```

## بنية البيانات

### App/Game Object
```javascript
{
  id: "APP_001",
  type: "app", // app or game
  name: "اسم البرنامج",
  nameEn: "App Name",
  description: "الوصف",
  category: "productivity", // productivity, gaming, utilities, etc
  publisher: "الناشر",
  image: "url_to_image",
  thumbnail: "url_to_thumbnail",
  screenshots: ["url1", "url2"],
  rating: 4.5,
  reviews: 150,
  downloads: "1M+",
  version: "1.0.0",
  size: "250MB",
  os: "Windows 10+", // نظام التشغيل
  language: "عربي, إنجليزي",
  pricing: {
    original: 100,      // السعر الأساسي
    current: 80,        // السعر الحالي
    currency: "SYP",
    packages: [
      {
        id: 1,
        name: "مبتدئ",
        price: 50,
        features: ["feature1", "feature2"]
      }
    ]
  },
  isActive: true,
  isPromoted: false,
  createdAt: "2026-06-19",
  updatedAt: "2026-06-19"
}
```

## الملفات

- `store.js` - إدارة معروض البرامج
- `products.js` - إدارة الالعاب
- `pricing.js` - سياسة الأسعار
- `sampleData.js` - بيانات برامج والعاب عينة
