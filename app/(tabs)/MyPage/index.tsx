import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserInfoBar from '../../../components/mypage/UserInfoBar';
import SettingsList from '../../../components/mypage/SettingsList';

function MyPage() {
  return (
    <ScrollView style={styles.container}>

      <SafeAreaView> 
        {/* 用户信息条 */}
        <UserInfoBar Name="yamanashi" Avatar='https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb'/>
        {/* 设置选项 */}
        <SettingsList />
      </SafeAreaView>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default MyPage;
