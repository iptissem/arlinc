import React, { useState, useCallback, useEffect } from 'react';
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
  const [donCount, setDonCount] = useState(3); // Dons effectués
  const [totalRequired, setTotalRequired] = useState(3); // Total requis pour le palier actuel
  const [points, setPoints] = useState(0); // Points accumulés
  const [sortBy, setSortBy] = useState('distance');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filters, setFilters] = useState({
    enseigne: '',
    aliment: '',
    lieu: '',
  });
  const [showFilters, setShowFilters] = useState(false); // Contrôle l'affichage des filtres et tri

  // Fonction pour récupérer et trier les dons
  const availableDonations = [
    {
      id: '1',
      storeName: 'Carrefour City',
      distance: 0.8,
      items: 'Fruits et légumes',
      availableUntil: '18h00',
      address: '123 rue de Paris',
      quantity: '5kg',
    },
    {
      id: '2',
      storeName: 'Monoprix',
      distance: 1.2,
      items: 'Produits laitiers',
      availableUntil: '19h30',
      address: '45 avenue des Champs',
      quantity: '3kg',
    },
    {
      id: '3',
      storeName: 'Auchan Express',
      distance: 2.5,
      items: 'Pain et viennoiseries',
      availableUntil: '20h00',
      address: '78 boulevard Victor Hugo',
      quantity: '2kg',
    },
  ];

  const sortDonations = useCallback((donations) => {
    return [...donations].sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'time':
          return a.availableUntil.localeCompare(b.availableUntil);
        case 'quantity':
          const quantityA = parseInt(a.quantity);
          const quantityB = parseInt(b.quantity);
          return quantityB - quantityA;
        default:
          return 0;
      }
    });
  }, [sortBy]);

  const filteredDonations = useCallback(() => {
    const filtered = availableDonations.filter(donation => {
      const matchEnseigne = !filters.enseigne || 
        donation.storeName.toLowerCase().includes(filters.enseigne.toLowerCase());
      const matchAliment = !filters.aliment || 
        donation.items.toLowerCase().includes(filters.aliment.toLowerCase());
      const matchLieu = !filters.lieu || 
        donation.address.toLowerCase().includes(filters.lieu.toLowerCase());
      
      return matchEnseigne && matchAliment && matchLieu;
    });
    return sortDonations(filtered);
  }, [filters, availableDonations, sortDonations]);

  const resetFilters = () => {
    setFilters({
      enseigne: '',
      aliment: '',
      lieu: '',
    });
  };

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  }, []);

  // Fonction pour gérer les dons
  const handlePanierPress = async () => {
    if (donCount >= totalRequired) {
      // Alerte de succès pour atteindre un palier
      Alert.alert('Succès', `Félicitations ! Vous avez atteint un palier de ${totalRequired} dons !`);
      
      // Ajoutez des points
      const newPoints = await RewardService.addPoints(100);
      setPoints(newPoints);

      // Passez au prochain palier
      setDonCount(donCount - totalRequired); // Réinitialiser les dons pour le prochain palier
      setTotalRequired(totalRequired + 6); // Augmenter la limite du palier (par exemple +6 pour chaque palier)

      // Envoyer une notification
      await NotificationService.sendRewardNotification(
        "Félicitations pour vos dons !",
        "Vous avez atteint un nouveau palier, continuez ainsi !"
      );

      // Afficher les filtres après avoir appuyé sur "Récupérer votre panier"
      setShowFilters(true);
    } else {
      Alert.alert(
        'Information',
        `Il vous reste ${totalRequired - donCount} dons pour atteindre le prochain palier.`
      );
    }
  };

  const handleDonationPress = async (donation) => {
    Alert.alert(
      'Réserver ce don',
      `Voulez-vous réserver ce don de ${donation.items} chez ${donation.storeName} ?`,
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Réserver',
          onPress: async () => {
            await NotificationService.scheduleDonationReminder(donation);
            const newPoints = await RewardService.addPoints(10);
            Alert.alert('Succès', 'Votre réservation a été effectuée !');
            setDonCount(prev => prev + 1);
          },
        },
      ],
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
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>
          Aucun don ne correspond à vos critères
        </Text>
        <Button
          title="Réinitialiser les filtres"
          onPress={resetFilters}
          variant="secondary"
          style={styles.resetButton}
        />
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} colors={[COLORS.primary]} />
      }
    >
      <DashboardMenu
        onProfilePress={() => navigation.navigate('Profil')}
        onSettingsPress={() => navigation.navigate('Paramètres')}
        onLogoutPress={() => navigation.navigate('Home')}
      />

      <View style={styles.progressSection}>
        <ProgressBar
          current={donCount}
          total={totalRequired}
          label="Dons effectués"
        />

        <Button
          title="Récupérer votre panier"
          onPress={handlePanierPress}
          variant="secondary"
          style={styles.panierButton}
        />
      </View>

      {/* Afficher les filtres et résultats uniquement si showFilters est true */}
      {showFilters && (
        <>
          <SortOptions currentSort={sortBy} onSortChange={setSortBy} />

          <View style={styles.filtersSection}>
            <Text style={styles.filterTitle}>Filtres</Text>
            <SearchFilters
              title="Enseigne"
              options={['Carrefour', 'Leclerc', 'Auchan', 'Monoprix']}
              selectedOption={filters.enseigne}
              onSelect={(value) => setFilters(prev => ({ ...prev, enseigne: value }))}
            />
            <SearchFilters
              title="Type d'aliment"
              options={['Fruits', 'Légumes', 'Produits laitiers', 'Viande']}
              selectedOption={filters.aliment}
              onSelect={(value) => setFilters(prev => ({ ...prev, aliment: value }))}
            />
            <SearchFilters
              title="Lieu"
              options={['Paris', 'Lyon', 'Marseille', 'Toulouse']}
              selectedOption={filters.lieu}
              onSelect={(value) => setFilters(prev => ({ ...prev, lieu: value }))}
            />
          </View>

          <View style={styles.resultsHeader}>
            <Text style={styles.resultsCount}>
              {filteredDonations().length} don{filteredDonations().length > 1 ? 's' : ''} disponible{filteredDonations().length > 1 ? 's' : ''}
            </Text>
          </View>

          {renderDonationsList()}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  progressSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    marginTop: 50,  // Ajouter un espacement vertical avant la section des dons effectués et du bouton
  },
  panierButton: {
    marginTop: 16,  // Espacement entre le bouton et la section des dons effectués
  },
  filtersSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  donationsContainer: {
    padding: 16,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 16,
  },
  resetButton: {
    minWidth: 200,
  },
  resultsHeader: {
    padding: 16,
  },
  resultsCount: {
    fontSize: 16,
    color: COLORS.gray,
  },
});


export default DashBoard;
