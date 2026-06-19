# قسم الزبائن 👥

نظام إدارة الزبائن والتسجيل والإيداع

## المميزات الرئيسية

### 1. تسجيل الدخول والتسجيل
- تسجيل دخول بالبريد الإلكتروني وكلمة المرور
- تسجيل حساب جديد
- استعادة كلمة المرور
- التحقق من البريد الإلكتروني

### 2. قسم الإيداع (Deposit)
- **Sham Cash** 💳
- **Syritel Cash** 📱
- **Binance** 🔗

### 3. العمليات المتاحة
- إيداع رصيد
- رفع صورة الحوال��
- تتبع الطلبات
- عرض الحساب البنكي
- عرض محفظة العملات الرقمية

### 4. صفحة الزبون
- عرض الرصيد الإجمالي
- عرض العملات المُودعة
- تاريخ العمليات
- حالة الإيداعات المعلقة

## المسارات

```
sections/customer/
├── auth.js              # نظام المصادقة
├── deposit.js           # نظام الإيداع
├── customer.js          # ملف الزبون
├── transactions.js      # سجل العمليات
└── README.md
```

## API Endpoints

```
### تسجيل الدخول والمصادقة
POST   /api/auth/register            - تسجيل حساب جديد
POST   /api/auth/login               - تسجيل الدخول
POST   /api/auth/logout              - تسجيل الخروج
POST   /api/auth/forgot-password     - استعادة كلمة المرور
GET    /api/auth/verify/:token       - التحقق من البريد

### الإيداع
GET    /api/deposit/methods          - الطرق المتاحة
GET    /api/deposit/shamcash         - بيانات Sham Cash
GET    /api/deposit/syritel          - بيانات Syritel Cash
GET    /api/deposit/binance          - بيانات Binance
POST   /api/deposit/create           - إنشاء طلب إيداع
POST   /api/deposit/upload-proof     - رفع صورة الحوالة
GET    /api/deposit/status/:id       - حالة الإيداع

### الزبون
GET    /api/customer/profile         - ملف الزبون
GET    /api/customer/balance         - الرصيد الإجمالي
GET    /api/customer/wallets         - العملات المودعة
GET    /api/customer/deposits        - سجل الإيداعات
GET    /api/customer/transactions    - سجل العمليات
```

## تدفق العمل

### 1. التسجيل والدخول
```
الزبون → يملأ البريد وكلمة المرور → 
تحقق النظام → ينشئ حساب → يسجل دخول
```

### 2. عملية الإيداع
```
الزبون اختيار طريقة الإيداع (Sham Cash/Syritel/Binance)
        ↓
يرى العنوان والحساب البنكي/المحفظة
        ↓
يرسل الحوالة إلى العنوان المعروض
        ↓
يرفع صورة الحوالة/الإيصال
        ↓
الطلب ينتظر التأكيد من لوحة التحكم
        ↓
المسؤول يراجع الإيداع ويؤكده
        ↓
الرصيد يظهر في حساب الزبون
```

### 3. الحالات الم��تلفة
- **منتظر** (Pending) - في انتظار التأكيد
- **مؤكد** (Confirmed) - تم التأكيد والرصيد أضيف
- **مرفوض** (Rejected) - تم رفضه
- **ملغي** (Cancelled) - تم إلغاؤه

## نموذج البيانات

### Customer
```javascript
{
  id: "CUST_001",
  email: "customer@email.com",
  password: "hashed_password",
  name: "اسم الزبون",
  phone: "0999999999",
  totalBalance: 0,
  wallets: {
    shamcash: 0,
    syritelcash: 0,
    binance: 0
  },
  status: "active",
  createdAt: "2026-06-19"
}
```

### Deposit
```javascript
{
  id: "DEP_001",
  customerId: "CUST_001",
  method: "shamcash",      // shamcash, syritel, binance
  amount: 100000,
  currency: "SYP",
  status: "pending",        // pending, confirmed, rejected
  proofImage: "url_to_image",
  transactionNumber: "ABC123",
  notes: "ملاحظات",
  createdAt: "2026-06-19",
  confirmedAt: null,
  confirmedBy: null
}
```
