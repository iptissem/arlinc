import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import { COLORS } from '../../styles/colors';
import RewardsSection from '../../components/profile/RewardsSection';
import { RewardService } from '../../services/RewardService'; // Assurez-vous d'importer votre RewardService

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [points, setPoints] = useState(0); // Points de l'utilisateur
  
  // Récupérer les points de l'utilisateur à partir du RewardService
  useEffect(() => {
    const fetchPoints = async () => {
      const currentPoints = await RewardService.getPoints();
      console.log('Points utilisateur dans ProfilePage :', currentPoints); // Debug
      setPoints(currentPoints);
    };

    fetchPoints();
  }, []);

  const userInfo = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '06 12 34 56 78',
    address: '123 rue de Paris, 75001 Paris',
    city: 'Paris',
    donationsCount: 12,
    joinedDate: '01/01/2024',
    avatar: null, // URL de l'avatar si disponible
  };

  const stats = [
    {
      icon: 'gift',
      label: 'Dons effectués',
      value: userInfo.donationsCount,
    },
    {
      icon: 'calendar',
      label: 'Membre depuis',
      value: userInfo.joinedDate,
    },
    {
      icon: 'star',
      label: 'Niveau',
      value: 'Bronze',
    },
  ];

  const renderAvatar = () => (
    <View style={styles.avatarContainer}>
      {userInfo.avatar ? (
        <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <FontAwesome name="user" size={40} color={COLORS.gray} />
        </View>
      )}
      <TouchableOpacity style={styles.editAvatarButton}>
        <FontAwesome name="camera" size={16} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statItem}>
          <FontAwesome name={stat.icon} size={24} color={COLORS.primary} />
          <Text style={styles.statValue}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {renderAvatar()}
        <Text style={styles.name}>{userInfo.name}</Text>
        <Text style={styles.email}>{userInfo.email}</Text>
      </View>

      {renderStats()}

      <View style={styles.infoSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Informations personnelles</Text>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <FontAwesome 
              name={isEditing ? "check" : "edit"} 
              size={20} 
              color={COLORS.primary} 
            />
          </TouchableOpacity>
        </View>

        {Object.entries({
          'Téléphone': userInfo.phone,
          'Adresse': userInfo.address,
          'Ville': userInfo.city,
        }).map(([label, value], index) => (
          <View key={index} style={styles.infoItem}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>

      {/* Passer les points actuels à RewardsSection */}
      <RewardsSection points={points} />

      <View style={styles.actionsContainer}>
        <Button
          title="Modifier le mot de passe"
          variant="secondary"
          style={styles.actionButton}
          onPress={() => console.log('Change password')}
        />
        <Button
          title="Paramètres de notification"
          variant="secondary"
          style={styles.actionButton}
          onPress={() => console.log('Notification settings')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: COLORS.gray,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
  infoSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  infoItem: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: COLORS.black,
  },
  actionsContainer: {
    padding: 16,
  },
  actionButton: {
    marginBottom: 12,
  },
});

export default ProfilePage;
