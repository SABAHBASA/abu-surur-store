/**
 * قسم شحن الألعاب
 * Game Charging Section
 */

class GameChargingService {
  constructor() {
    this.games = [];
  }

  // الحصول على قائمة الألعاب
  async getGames() {
    try {
      return this.games;
    } catch (error) {
      console.error('Error fetching games:', error);
      throw error;
    }
  }

  // شحن لعبة معينة
  async chargeGame(gameId, packageId, userId) {
    try {
      if (!gameId || !packageId || !userId) {
        throw new Error('Missing required parameters');
      }

      const result = {
        status: 'success',
        gameId,
        packageId,
        userId,
        timestamp: new Date()
      };

      return result;
    } catch (error) {
      console.error('Error charging game:', error);
      throw error;
    }
  }

  // إضافة لعبة جديدة (لوحة التحكم)
  async addGame(gameData) {
    try {
      const newGame = {
        id: Date.now(),
        ...gameData,
        createdAt: new Date()
      };
      this.games.push(newGame);
      return newGame;
    } catch (error) {
      console.error('Error adding game:', error);
      throw error;
    }
  }
}

module.exports = new GameChargingService();
