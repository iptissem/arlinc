import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { COLORS } from '../../styles/colors';
import { RewardService } from '../../services/RewardService';
import { BlurView } from 'expo-blur';  // Importation de `expo-blur`

const RewardCard = ({ reward, isBlurred }) => (
  <View style={styles.rewardCard}>
    {isBlurred ? (
      <BlurView
        intensity={50} // Définissez l'intensité du flou
        style={styles.blurContainer} // Appliquer un style pour positionner et ajuster le flou
      >
        <Text style={styles.rewardTitle}>{reward.title}</Text>
        <Text style={styles.rewardPoints}>{reward.points} points</Text>
        <Text style={styles.rewardDescription}>{reward.description}</Text>
      </BlurView>
    ) : (
      <View>
        <Text style={styles.rewardTitle}>{reward.title}</Text>
        <Text style={styles.rewardPoints}>{reward.points} points</Text>
        <Text style={styles.rewardDescription}>{reward.description}</Text>
      </View>
    )}
  </View>
);

const RewardsSection = () => {
  const [points, setPoints] = useState(0);
  const [rewards] = useState([
    {
      id: '1',
      title: 'Panier Bronze',
      points: 300,
      description: 'Un bon d\'achats 3€ dès 30€ d\'achats',
    },
    {
      id: '2',
      title: 'Panier Argent',
      points: 600,
      description: 'Un bon d\'achats 6€ dès 60€ d\'achats',
    },
    {
      id: '3',
      title: 'Panier Or',
      points: 900,
      description: 'Un bon d\'achats 9€ dès 90€ d\'achats',
    },
  ]);

  useEffect(() => {
    loadPoints();
  }, []);

  const loadPoints = async () => {
    const userPoints = await RewardService.getPoints();
    setPoints(userPoints);
  };

  const renderRewardCard = ({ item }) => {
    const isBlurred = points < item.points; // Si l'utilisateur n'a pas assez de points, flouter la carte
    return <RewardCard reward={item} isBlurred={isBlurred} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Récompenses</Text>
        <Text style={styles.points}>{points} points</Text>
      </View>

      <FlatList
        data={rewards}
        renderItem={renderRewardCard}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  points: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  rewardCard: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 8,
    marginRight: 16,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rewardPoints: {
    color: COLORS.primary,
    marginBottom: 8,
  },
  rewardDescription: {
    color: COLORS.gray,
  },
  blurContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RewardsSection;
