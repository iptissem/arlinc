import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

const Input = ({ value, onChangeText, placeholder, secureTextEntry, keyboardType = 'default', ...props }) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      {...props}
    />
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

export default Input;
