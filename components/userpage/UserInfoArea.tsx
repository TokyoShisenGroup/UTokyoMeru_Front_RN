import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 假设使用 Expo 图标
import StarRating from '@/components/goodspage/StarRating';

interface UserInfoProps {
  avatarUrl: string;
  username: string;
  bio: string;
  rating: number;
  onEditPress: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ avatarUrl, username, bio, rating, onEditPress }) => {
  const [isBioExpanded, setIsBioExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <View style={styles.userNameContainer}>
          <Text style={styles.username}>{username}</Text>
        </View>
      </View>
      <View style={styles.bottomRow}>
          <View style={styles.ratingContainer}>
            <StarRating rating={rating} />
            <Text style={styles.rating}>{rating.toFixed(1)}</Text>
          </View>
        <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
          <Ionicons name="pencil" size={24} color="white" />
          <Text style={styles.editButtonText}>编辑资料</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bioContainer}>
        <View style={styles.bioTextContainer}>
          <Text style={styles.bio} numberOfLines={isBioExpanded ? undefined : 1}>{bio}</Text>
        </View>
        <View style={styles.expandButtonRow}>
          <TouchableOpacity onPress={() => setIsBioExpanded(!isBioExpanded)} style={styles.expandButtonContainer}>
            <Text style={styles.expandButton}>{isBioExpanded ? "收起" : "展开"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',

  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginRight: 16,
  },
  userNameContainer: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bioContainer: {
    marginTop: 15,
  },
  bioTextContainer: {
    width: '100%',
  },
  bio: {
    fontSize: 14,
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    height: 40,
  },
  editButtonText: {
    color: 'white',
    marginLeft: 4,
  },
  expandButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  expandButtonContainer: {
    paddingHorizontal: 8,
  },
  expandButton: {
    color: '#007AFF',
  },
});

export default UserInfo;
