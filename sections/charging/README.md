# قسم الشحن 🎮

قسم متخصص في خدمات الشحن المختلفة

## الخدمات المتاحة

### 1. شحن البرامج
- تحديد البرنامج المراد شحنه
- اختيار الحزمة المناسبة
- معالجة الشحن

**المسار:** `/charging/apps/`

### 2. شحن الألعاب
- ألعاب مختلفة
- عملات اللعبة
- بطاقات اللعبة

**المسار:** `/charging/games/`

### 3. شحن رصيد Syritel
- شحن مباشر
- عروض خاصة
- تحويل رصيد

**المسار:** `/charging/syritel/`

## API Endpoints

```
GET  /api/charging/apps          - قائمة البرامج
POST /api/charging/apps/charge   - شحن برنامج
GET  /api/charging/games         - قائمة الألعاب
POST /api/charging/games/charge  - شحن لعبة
POST /api/charging/syritel       - شحن Syritel
```

## الملفات

- `apps.js` - إدارة شحن البرامج
- `games.js` - إدارة شحن الألعاب
- `syritel.js` - إدارة شحن Syritel
- `controller.js` - معالج الطلبات
