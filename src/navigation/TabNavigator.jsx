import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import DashBoard from '../pages/DashBoard';
import ProfilePage from '../pages/profile/ProfilePage';
import SettingsPage from '../pages/settings/SettingsPage';
import { COLORS } from '../styles/colors';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Tableau de bord') {
            iconName = 'home';
          } else if (route.name === 'Profil') {
            iconName = 'user';
          } else if (route.name === 'Paramètres') {
            iconName = 'cog';
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
      })}
    >
      <Tab.Screen name="Tableau de bord" component={DashBoard} />
      <Tab.Screen name="Profil" component={ProfilePage} />
      <Tab.Screen name="Paramètres" component={SettingsPage} />
    </Tab.Navigator>
  );
};

export default TabNavigator; 