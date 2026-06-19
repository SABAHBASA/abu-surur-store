/**
 * قسم شحن Syritel
 * Syritel Charging Section
 */

class SyritelChargingService {
  constructor() {
    this.chargePackages = [
      { id: 1, amount: 500, price: 500 },
      { id: 2, amount: 1000, price: 1000 },
      { id: 3, amount: 5000, price: 5000 },
      { id: 4, amount: 10000, price: 10000 }
    ];
  }

  // الحصول على حزم الشحن
  async getPackages() {
    try {
      return this.chargePackages;
    } catch (error) {
      console.error('Error fetching packages:', error);
      throw error;
    }
  }

  // شحن رصيد Syritel
  async chargeSyritel(phoneNumber, packageId, userId) {
    try {
      if (!phoneNumber || !packageId || !userId) {
        throw new Error('Missing required parameters');
      }

      const package = this.chargePackages.find(p => p.id === packageId);
      if (!package) {
        throw new Error('Package not found');
      }

      const result = {
        status: 'success',
        phoneNumber,
        amount: package.amount,
        userId,
        timestamp: new Date()
      };

      return result;
    } catch (error) {
      console.error('Error charging Syritel:', error);
      throw error;
    }
  }
}

module.exports = new SyritelChargingService();
