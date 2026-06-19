/**
 * سجل العمليات
 * Transaction History
 */

class TransactionService {
  constructor() {
    this.transactions = [];
  }

  // إنشاء عملية جديدة
  async createTransaction(customerId, type, method, amount, details) {
    try {
      if (!customerId || !type || !method || !amount) {
        throw new Error('جميع الحقول مطلوبة');
      }

      const transactionId = 'TXN_' + Date.now();
      const newTransaction = {
        id: transactionId,
        customerId,
        type, // deposit, withdrawal, purchase, transfer
        method, // shamcash, syritelcash, binance
        amount,
        status: 'completed',
        reference: details?.reference || null,
        description: details?.description || '',
        note: details?.note || '',
        createdAt: new Date()
      };

      this.transactions.push(newTransaction);

      return {
        success: true,
        message: 'تم تسجيل العملية بنجاح',
        transaction: newTransaction
      };
    } catch (error) {
      console.error('خطأ في إنشاء العملية:', error);
      throw error;
    }
  }

  // الحصول على سجل عمليات الزبون
  async getTransactionHistory(customerId, limit = 50) {
    try {
      const customerTransactions = this.transactions
        .filter(t => t.customerId === customerId)
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, limit);

      return {
        success: true,
        customerId,
        count: customerTransactions.length,
        transactions: customerTransactions
      };
    } catch (error) {
      console.error('خطأ في جلب سجل العمليات:', error);
      throw error;
    }
  }

  // الحصول على عملية معينة
  async getTransaction(transactionId) {
    try {
      const transaction = this.transactions.find(t => t.id === transactionId);
      if (!transaction) {
        throw new Error('العملية غير موجودة');
      }

      return {
        success: true,
        transaction
      };
    } catch (error) {
      console.error('خطأ في جلب العملية:', error);
      throw error;
    }
  }

  // الحصول على إحصائيات العمليات
  async getTransactionStats(customerId) {
    try {
      const customerTransactions = this.transactions.filter(t => t.customerId === customerId);
      
      const stats = {
        totalTransactions: customerTransactions.length,
        totalDeposits: 0,
        totalWithdrawals: 0,
        totalPurchases: 0,
        byMethod: {
          shamcash: 0,
          syritelcash: 0,
          binance: 0
        }
      };

      customerTransactions.forEach(t => {
        if (t.type === 'deposit') stats.totalDeposits += t.amount;
        if (t.type === 'withdrawal') stats.totalWithdrawals += t.amount;
        if (t.type === 'purchase') stats.totalPurchases += t.amount;
        if (stats.byMethod[t.method]) {
          stats.byMethod[t.method] += t.amount;
        }
      });

      return {
        success: true,
        customerId,
        stats
      };
    } catch (error) {
      console.error('خطأ في جلب إحصائيات العمليات:', error);
      throw error;
    }
  }
}

module.exports = new TransactionService();
