import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Alert, Text, RefreshControl } from 'react-native';
import ProgressBar from '../components/dashboard/ProgressBar';
import SearchFilters from '../components/dashboard/SearchFilters';
import DashboardMenu from '../components/dashboard/DashboardMenu';
import DonationCard from '../components/dashboard/DonationCard';
import SortOptions from '../components/dashboard/SortOptions';
import Button from '../components/common/Button';
import { COLORS } from '../styles/colors';
import { NotificationService } from '../services/NotificationService';
import { RewardService } from '../services/RewardService';

const DashBoard = ({ navigation }) => {
  const [donCount, setDonCount] = useState(3);
  const [totalRequired, setTotalRequired] = useState(3);
  const [sortBy, setSortBy] = useState('distance');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filters, setFilters] = useState({
    enseigne: '',
    aliment: '',
    lieu: '',
  });

  const availableDonations = [
    {
      id: '1',
      storeName: 'Carrefour City',
      distance: 0.8,
      items: 'Fruits et légumes',
      availableUntil: '18h00',
      address: '123 rue de Paris',
      quantity: '5kg',
      availablePacks: 3,
    },
    {
      id: '2',
      storeName: 'Monoprix',
      distance: 1.2,
      items: 'Produits laitiers',
      availableUntil: '19h30',
      address: '45 avenue des Champs',
      quantity: '3kg',
      availablePacks: 5,
    },
    {
      id: '3',
      storeName: 'Auchan Express',
      distance: 2.5,
      items: 'Pain et viennoiseries',
      availableUntil: '20h00',
      address: '78 boulevard Victor Hugo',
      quantity: '2kg',
      availablePacks: 2,
    },
  ];

  const filteredDonations = useCallback(() => {
    return availableDonations.filter(donation => {
      const matchEnseigne = !filters.enseigne || donation.storeName.toLowerCase().includes(filters.enseigne.toLowerCase());
      const matchAliment = !filters.aliment || donation.items.toLowerCase().includes(filters.aliment.toLowerCase());
      const matchLieu = !filters.lieu || donation.address.toLowerCase().includes(filters.lieu.toLowerCase());
      return matchEnseigne && matchAliment && matchLieu;
    });
  }, [filters]);

  const handleDonationPress = async (donation) => {
    Alert.alert(
      'Réserver ce don',
      `Voulez-vous réserver ce don de ${donation.items} chez ${donation.storeName} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Réserver',
          onPress: async () => {
            await NotificationService.scheduleDonationReminder(donation);
            const newPoints = await RewardService.addPoints(10);
            Alert.alert('Succès', 'Votre réservation a été effectuée !');
            setDonCount(prev => prev + 1);
          },
        },
      ]
    );
  };

  const renderDonationsList = () => {
    const donations = filteredDonations();
    return donations.length > 0 ? (
      <View style={styles.donationsContainer}>
        {donations.map((donation) => (
          <DonationCard
            key={donation.id}
            donation={donation}
            onPress={() => handleDonationPress(donation)}
          />
        ))}
      </View>
    ) : (
      <Text style={styles.emptyState}>Aucun don disponible</Text>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={() => setIsRefreshing(false)} colors={[COLORS.primary]} />
      }
    >
      <DashboardMenu
        onProfilePress={() => navigation.navigate('Profil')}
        onSettingsPress={() => navigation.navigate('Paramètres')}
        onLogoutPress={() => navigation.navigate('Home')}
      />
      <View style={styles.progressSection}>
        <ProgressBar current={donCount} total={totalRequired} label="Dons récupérés" />
      </View>
      {renderDonationsList()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  donationsContainer: { padding: 16 },
  emptyState: { textAlign: 'center', marginTop: 20, color: COLORS.gray },
  progressSection: { padding: 16 },
});

export default DashBoard;
