/**
 * معالج المدفوعات العام
 * General Payment Processor
 */

class PaymentProcessor {
  constructor() {
    this.paymentMethods = {
      shamcash: require('./shamcash'),
      creditcard: null,
      transfer: null
    };
  }

  // معالجة الدفع
  async process(paymentData) {
    try {
      const { method, amount, userId, description } = paymentData;

      if (!this.paymentMethods[method]) {
        throw new Error('Payment method not supported');
      }

      const result = await this.paymentMethods[method].processPayment(
        amount,
        userId,
        description
      );

      return result;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  }

  // استرجاع المبلغ
  async refund(transactionId, reason) {
    try {
      // تنفيذ عملية الاسترجاع
      const refundResult = {
        status: 'refunded',
        transactionId,
        reason,
        timestamp: new Date()
      };

      return refundResult;
    } catch (error) {
      console.error('Error processing refund:', error);
      throw error;
    }
  }
}

module.exports = new PaymentProcessor();
