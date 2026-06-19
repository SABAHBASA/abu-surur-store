# متجر أبو سرور كارد 🎮

منصة شاملة لشحن البرامج والألعاب وخدمات الشحن والتعبئة

## الأقسام الرئيسية

### 1️⃣ قسم الشحن (Charging Section)
- شحن البرامج
- شحن الألعاب
- شحن رصيد Syritel

**المسار:** `/sections/charging/`

### 2️⃣ قسم التعبئة (Top-up Section)
- تعبئة رصيد Syritel
- تعبئة رصيد MTN
- خدمات إضافية

**المسار:** `/sections/topup/`

### 3️⃣ قسم الدفع (Payment Section)
- الدفع عبر Sham Cash
- معالجة المدفوعات
- تتبع الفواتير

**المسار:** `/sections/payment/`

### 🎛️ لوحة التحكم (Admin Dashboard)
- إدارة جميع الخدمات
- تحديث الأسعار والعروض
- إحصائيات وتقارير
- إدارة المستخدمي��

**المسار:** `/dashboard/`

## هيكل المشروع

```
abu-surur-store/
├── sections/
│   ├── charging/          # قسم الشحن
│   ├── topup/             # قسم التعبئة
│   └── payment/           # قسم الدفع
├── dashboard/             # لوحة التحكم
├── public/                # الملفات العامة
├── src/                   # كود المصدر
├── docs/                  # التوثيق
└── README.md              # هذا الملف
```

## المتطلبات

- Node.js
- npm أو yarn
- قاعدة البيانات (MySQL/MongoDB)

## التثبيت

```bash
git clone https://github.com/SABAHBASA/abu-surur-store.git
cd abu-surur-store
npm install
```

## الإعدادات

1. انسخ ملف `.env.example` إلى `.env`
2. أدخل بيانات الاتصال بقاعدة البيانات
3. أدخل مفاتيح API الخاصة بك

## البدء

```bash
npm start
```

## المساهمة

نرحب بالمساهمات! يرجى فتح issue أو pull request.

## الترخيص

جميع الحقوق محفوظة © 2026 أبو سرور
