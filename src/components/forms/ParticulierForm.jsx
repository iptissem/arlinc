import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Input from '../common/Input';
import Button from '../common/Button';

const ParticulierForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    city: '',
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Nom d'utilisateur"
        value={formData.username}
        onChangeText={(value) => handleChange('username', value)}
      />
      <Input
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
        keyboardType="email-address"
      />
      <Input
        placeholder="Mot de passe"
        value={formData.password}
        onChangeText={(value) => handleChange('password', value)}
        secureTextEntry
      />
      <Input
        placeholder="Ville"
        value={formData.city}
        onChangeText={(value) => handleChange('city', value)}
      />
      <Button
        title="S'inscrire"
        onPress={() => onSubmit(formData)}
        variant="secondary"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default ParticulierForm;
