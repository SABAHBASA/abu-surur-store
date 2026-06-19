# قسم التعبئة 📱

قسم متخصص في خدمات تعبئة الرصيد

## الخدمات المتاحة

### 1. تعبئة رصيد Syritel
- حزم تعبئة متعددة
- عروض خاصة
- تحويل رصيد بين المستخدمين

**المسار:** `/topup/syritel/`

### 2. تعبئة رصيد MTN
- حزم MTN المختلفة
- عروض وحسومات
- خدمات إضافية

**المسار:** `/topup/mtn/`

### 3. خدمات إضافية
- التحويلات المالية
- الحزم الشهرية
- العروض الحصرية

**المسار:** `/topup/additional/`

## API Endpoints

```
GET  /api/topup/syritel/packages    - حزم Syritel
POST /api/topup/syritel/topup       - تعبئة Syritel
GET  /api/topup/mtn/packages        - حزم MTN
POST /api/topup/mtn/topup           - تعبئة MTN
GET  /api/topup/offers              - العروض المتاحة
```

## الملفات

- `syritel.js` - إدارة تعبئة Syritel
- `mtn.js` - إدارة تعبئة MTN
- `offers.js` - إدارة العروض
