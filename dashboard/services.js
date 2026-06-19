/**
 * إدارة الخدمات
 * Services Management
 */

class ServicesManager {
  constructor() {
    this.services = [];
  }

  // الحصول على جميع الخدمات
  async getAllServices() {
    try {
      return this.services;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  }

  // إضافة خدمة جديدة
  async addService(serviceData) {
    try {
      const newService = {
        id: Date.now(),
        ...serviceData,
        status: 'active',
        createdAt: new Date()
      };

      this.services.push(newService);
      return newService;
    } catch (error) {
      console.error('Error adding service:', error);
      throw error;
    }
  }

  // تحديث خدمة
  async updateService(serviceId, updateData) {
    try {
      const service = this.services.find(s => s.id === serviceId);
      if (!service) {
        throw new Error('Service not found');
      }

      Object.assign(service, updateData);
      service.updatedAt = new Date();
      return service;
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  }

  // حذف خدمة
  async deleteService(serviceId) {
    try {
      const index = this.services.findIndex(s => s.id === serviceId);
      if (index === -1) {
        throw new Error('Service not found');
      }

      const deletedService = this.services.splice(index, 1);
      return deletedService[0];
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  }
}

module.exports = new ServicesManager();
