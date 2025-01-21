import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

const Button = ({ onPress, title, variant = 'primary', style }) => {
  const buttonStyles = {
    primary: { backgroundColor: COLORS.primary },
    secondary: { backgroundColor: COLORS.secondary },
    tertiary: { backgroundColor: COLORS.tertiary },
  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyles[variant], style]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: COLORS.white,
    fontWeight: '500',
  },
});

export default Button; 