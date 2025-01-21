import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationService } from './NotificationService';

const POINTS_KEY = '@rewards_points';
const REWARDS_HISTORY_KEY = '@rewards_history';

export const RewardService = {
  async getPoints() {
    const points = await AsyncStorage.getItem(POINTS_KEY);
    console.log('Points récupérés depuis AsyncStorage :', points); // Debug
    return points ? parseInt(points) : 0;
  },

  async addPoints(amount) {
    const currentPoints = await this.getPoints();
    const newPoints = currentPoints + amount;
    await AsyncStorage.setItem(POINTS_KEY, newPoints.toString());

    // Vérifier les paliers de récompense
    if (newPoints >= 300) {
      await NotificationService.sendRewardNotification(newPoints);
    }
    if (newPoints >= 600) {
      await NotificationService.sendRewardNotification(newPoints);
    }
    if (newPoints >= 900) {
      await NotificationService.sendRewardNotification(newPoints);
    }

    return newPoints;
  },

  async getRewardsHistory() {
    const history = await AsyncStorage.getItem(REWARDS_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  },

  async addRewardToHistory(reward) {
    const history = await this.getRewardsHistory();
    const updatedHistory = [
      {
        id: Date.now(),
        date: new Date().toISOString(),
        ...reward,
      },
      ...history,
    ];
    await AsyncStorage.setItem(REWARDS_HISTORY_KEY, JSON.stringify(updatedHistory));
    return updatedHistory;
  },
};
