/**
 * نظام الإيداع
 * Deposit System
 */

class DepositService {
  constructor() {
    this.deposits = [];
    this.depositMethods = {
      shamcash: {
        name: 'Sham Cash',
        accountHolder: 'Abu Surur Store',
        accountNumber: '123456789',
        phone: '0999999999',
        fees: 0,
        minAmount: 1000,
        maxAmount: 10000000
      },
      syritelcash: {
        name: 'Syritel Cash',
        accountHolder: 'Abu Surur Store',
        accountNumber: '0999999999',
        phone: '0999999999',
        fees: 0,
        minAmount: 1000,
        maxAmount: 10000000
      },
      binance: {
        name: 'Binance',
        walletAddress: '1A1z7agoat7RCvSJUz8p4Ykj9STJcEd92b',
        network: 'Bitcoin',
        altNetworks: ['Ethereum', 'BNB Smart Chain', 'USDT'],
        fees: 0,
        minAmount: 50,
        maxAmount: 50000
      }
    };
  }

  // الحصول على طرق الإيداع
  async getDepositMethods() {
    try {
      return {
        success: true,
        methods: this.depositMethods
      };
    } catch (error) {
      console.error('خطأ في جلب طرق الإيداع:', error);
      throw error;
    }
  }

  // الحصول على بيانات طريقة معينة
  async getMethodDetails(method) {
    try {
      const depositMethod = this.depositMethods[method];
      if (!depositMethod) {
        throw new Error('الطريقة غير موجودة');
      }

      return {
        success: true,
        method: depositMethod
      };
    } catch (error) {
      console.error('خطأ في جلب بيانات الطريقة:', error);
      throw error;
    }
  }

  // إنشاء طلب إيداع جديد
  async createDeposit(customerId, method, amount) {
    try {
      if (!customerId || !method || !amount) {
        throw new Error('جميع الحقول مطلوبة');
      }

      const depositMethod = this.depositMethods[method];
      if (!depositMethod) {
        throw new Error('الطريقة غير موجودة');
      }

      if (amount < depositMethod.minAmount || amount > depositMethod.maxAmount) {
        throw new Error(`المبلغ يجب أن يكون بين ${depositMethod.minAmount} و ${depositMethod.maxAmount}`);
      }

      const depositId = 'DEP_' + Date.now();
      const newDeposit = {
        id: depositId,
        customerId,
        method,
        amount,
        currency: method === 'binance' ? 'BTC' : 'SYP',
        status: 'pending', // pending, confirmed, rejected
        proofImage: null,
        transactionNumber: null,
        notes: '',
        createdAt: new Date(),
        confirmedAt: null,
        confirmedBy: null
      };

      this.deposits.push(newDeposit);

      return {
        success: true,
        message: 'تم إنشاء طلب الإيداع بنجاح',
        deposit: newDeposit,
        instructions: depositMethod
      };
    } catch (error) {
      console.error('خطأ في إنشاء طلب الإيداع:', error);
      throw error;
    }
  }

  // رفع صورة الحوالة
  async uploadProof(depositId, imageUrl, transactionNumber) {
    try {
      const deposit = this.deposits.find(d => d.id === depositId);
      if (!deposit) {
        throw new Error('الإيداع غير موجود');
      }

      if (deposit.status !== 'pending') {
        throw new Error('لا يمكن تحميل إثبات لإيداع تم معالجته');
      }

      deposit.proofImage = imageUrl;
      deposit.transactionNumber = transactionNumber;
      deposit.updatedAt = new Date();

      return {
        success: true,
        message: 'تم تحميل الصورة بنجاح',
        deposit
      };
    } catch (error) {
      console.error('خطأ في تحميل الصورة:', error);
      throw error;
    }
  }

  // الحصول على حالة الإيداع
  async getDepositStatus(depositId) {
    try {
      const deposit = this.deposits.find(d => d.id === depositId);
      if (!deposit) {
        throw new Error('الإيداع غير موجود');
      }

      return {
        success: true,
        deposit
      };
    } catch (error) {
      console.error('خطأ في جلب حالة الإيداع:', error);
      throw error;
    }
  }

  // الحصول على إيداعات الزبون
  async getCustomerDeposits(customerId) {
    try {
      const customerDeposits = this.deposits.filter(d => d.customerId === customerId);
      return {
        success: true,
        deposits: customerDeposits
      };
    } catch (error) {
      console.error('خطأ في جلب إيداعات الزبون:', error);
      throw error;
    }
  }

  // تأكيد الإيداع (من لوحة التحكم)
  async confirmDeposit(depositId, adminId) {
    try {
      const deposit = this.deposits.find(d => d.id === depositId);
      if (!deposit) {
        throw new Error('الإيداع غير موجود');
      }

      if (deposit.status !== 'pending') {
        throw new Error('الإيداع تم معالجته بالفعل');
      }

      deposit.status = 'confirmed';
      deposit.confirmedAt = new Date();
      deposit.confirmedBy = adminId;

      return {
        success: true,
        message: 'تم تأكيد الإيداع بنجاح',
        deposit
      };
    } catch (error) {
      console.error('خطأ في تأكيد الإيداع:', error);
      throw error;
    }
  }

  // رفض الإيداع (من لوحة التحكم)
  async rejectDeposit(depositId, adminId, reason) {
    try {
      const deposit = this.deposits.find(d => d.id === depositId);
      if (!deposit) {
        throw new Error('الإيداع غير موجود');
      }

      if (deposit.status !== 'pending') {
        throw new Error('الإيداع تم معالجته بالفعل');
      }

      deposit.status = 'rejected';
      deposit.rejectedAt = new Date();
      deposit.rejectedBy = adminId;
      deposit.rejectionReason = reason;

      return {
        success: true,
        message: 'تم رفض الإيداع',
        deposit
      };
    } catch (error) {
      console.error('خطأ في رفض الإيداع:', error);
      throw error;
    }
  }

  // الحصول على الإيداعات المعلقة (للمسؤول)
  async getPendingDeposits() {
    try {
      const pendingDeposits = this.deposits.filter(d => d.status === 'pending');
      return {
        success: true,
        count: pendingDeposits.length,
        deposits: pendingDeposits
      };
    } catch (error) {
      console.error('خطأ في جلب الإيداعات المعلقة:', error);
      throw error;
    }
  }
}

module.exports = new DepositService();
