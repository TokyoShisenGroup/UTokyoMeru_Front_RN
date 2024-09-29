import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.favoriteButton}>
        <Text style={styles.favoriteButtonText}>收藏</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>购买</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    marginBottom: 20,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  favoriteButton: {
    flex: 1,
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
  },
  favoriteButtonText: {
    color: 'black',
    fontSize: 16,
  },
  buyButton: {
    flex: 1,
    height: 40,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buyButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Footer;
