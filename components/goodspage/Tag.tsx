import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TagProps } from '@/types';

const Tag: React.FC<TagProps> = ({ 
  text, 
  color = '#007AFF', 
  backgroundColor = 'rgba(0, 122, 255, 0.1)',
  onPress
}) => {
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Tag;
