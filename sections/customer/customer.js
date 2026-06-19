/**
 * ملف الزبون
 * Customer Profile
 */

class CustomerService {
  constructor() {
    this.customers = [];
  }

  // الحصول على ملف الزبون
  async getProfile(customerId) {
    try {
      const customer = this.customers.find(c => c.id === customerId);
      if (!customer) {
        throw new Error('الزبون غير موجود');
      }

      return {
        success: true,
        customer: {
          id: customer.id,
          email: customer.email,
          name: customer.name,
          phone: customer.phone,
          totalBalance: customer.totalBalance,
          createdAt: customer.createdAt
        }
      };
    } catch (error) {
      console.error('خطأ في جلب ملف الزبون:', error);
      throw error;
    }
  }

  // الحصول على الرصيد الإجمالي
  async getBalance(customerId) {
    try {
      const customer = this.customers.find(c => c.id === customerId);
      if (!customer) {
        throw new Error('الزبون غير موجود');
      }

      return {
        success: true,
        customerId,
        totalBalance: customer.totalBalance,
        wallets: customer.wallets,
        lastUpdated: new Date()
      };
    } catch (error) {
      console.error('خطأ في جلب الرصيد:', error);
      throw error;
    }
  }

  // الحصول على المحافظ
  async getWallets(customerId) {
    try {
      const customer = this.customers.find(c => c.id === customerId);
      if (!customer) {
        throw new Error('الزبون غير موجود');
      }

      return {
        success: true,
        customerId,
        wallets: {
          shamcash: {
            name: 'Sham Cash',
            balance: customer.wallets.shamcash,
            currency: 'SYP'
          },
          syritelcash: {
            name: 'Syritel Cash',
            balance: customer.wallets.syritelcash,
            currency: 'SYP'
          },
          binance: {
            name: 'Binance',
            balance: customer.wallets.binance,
            currency: 'BTC'
          }
        }
      };
    } catch (error) {
      console.error('خطأ في جلب المحافظ:', error);
      throw error;
    }
  }

  // إضافة رصيد بعد تأكيد الإيداع
  async addBalance(customerId, method, amount) {
    try {
      const customer = this.customers.find(c => c.id === customerId);
      if (!customer) {
        throw new Error('الزبون غير موجود');
      }

      customer.wallets[method] += amount;
      customer.totalBalance += amount;

      return {
        success: true,
        message: 'تم إضافة الرصيد بنجاح',
        newBalance: customer.totalBalance,
        wallet: {
          method,
          balance: customer.wallets[method]
        }
      };
    } catch (error) {
      console.error('خطأ في إضافة الرصيد:', error);
      throw error;
    }
  }

  // تحديث معلومات الزبون
  async updateProfile(customerId, updateData) {
    try {
      const customer = this.customers.find(c => c.id === customerId);
      if (!customer) {
        throw new Error('الزبون غير موجود');
      }

      if (updateData.name) customer.name = updateData.name;
      if (updateData.phone) customer.phone = updateData.phone;
      customer.updatedAt = new Date();

      return {
        success: true,
        message: 'تم تحديث البيانات بنجاح',
        customer
      };
    } catch (error) {
      console.error('خطأ في تحديث البيانات:', error);
      throw error;
    }
  }

  // إنشاء حساب الزبون
  async createCustomer(customerId, email, name, phone) {
    try {
      const newCustomer = {
        id: customerId,
        email,
        name,
        phone,
        totalBalance: 0,
        wallets: {
          shamcash: 0,
          syritelcash: 0,
          binance: 0
        },
        status: 'active',
        createdAt: new Date()
      };

      this.customers.push(newCustomer);

      return {
        success: true,
        customer: newCustomer
      };
    } catch (error) {
      console.error('خطأ في إنشاء الحساب:', error);
      throw error;
    }
  }
}

module.exports = new CustomerService();
