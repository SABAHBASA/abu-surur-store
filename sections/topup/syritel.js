/**
 * قسم تعبئة Syritel
 * Syritel Top-up Section
 */

class SyritelTopupService {
  constructor() {
    this.packages = [
      { id: 1, name: 'ذهبي', credit: 500, price: 550 },
      { id: 2, name: 'فضي', credit: 1000, price: 1100 },
      { id: 3, name: 'ماسي', credit: 5000, price: 5500 },
      { id: 4, name: 'بلاتيني', credit: 10000, price: 11000 }
    ];
  }

  // الحصول على حزم التعبئة
  async getPackages() {
    try {
      return this.packages;
    } catch (error) {
      console.error('Error fetching Syritel packages:', error);
      throw error;
    }
  }

  // تعبئة الرصيد
  async topupCredit(phoneNumber, packageId, userId) {
    try {
      if (!phoneNumber || !packageId || !userId) {
        throw new Error('Missing required parameters');
      }

      const package = this.packages.find(p => p.id === packageId);
      if (!package) {
        throw new Error('Package not found');
      }

      const result = {
        status: 'success',
        phoneNumber,
        package: package.name,
        credit: package.credit,
        price: package.price,
        userId,
        timestamp: new Date()
      };

      return result;
    } catch (error) {
      console.error('Error topping up Syritel credit:', error);
      throw error;
    }
  }
}

module.exports = new SyritelTopupService();
