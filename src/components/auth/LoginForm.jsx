import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Button from '../common/Button';
import { COLORS } from '../../styles/colors';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit({ email, password });
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Entrez votre email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Entrez votre mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title="Se connecter"
        onPress={handleSubmit}
        variant="primary"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    fontSize: 16,
  },
});

export default LoginForm; 