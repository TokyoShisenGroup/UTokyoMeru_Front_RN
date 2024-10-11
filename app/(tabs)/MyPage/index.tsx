import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserInfoBar from '../../../components/mypage/UserInfoBar';
import SettingsList from '../../../components/mypage/SettingsList';
import GoodsSummary from '../../../components/mypage/GoodsSummary';

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
