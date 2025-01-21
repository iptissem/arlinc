import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

const Header = ({ onLoginPress }) => {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: "/api/placeholder/40/40" }}
          style={styles.logo}
        />
        <Text style={styles.appName}>ARL.INC</Text>
      </View>

      <TouchableOpacity 
        style={styles.loginButton}
        onPress={onLoginPress}
      >
        <Text style={styles.loginButtonText}>Connexion</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 40,
    height: 40,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  loginButtonText: {
    color: COLORS.white,
    fontWeight: '500',
  },
});

export default Header;
