import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
const onFavoriteButtonPress = () => {
  console.log("收藏被点击");
};

const onBuyButtonPress = (id: string) => {
  console.log("购买被点击");
  router.push({pathname: "/chat", params: {id: id}});
};

const Footer: React.FC<{id: string}> = ({id}) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity 
        style={styles.favoriteButton} 
        onPress={onFavoriteButtonPress}
      >
        <Text style={styles.favoriteButtonText}>收藏</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.buyButton} 
        onPress={() => onBuyButtonPress(id)}
      >
        <Text style={styles.buyButtonText}>购买</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    paddingBottom: hp(2),
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    height: hp(9),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  favoriteButton: {
    flex: 1,
    height: hp(5),
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
    height: hp(5),
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
