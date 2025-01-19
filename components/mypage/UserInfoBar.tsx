import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserDisplayProps } from '@/lib/types';
import { router } from 'expo-router';
import storageApi from '@/lib/storageApi';
import { useUser, swrConfig, DEFAULT_AVATAR } from '@/lib/dataRequest';


const UserInfoBar = () => {
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const {data, error, isLoading} = useUser(userId?.toString(), swrConfig);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await storageApi.getUserId();
        setUserId(id);
      } catch (error) {
        console.error("获取用户ID时出错:", error);
      }
    };

    fetchUserId();
  }, []);

  const handlePress = () => {
    if (userId !== undefined) {
      router.push({
        pathname: "/userpage/UserPage",
        params: {
          id: userId
        }
      });
    } else {
      console.log("用户ID尚未加载");
      // 这里可以添加一些用户反馈，比如显示一个提示信息
    }
  };

  console.log(data);
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.userInfoBar}>
        <Image
          source={{ uri: data?.avatar || DEFAULT_AVATAR }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{data?.user_name || "Anonymous"}</Text>
        <View style={styles.touchableButton}>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userInfoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  username: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  touchableButton: {
    padding: 5,
  },
});

export default UserInfoBar;
