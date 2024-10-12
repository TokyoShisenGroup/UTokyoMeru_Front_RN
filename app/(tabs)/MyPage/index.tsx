import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserInfoBar from '../../../components/mypage/UserInfoBar';
import SettingsList from '../../../components/mypage/SettingsList';
import GoodsSummary from '../../../components/mypage/GoodsSummary';
import { Button } from 'react-native-elements';
import storageApi from '@/lib/storageApi';
import { API_URL } from '@/constants/config';
import axios from 'axios';
import { router } from 'expo-router';


const testIntoAdmin = async () => {
  const response = await axios.post(`${API_URL}/login/password`, {
    mail_address: "3207694306@qq.com",
    password: "123456"
  });
  storageApi.saveUserMailaddress(response.data.mail_address)
  storageApi.saveToken(response.data.token)
  storageApi.saveUserName(response.data.user_name)
  storageApi.saveUserId(response.data.id)
  
  router.push({ pathname: "/" })

}

function MyPage() {
  return (
    <View style={styles.container}>

      <SafeAreaView> 
        {/* 用户信息条 */}
        <UserInfoBar Name="yamanashi" Avatar='https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb'/>
        {/* 设置选项 */}

        <GoodsSummary />
        <SettingsList />
      </SafeAreaView>
      <Button title="测试管理员入口" onPress={testIntoAdmin}></Button>
    </ScrollView>
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
