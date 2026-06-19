/**
 * نظام المصادقة
 * Authentication System
 */

const crypto = require('crypto');

class AuthService {
  constructor() {
    this.customers = [];
    this.sessions = [];
  }

  // تسجيل حساب جديد
  async register(email, password, name, phone) {
    try {
      if (!email || !password || !name) {
        throw new Error('البريد الإلكتروني والكلمة والاسم مطلوبة');
      }

      // التحقق من عدم وجود بريد موجود
      const existingCustomer = this.customers.find(c => c.email === email);
      if (existingCustomer) {
        throw new Error('البريد الإلكتروني موجود بالفعل');
      }

      const customerId = 'CUST_' + Date.now();
      const hashedPassword = this.hashPassword(password);

      const newCustomer = {
        id: customerId,
        email,
        password: hashedPassword,
        name,
        phone,
        totalBalance: 0,
        wallets: {
          shamcash: 0,
          syritelcash: 0,
          binance: 0
        },
        status: 'active',
        verified: false,
        createdAt: new Date()
      };

      this.customers.push(newCustomer);

      return {
        success: true,
        message: 'تم التسجيل بنجاح',
        customerId,
        email
      };
    } catch (error) {
      console.error('خطأ في التسجيل:', error);
      throw error;
    }
  }

  // تسجيل الدخول
  async login(email, password) {
    try {
      if (!email || !password) {
        throw new Error('البريد الإلكتروني وكلمة المرور مطلوبة');
      }

      const customer = this.customers.find(c => c.email === email);
      if (!customer) {
        throw new Error('البريد الإلكتروني غير مسجل');
      }

      const isPasswordValid = this.comparePassword(password, customer.password);
      if (!isPasswordValid) {
        throw new Error('كلمة المرور غير صحيحة');
      }

      if (customer.status !== 'active') {
        throw new Error('الحساب معطل');
      }

      // إنشاء جلسة
      const token = this.generateToken();
      const session = {
        token,
        customerId: customer.id,
        email,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 أيام
      };

      this.sessions.push(session);

      return {
        success: true,
        message: 'تم تسجيل الدخول بنجاح',
        token,
        customer: {
          id: customer.id,
          email: customer.email,
          name: customer.name,
          totalBalance: customer.totalBalance
        }
      };
    } catch (error) {
      console.error('خطأ في تسجيل الدخول:', error);
      throw error;
    }
  }

  // تسجيل الخروج
  async logout(token) {
    try {
      const sessionIndex = this.sessions.findIndex(s => s.token === token);
      if (sessionIndex !== -1) {
        this.sessions.splice(sessionIndex, 1);
      }

      return {
        success: true,
        message: 'تم تسجيل الخروج بنجاح'
      };
    } catch (error) {
      console.error('خطأ في تسجيل الخروج:', error);
      throw error;
    }
  }

  // التحقق من الجلسة
  async verifySession(token) {
    try {
      const session = this.sessions.find(s => s.token === token);
      if (!session) {
        throw new Error('جلسة غير صالحة');
      }

      if (session.expiresAt < new Date()) {
        throw new Error('انتهت صلاحية الجلسة');
      }

      const customer = this.customers.find(c => c.id === session.customerId);
      return {
        valid: true,
        customer
      };
    } catch (error) {
      console.error('خطأ في التحقق من الجلسة:', error);
      throw error;
    }
  }

  // استعادة كلمة المرور
  async forgotPassword(email) {
    try {
      const customer = this.customers.find(c => c.email === email);
      if (!customer) {
        throw new Error('البريد الإلكتروني غير مسجل');
      }

      const resetToken = this.generateToken();
      // هنا يتم إرسال رسالة بريد إلكترونية برابط الاستعادة

      return {
        success: true,
        message: 'تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني',
        resetToken
      };
    } catch (error) {
      console.error('خطأ في استعادة كلمة المرور:', error);
      throw error;
    }
  }

  // تشفير كلمة المرور
  hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  // مقارنة كلمة المرور
  comparePassword(password, hash) {
    return this.hashPassword(password) === hash;
  }

  // إنشاء توكن
  generateToken() {
    return crypto.randomBytes(32).toString('hex');
  }
}

module.exports = new AuthService();
