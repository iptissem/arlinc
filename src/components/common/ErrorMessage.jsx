import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#FEE2E2',
    borderRadius: 4,
    marginBottom: 16,
  },
  text: {
    color: '#DC2626',
    fontSize: 14,
  },
});

export default ErrorMessage; 