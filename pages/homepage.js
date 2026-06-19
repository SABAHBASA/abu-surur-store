/**
 * صفحة المتجر الرئيسية
 * Store Homepage Configuration
 */

const storeInfo = require('./storeInfo');

class StoreHomepage {
  constructor() {
    this.info = storeInfo;
  }

  // الحصول على معلومات المتجر
  async getStoreInfo() {
    return {
      success: true,
      store: {
        name: this.info.storeName,
        slogan: this.info.storeSlogan,
        location: this.info.location,
        management: this.info.management,
        contact: this.info.contact,
        description: this.info.description.arabic,
        badges: this.info.badges,
        statistics: this.info.statistics
      }
    };
  }

  // الحصول على معلومات التواصل
  async getContactInfo() {
    return {
      success: true,
      contact: {
        whatsapp: {
          number: this.info.contact.whatsapp,
          link: this.info.contact.whatsappLink,
          text: `تواصل معنا على الواتساب: ${this.info.contact.whatsapp}`
        },
        phone: this.info.contact.phone,
        location: `${this.info.location.city} - ${this.info.location.country}`,
        owner: this.info.management.owner
      }
    };
  }

  // الحصول على وصف المتجر الكامل
  async getDescription() {
    return {
      success: true,
      description: {
        arabic: this.info.description.arabic,
        english: this.info.description.english,
        slogan: this.info.storeSlogan,
        location: this.info.location,
        shipping: this.info.shippingPolicy
      }
    };
  }

  // الحصول على ساعات العمل
  async getWorkingHours() {
    return {
      success: true,
      workingHours: this.info.workingHours
    };
  }

  // الحصول على الخدمات
  async getServices() {
    return {
      success: true,
      services: [
        {
          icon: '💻',
          name: 'شحن البرامج',
          description: this.info.services.apps,
          available: true
        },
        {
          icon: '🎮',
          name: 'شحن الألعاب',
          description: this.info.services.games,
          available: true
        },
        {
          icon: '📱',
          name: 'تعبئة الرصيد',
          description: this.info.services.recharge,
          available: true
        },
        {
          icon: '🛟',
          name: 'دعم فني',
          description: this.info.services.support,
          available: true
        }
      ]
    };
  }

  // الحصول على الإحصائيات
  async getStatistics() {
    return {
      success: true,
      statistics: this.info.statistics
    };
  }

  // الحصول على رابط الواتساب
  async getWhatsappLink() {
    return {
      success: true,
      whatsapp: {
        number: this.info.contact.whatsapp,
        link: this.info.contact.whatsappLink,
        message: `أرغب في التواصل مع متجر أبو سرور`
      }
    };
  }

  // بيانات الصفحة الرئيسية كاملة
  async getHomepageData() {
    return {
      success: true,
      page: {
        title: this.info.storeName,
        slogan: this.info.storeSlogan,
        description: this.info.description.arabic,
        hero: {
          title: `مرحباً في ${this.info.storeName}`,
          subtitle: this.info.storeSlogan,
          ctaButton: 'تواصل معنا الآن',
          ctaLink: this.info.contact.whatsappLink
        },
        sections: {
          about: {
            title: 'عن المتجر',
            content: this.info.description.arabic
          },
          services: await this.getServices(),
          contact: {
            title: 'اتصل بنا',
            whatsapp: this.info.contact.whatsapp,
            location: `${this.info.location.city}, ${this.info.location.country}`,
            owner: this.info.management.owner
          }
        },
        contact: this.info.contact,
        location: this.info.location,
        management: this.info.management
      }
    };
  }
}

module.exports = new StoreHomepage();
