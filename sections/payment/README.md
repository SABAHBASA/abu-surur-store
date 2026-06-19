# قسم الدفع 💳

قسم متخصص في معالجة المدفوعات عبر Sham Cash

## الخدمات المتاحة

### 1. الدفع عبر Sham Cash
- تحويل آمن للأموال
- معاملات فورية
- تتبع الفواتير

**المسار:** `/payment/shamcash/`

### 2. معالجة المدفوعات
- التحقق من الدفع
- معالجة الاسترجاع
- تقارير مالية

**المسار:** `/payment/processing/`

### 3. إدارة الفواتير
- إنشاء الفواتير
- طباعة الفواتير
- الفواتير المرجعية

**المسار:** `/payment/invoices/`

## API Endpoints

```
POST /api/payment/shamcash/pay       - الدفع عبر Sham Cash
GET  /api/payment/invoices/:id       - الحصول على فاتورة
POST /api/payment/refund             - استرجاع المبلغ
GET  /api/payment/history            - سجل المدفوعات
```

## الملفات

- `shamcash.js` - معالج Sham Cash
- `processor.js` - معالج المدفوعات
- `invoices.js` - إدارة الفواتير
