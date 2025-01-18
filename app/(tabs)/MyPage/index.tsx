import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserInfoBar from '../../../components/mypage/UserInfoBar';
import SettingsList from '../../../components/mypage/SettingsList';
import GoodsSummary from '../../../components/mypage/GoodsSummary';
import storageApi from '@/lib/storageApi';




function MyPage() {
  const [name, setName] = useState<string>("Anonymous");
  const [avatar, setAvatar] = useState<string>("https://pic.616pic.com/ys_img/00/06/27/5m1AgeRLf3.jpg");
  const id = storageApi.getUserId();

  useEffect(() => {
    const fetchUserName = async () => {
      const userName = await storageApi.getUserName();
      setName(userName || "Anonymous");
    };
    // const fetchUserAvatar = async () => {
    //   const userAvatar = await storageApi.getUserAvatar();
    //   setAvatar(userAvatar || "https://pic.616pic.com/ys_img/00/06/27/5m1AgeRLf3.jpg");
    // };
    fetchUserName();
    // fetchUserAvatar();
  }, []);

  return (
    <View style={styles.container}>

      <SafeAreaView> 
        {/* 用户信息条 */}
        <UserInfoBar Name={name} Avatar={avatar || "https://pic.616pic.com/ys_img/00/06/27/5m1AgeRLf3.jpg"}/>
        {/* 设置选项 */}

        <GoodsSummary />
        <SettingsList />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
});

export default MyPage;
