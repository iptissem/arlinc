import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../common/Icon';
import { COLORS } from '../../styles/colors';

const DonationCard = ({ donation, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.storeName}>{donation.storeName}</Text>
        <Text style={styles.distance}>{donation.distance} km</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.infoRow}>
          <Icon name="shopping-basket" size={16} color={COLORS.gray} />
          <Text style={styles.infoText}>{donation.items}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="clock-o" size={16} color={COLORS.gray} />
          <Text style={styles.infoText}>Disponible jusqu'à {donation.availableUntil}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="map-marker" size={16} color={COLORS.gray} />
          <Text style={styles.infoText}>{donation.address}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.quantity}>Quantité: {donation.quantity}</Text>
        <TouchableOpacity style={styles.reserveButton}>
          <Text style={styles.reserveText}>Réserver</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  distance: {
    color: COLORS.gray,
  },
  content: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    color: COLORS.gray,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: 12,
  },
  quantity: {
    fontSize: 16,
    fontWeight: '500',
  },
  reserveButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  reserveText: {
    color: COLORS.white,
    fontWeight: '500',
  },
});

export default DonationCard; 