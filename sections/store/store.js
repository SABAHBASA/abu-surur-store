/**
 * إدارة معروض البرامج
 * Store Management
 */

const sampleData = require('./sampleData');

class StoreService {
  constructor() {
    this.products = [...sampleData.apps, ...sampleData.games];
  }

  // جلب جميع البرامج
  async getApps(filters = {}) {
    try {
      let apps = this.products.filter(p => p.type === 'app' && p.isActive);

      if (filters.category) {
        apps = apps.filter(a => a.category === filters.category);
      }

      if (filters.sort === 'price-low') {
        apps.sort((a, b) => a.pricing.current - b.pricing.current);
      } else if (filters.sort === 'price-high') {
        apps.sort((a, b) => b.pricing.current - a.pricing.current);
      } else if (filters.sort === 'rating') {
        apps.sort((a, b) => b.rating - a.rating);
      } else {
        apps.sort((a, b) => b.downloads - a.downloads);
      }

      return {
        success: true,
        count: apps.length,
        apps
      };
    } catch (error) {
      console.error('خطأ في جلب البرامج:', error);
      throw error;
    }
  }

  // جلب جميع الألعاب
  async getGames(filters = {}) {
    try {
      let games = this.products.filter(p => p.type === 'game' && p.isActive);

      if (filters.category) {
        games = games.filter(g => g.category === filters.category);
      }

      if (filters.sort === 'price-low') {
        games.sort((a, b) => a.pricing.current - b.pricing.current);
      } else if (filters.sort === 'price-high') {
        games.sort((a, b) => b.pricing.current - a.pricing.current);
      } else if (filters.sort === 'rating') {
        games.sort((a, b) => b.rating - a.rating);
      } else {
        games.sort((a, b) => b.downloads - a.downloads);
      }

      return {
        success: true,
        count: games.length,
        games
      };
    } catch (error) {
      console.error('خطأ في جلب الألعاب:', error);
      throw error;
    }
  }

  // بحث
  async search(query) {
    try {
      if (!query || query.length < 2) {
        throw new Error('عبارة البحث يجب أن تكون أطول');
      }

      const results = this.products.filter(p => 
        p.isActive && (
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.nameEn.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
        )
      );

      return {
        success: true,
        query,
        count: results.length,
        results
      };
    } catch (error) {
      console.error('خطأ في البح��:', error);
      throw error;
    }
  }

  // الحصول على منتج معين
  async getProduct(id) {
    try {
      const product = this.products.find(p => p.id === id);
      if (!product) {
        throw new Error('المنتج غير موجود');
      }

      return {
        success: true,
        product
      };
    } catch (error) {
      console.error('خطأ في جلب المنتج:', error);
      throw error;
    }
  }

  // العروض المجهزة
  async getFeatured() {
    try {
      const featured = this.products
        .filter(p => p.isActive && p.isPromoted)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 10);

      return {
        success: true,
        count: featured.length,
        featured
      };
    } catch (error) {
      console.error('خطأ في جلب العروض:', error);
      throw error;
    }
  }

  // الأكثر تحميلاً
  async getTopDownloads() {
    try {
      const top = this.products
        .filter(p => p.isActive)
        .sort((a, b) => parseInt(b.downloads) - parseInt(a.downloads))
        .slice(0, 20);

      return {
        success: true,
        count: top.length,
        products: top
      };
    } catch (error) {
      console.error('خطأ في جلب الأكثر تحميلاً:', error);
      throw error;
    }
  }

  // الأعلى تقييماً
  async getTopRated() {
    try {
      const top = this.products
        .filter(p => p.isActive && p.reviews > 10)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 20);

      return {
        success: true,
        count: top.length,
        products: top
      };
    } catch (error) {
      console.error('خطأ في جلب الأعلى تقييماً:', error);
      throw error;
    }
  }

  // الفئات
  async getCategories() {
    try {
      const categories = {};
      this.products.forEach(p => {
        if (!categories[p.category]) {
          categories[p.category] = {
            name: p.category,
            count: 0,
            products: []
          };
        }
        if (p.isActive) {
          categories[p.category].count++;
          categories[p.category].products.push(p);
        }
      });

      return {
        success: true,
        categories
      };
    } catch (error) {
      console.error('خطأ في جلب الفئات:', error);
      throw error;
    }
  }
}

module.exports = new StoreService();
