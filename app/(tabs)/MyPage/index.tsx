import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserInfoBar from '../../../components/mypage/UserInfoBar';
import SettingsList from '../../../components/mypage/SettingsList';
import GoodsSummary from '../../../components/mypage/GoodsSummary';
import storageApi from '@/lib/storageApi';
import { useUser } from '@/lib/dataRequest';



function MyPage() {
  const id = storageApi.getUserId();
  const {data, error, isLoading} = useUser(id?.toString() || "");


  return (
    <View style={styles.container}>

      <SafeAreaView> 
        {/* 用户信息条 */}
        <UserInfoBar/>
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
