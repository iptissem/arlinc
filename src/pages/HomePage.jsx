import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/home/Header';
import Button from '../components/common/Button';
import { COLORS } from '../styles/colors';

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header onLoginPress={() => navigation.navigate('Connexion')} />
      
      <View style={styles.mainContent}>
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}>
            Bienvenue sur notre plateforme
          </Text>

          <Text style={styles.descriptionText}>
            Notre application permet de connecter particuliers et entreprises
            de manière simple et efficace. Rejoignez notre communauté grandissante
            et découvrez de nouvelles opportunités.
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              title="S'inscrire en tant que particulier"
              onPress={() => navigation.navigate('FormulaireParticulier')}
              variant="secondary"
              style={styles.button}
            />
            
            <Button
              title="S'inscrire en tant qu'entreprise"
              onPress={() => navigation.navigate('FormulaireEntreprise')}
              variant="tertiary"
              style={styles.button}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  contentContainer: {
    maxWidth: 500,
    width: '100%',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: COLORS.black,
  },
  descriptionText: {
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    marginBottom: 12,
  },
});

export default HomePage;
