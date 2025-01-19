import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import UserInfoBar from '../../../components/mypage/UserInfoBar';
import SettingsList from '../../../components/mypage/SettingsList';
import GoodsSummary from '../../../components/mypage/GoodsSummary';
import { useAuth } from '@/lib/context/AuthContext';


function MyPage() {
  const { isLoggedIn, checkLoginStatus } = useAuth();
  useEffect(() => {
    checkLoginStatus();
  }, []);
  return (
    <View style={styles.container}>

      <SafeAreaView> 
        {/* 用户信息条 */}
        <UserInfoBar/>
        {/* 设置选项 */}

        {isLoggedIn && <GoodsSummary />}
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
