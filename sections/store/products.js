/**
 * إدارة حزم المنتجات
 * Products Management
 */

class ProductsService {
  constructor() {
    this.products = [];
  }

  // إضافة منتج جديد (برنامج أو لعبة)
  async addProduct(productData) {
    try {
      const requiredFields = ['name', 'type', 'category', 'pricing'];
      const missingFields = requiredFields.filter(field => !productData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`الحقول المفقودة: ${missingFields.join(', ')}`);
      }

      const productId = 'PROD_' + Date.now();
      const newProduct = {
        id: productId,
        ...productData,
        isActive: true,
        isPromoted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      this.products.push(newProduct);

      return {
        success: true,
        message: 'تم إضافة المنتج بنجاح',
        product: newProduct
      };
    } catch (error) {
      console.error('خطأ في إضافة المنتج:', error);
      throw error;
    }
  }

  // تعديل سعر المنتج
  async updatePrice(productId, newPrice, originalPrice = null) {
    try {
      const product = this.products.find(p => p.id === productId);
      if (!product) {
        throw new Error('المنتج غير موجود');
      }

      product.pricing.current = newPrice;
      if (originalPrice) {
        product.pricing.original = originalPrice;
      }
      product.updatedAt = new Date();

      return {
        success: true,
        message: 'تم تحديث السعر بنجاح',
        product
      };
    } catch (error) {
      console.error('خطأ في تحديث السعر:', error);
      throw error;
    }
  }

  // تعديل معلومات المنتج
  async updateProduct(productId, updateData) {
    try {
      const product = this.products.find(p => p.id === productId);
      if (!product) {
        throw new Error('المنتج غير موجود');
      }

      Object.keys(updateData).forEach(key => {
        if (key !== 'id' && key !== 'createdAt') {
          product[key] = updateData[key];
        }
      });
      product.updatedAt = new Date();

      return {
        success: true,
        message: 'تم تحديث المعلومات بنجاح',
        product
      };
    } catch (error) {
      console.error('خطأ في تحديث المعلومات:', error);
      throw error;
    }
  }

  // حذف منتج
  async deleteProduct(productId) {
    try {
      const index = this.products.findIndex(p => p.id === productId);
      if (index === -1) {
        throw new Error('المنتج غير موجود');
      }

      const deletedProduct = this.products.splice(index, 1);

      return {
        success: true,
        message: 'تم حذف المنتج بنجاح',
        product: deletedProduct[0]
      };
    } catch (error) {
      console.error('خطأ في حذف المنتج:', error);
      throw error;
    }
  }

  // تفعيل/تعطيل منتج
  async toggleProduct(productId, isActive) {
    try {
      const product = this.products.find(p => p.id === productId);
      if (!product) {
        throw new Error('المنتج غير موجود');
      }

      product.isActive = isActive;
      product.updatedAt = new Date();

      return {
        success: true,
        message: isActive ? 'تم تفعيل المنتج' : 'تم تعطيل المنتج',
        product
      };
    } catch (error) {
      console.error('خطأ في تدبر حالة المنتج:', error);
      throw error;
    }
  }

  // ترويج منتج
  async promoteProduct(productId, isPromoted) {
    try {
      const product = this.products.find(p => p.id === productId);
      if (!product) {
        throw new Error('المنتج غير موجود');
      }

      product.isPromoted = isPromoted;
      product.updatedAt = new Date();

      return {
        success: true,
        message: isPromoted ? 'تم ترويج المنتج' : 'تم إلغاء الترويج',
        product
      };
    } catch (error) {
      console.error('خطأ في ترويج المنتج:', error);
      throw error;
    }
  }

  // جلب جميع المنتجات
  async getAllProducts(filters = {}) {
    try {
      let products = this.products;

      if (filters.type) {
        products = products.filter(p => p.type === filters.type);
      }

      if (filters.category) {
        products = products.filter(p => p.category === filters.category);
      }

      if (filters.active !== undefined) {
        products = products.filter(p => p.isActive === filters.active);
      }

      return {
        success: true,
        count: products.length,
        products
      };
    } catch (error) {
      console.error('خطأ في جلب المنتجات:', error);
      throw error;
    }
  }

  // إحصائيات
  async getStats() {
    try {
      return {
        success: true,
        stats: {
          totalProducts: this.products.length,
          activeProducts: this.products.filter(p => p.isActive).length,
          totalApps: this.products.filter(p => p.type === 'app').length,
          totalGames: this.products.filter(p => p.type === 'game').length,
          promotedProducts: this.products.filter(p => p.isPromoted).length,
          avgRating: (this.products.reduce((sum, p) => sum + p.rating, 0) / this.products.length).toFixed(2)
        }
      };
    } catch (error) {
      console.error('خطأ في جلب الإحصائيات:', error);
      throw error;
    }
  }
}

module.exports = new ProductsService();
