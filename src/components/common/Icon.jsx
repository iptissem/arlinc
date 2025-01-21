import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

const Icon = ({ name, size, color, ...props }) => {
  return <FontAwesome name={name} size={size} color={color} {...props} />;
};

export default Icon; 