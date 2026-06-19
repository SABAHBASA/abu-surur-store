/**
 * إدارة المستخدمين
 * Users Management
 */

class UsersManager {
  constructor() {
    this.users = [];
  }

  // الحصول على جميع المستخدمين
  async getAllUsers() {
    try {
      return this.users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  // إضافة مستخدم جديد
  async addUser(userData) {
    try {
      const newUser = {
        id: Date.now(),
        ...userData,
        status: 'active',
        createdAt: new Date()
      };

      this.users.push(newUser);
      return newUser;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  }

  // تحديث صلاحيات المستخدم
  async updateUserPermissions(userId, permissions) {
    try {
      const user = this.users.find(u => u.id === userId);
      if (!user) {
        throw new Error('User not found');
      }

      user.permissions = permissions;
      user.updatedAt = new Date();
      return user;
    } catch (error) {
      console.error('Error updating user permissions:', error);
      throw error;
    }
  }

  // حظر مستخدم
  async blockUser(userId) {
    try {
      const user = this.users.find(u => u.id === userId);
      if (!user) {
        throw new Error('User not found');
      }

      user.status = 'blocked';
      return user;
    } catch (error) {
      console.error('Error blocking user:', error);
      throw error;
    }
  }
}

module.exports = new UsersManager();
