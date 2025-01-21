import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import ParticulierForm from '../../components/forms/ParticulierForm';
import { COLORS } from '../../styles/colors';

const FormulaireParticulier = ({ navigation }) => {
  const handleSubmit = (formData) => {
    // Ici, vous ajouteriez la logique pour envoyer les données au backend
    console.log('Données du formulaire particulier:', formData);
    Alert.alert(
      'Inscription réussie',
      'Votre compte a été créé avec succès !',
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
      <Text style={styles.title}>Inscription Particulier</Text>
      <Text style={styles.subtitle}>
        Rejoignez notre communauté et commencez à participer à la réduction du gaspillage alimentaire
      </Text>
      
      <View style={styles.formContainer}>
        <ParticulierForm onSubmit={handleSubmit} />
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

export default FormulaireParticulier;
