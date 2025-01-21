import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '../common/Icon';
import { COLORS } from '../../styles/colors';

const DashboardMenu = ({ onProfilePress, onSettingsPress, onLogoutPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuItem} onPress={onProfilePress}>
        <Icon name="user" size={20} color={COLORS.gray} />
        <Text style={styles.menuText}>Profil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={onSettingsPress}>
        <Icon name="cog" size={20} color={COLORS.gray} />
        <Text style={styles.menuText}>Paramètres</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.menuItem, styles.logoutItem]} 
        onPress={onLogoutPress}
      >
        <Icon name="sign-out" size={20} color={COLORS.primary} />
        <Text style={[styles.menuText, styles.logoutText]}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.gray,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: COLORS.primary,
  },
});

export default DashboardMenu; 