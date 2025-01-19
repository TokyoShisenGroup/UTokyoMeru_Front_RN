import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserProps } from '@/lib/types';
import StarRating from '@/components/goodspage/StarRating';
import Icon from '@expo/vector-icons/Ionicons';

const UserCard: React.FC<UserProps> = ( user ) => {
  const navigation = useNavigation();

  const handlePress = () => {
    //todo 跳转到用户主页
    console.log("jump to user profile");
    console.log(user);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: user.Avatar || DEFAULT_AVATAR }} style={styles.avatar} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{user.Name}</Text>
        <View style={styles.ratingContainer}>
          <StarRating rating={user.Rating} size={14} color="#FFD700" />
          <Text style={styles.ratingText}>{user.Rating?.toFixed(1)}</Text>
        </View>
      </View>
      <Icon name="chevron-forward" size={24} color="#CCCCCC" style={styles.chevron} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
    borderRadius: 0,
    marginBottom: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  chevron: {
    marginLeft: 10,
  },
});

export default UserCard;
