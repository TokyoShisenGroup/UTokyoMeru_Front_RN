import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserDisplayProps } from '@/lib/types';
import { router } from 'expo-router';
import storageApi from '@/lib/storageApi';
import { useUser, swrConfig, DEFAULT_AVATAR } from '@/lib/dataRequest';
import { useAuth } from '@/lib/AuthContext';


const UserInfoBar = () => {
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [userToken, setUserToken] = useState<string | undefined>(undefined);
  const { isLoggedIn, checkLoginStatus } = useAuth();
  const {data, error, isLoading} = useUser(userId?.toString(), swrConfig);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userinfo = await storageApi.getUserInfo();
        setUserId(userinfo?.userId);
        setUserToken(userinfo?.token);
      } catch (error) {
        console.error("获取用户信息时出错:", error);
      }
    };

    fetchUser();
    checkLoginStatus();
  }, []);

  const handlePress = () => {
    if (userId !== undefined && userToken !== undefined) {
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

  const handleLogin = () => {
    router.push({
      pathname: "/loginpage/Login",
    });
  };

  console.log("data:",data);
  if (isLoggedIn) {
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
  }else{
    return (
      <TouchableOpacity onPress={handleLogin}>
        <View style={styles.userInfoBar}>
          <Image
            source={{ uri:  DEFAULT_AVATAR }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{"登录"}</Text>
          <View style={styles.touchableButton}>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
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
    flexDirection: 'row',
    padding: 5,
  },
});

export default UserInfoBar;
