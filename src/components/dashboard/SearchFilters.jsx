import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

const SearchFilters = ({ options, selectedOption, onSelect, title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.filterOption,
              selectedOption === option && styles.selectedOption,
            ]}
            onPress={() => onSelect(option)}
          >
            <Text style={[
              styles.optionText,
              selectedOption === option && styles.selectedOptionText,
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  filterOption: {
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedOption: {
    backgroundColor: COLORS.primary,
  },
  optionText: {
    color: COLORS.gray,
  },
  selectedOptionText: {
    color: COLORS.white,
  },
});

export default SearchFilters;
