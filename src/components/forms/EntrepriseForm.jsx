import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Input from '../common/Input';
import Button from '../common/Button';

const EntrepriseForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    address: '',
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
        placeholder="Nom de l'entreprise"
        value={formData.companyName}
        onChangeText={(value) => handleChange('companyName', value)}
      />
      <Input
        placeholder="Email professionnel"
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
        placeholder="Adresse"
        value={formData.address}
        onChangeText={(value) => handleChange('address', value)}
      />
      <Input
        placeholder="Ville"
        value={formData.city}
        onChangeText={(value) => handleChange('city', value)}
      />
      <Button
        title="Inscrire mon entreprise"
        onPress={() => onSubmit(formData)}
        variant="tertiary"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default EntrepriseForm;
