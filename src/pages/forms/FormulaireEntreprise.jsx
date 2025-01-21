import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import EntrepriseForm from '../../components/forms/EntrepriseForm';
import { COLORS } from '../../styles/colors';

const FormulaireEntreprise = ({ navigation }) => {
  const handleSubmit = (formData) => {
    // Ici, vous ajouteriez la logique pour envoyer les données au backend
    console.log('Données du formulaire entreprise:', formData);
    Alert.alert(
      'Inscription réussie',
      'Votre entreprise a été enregistrée avec succès !',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('DashBoard')
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription Entreprise</Text>
      <Text style={styles.subtitle}>
        Rejoignez notre réseau d'entreprises engagées dans la lutte contre le gaspillage alimentaire
      </Text>
      
      <View style={styles.formContainer}>
        <EntrepriseForm onSubmit={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  formContainer: {
    flex: 1,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
});

export default FormulaireEntreprise;
