import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';  // Importation de Platform

// Définir le gestionnaire de notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const NotificationService = {
  // Demande de permissions pour afficher des notifications
  async requestPermissions() {
    if (Platform.OS === 'web') {
      console.log('Les notifications ne sont pas disponibles sur Web.');
      return false;
    }
    
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  },

  // Planification du rappel de don
  async scheduleDonationReminder(donation) {
    if (Platform.OS === 'web') {
      console.log('Les notifications ne sont pas disponibles sur Web.');
      return;
    }

    const trigger = new Date(donation.availableUntil);
    trigger.setHours(trigger.getHours() - 1); // 1 heure avant

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Rappel de don",
          body: `N'oubliez pas votre don chez ${donation.storeName} !`,
          data: { donationId: donation.id },
        },
        trigger,
      });
    } catch (error) {
      console.error('Erreur lors de la planification de la notification:', error);
    }
  },

  // Envoi d'une notification pour les récompenses
  async sendRewardNotification(points) {
    if (Platform.OS === 'web') {
      console.log('Les notifications ne sont pas disponibles sur Web.');
      return;
    }

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Nouvelle récompense !",
          body: `Félicitations ! Vous avez atteint ${points} points.`,
        },
        trigger: null, // Notification immédiate
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification:', error);
    }
  },
};
