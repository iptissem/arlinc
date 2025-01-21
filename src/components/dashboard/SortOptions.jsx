import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../../styles/colors';

const SortOptions = ({ currentSort, onSortChange }) => {
  const sortOptions = [
    { id: 'distance', label: 'Distance', icon: 'map-marker' },
    { id: 'time', label: 'Heure limite', icon: 'clock-o' },
    { id: 'quantity', label: 'Quantité', icon: 'shopping-basket' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trier par :</Text>
      <View style={styles.optionsContainer}>
        {sortOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.option,
              currentSort === option.id && styles.selectedOption,
            ]}
            onPress={() => onSortChange(option.id)}
          >
            <FontAwesome 
              name={option.icon} 
              size={16} 
              color={currentSort === option.id ? COLORS.white : COLORS.gray} 
            />
            <Text 
              style={[
                styles.optionText,
                currentSort === option.id && styles.selectedOptionText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: COLORS.black,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
  },
  selectedOption: {
    backgroundColor: COLORS.primary,
  },
  optionText: {
    marginLeft: 8,
    color: COLORS.gray,
  },
  selectedOptionText: {
    color: COLORS.white,
  },
});

export default SortOptions; 