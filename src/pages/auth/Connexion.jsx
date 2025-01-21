import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import Button from '../../components/common/Button';
import { COLORS } from '../../styles/colors';

const Connexion = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Ici, vous ajouteriez la logique de connexion avec votre backend
    // Pour l'instant, on simule une connexion réussie
    if (email && password) {
      // Simulation de connexion réussie
      navigation.navigate('MainApp');
    } else {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Votre email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Votre mot de passe"
            secureTextEntry
          />
        </View>

        <Button
          title="Se connecter"
          onPress={handleLogin}
          style={styles.button}
        />

        <Text 
          style={styles.forgotPassword}
          onPress={() => console.log('Mot de passe oublié')}
        >
          Mot de passe oublié ?
        </Text>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Pas encore de compte ? </Text>
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate('FormulaireParticulier')}
          >
            S'inscrire
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 32,
    textAlign: 'center',
  },
  formContainer: {
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    marginTop: 24,
  },
  forgotPassword: {
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  signupText: {
    color: COLORS.gray,
  },
  signupLink: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default Connexion; 