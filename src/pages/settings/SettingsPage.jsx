import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import Button from '../../components/common/Button';
import { COLORS } from '../../styles/colors';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
    darkMode: false,
    locationServices: true,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Notifications push</Text>
          <Switch
            value={settings.notifications}
            onValueChange={() => toggleSetting('notifications')}
            trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Alertes par email</Text>
          <Switch
            value={settings.emailAlerts}
            onValueChange={() => toggleSetting('emailAlerts')}
            trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Préférences</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Mode sombre</Text>
          <Switch
            value={settings.darkMode}
            onValueChange={() => toggleSetting('darkMode')}
            trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Services de localisation</Text>
          <Switch
            value={settings.locationServices}
            onValueChange={() => toggleSetting('locationServices')}
            trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Compte</Text>
        <Button
          title="Changer le mot de passe"
          variant="secondary"
          style={styles.button}
          onPress={() => console.log('Change password')}
        />
        <Button
          title="Supprimer le compte"
          variant="tertiary"
          style={styles.button}
          onPress={() => console.log('Delete account')}
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
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: COLORS.black,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: COLORS.gray,
  },
  button: {
    marginVertical: 8,
  },
});

export default SettingsPage; 