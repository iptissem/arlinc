import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../pages/HomePage';
import FormulaireParticulier from '../pages/forms/FormulaireParticulier';
import FormulaireEntreprise from '../pages/forms/FormulaireEntreprise';
import Connexion from '../pages/auth/Connexion';
import TabNavigator from './TabNavigator';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="FormulaireParticulier" component={FormulaireParticulier} />
      <Stack.Screen name="FormulaireEntreprise" component={FormulaireEntreprise} />
      <Stack.Screen name="Connexion" component={Connexion} />
      <Stack.Screen 
        name="MainApp" 
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator; 