import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  
import { useFocusEffect } from '@react-navigation/native';
import storageApi from '@/lib/storageApi';
import { whetherAdmin } from '@/utils/webRequest';
import { router } from 'expo-router';

const initialSettingsList = [
  { title: '个人信息', icon: 'person', onPress: () => console.log('个人信息') },
  { title: '账户安全', icon: 'lock', onPress: () => console.log('账户安全') },
  { title: '隐私设置', icon: 'eye-off', onPress: () => console.log('隐私设置') },
  { title: '通知管理', icon: 'notifications', onPress: () => console.log('通知管理') },
  { title: '帮助中心', icon: 'help-circle', onPress: () => console.log('帮助中心') },
  { title: '关于我们', icon: 'information-circle', onPress: () => console.log('关于我们') },
];

const SettingsList = () => {
  const [settingsList, setSettingsList] = useState(initialSettingsList);

  useFocusEffect(
    React.useCallback(() => {
      const checkAdminStatus = async () => {
        const userEmail = await storageApi.getUserMailaddress();
        if (userEmail && await whetherAdmin(userEmail)) {
          setSettingsList(prevList => {
            // 确保不重复添加“管理员视图”项
            const hasAdminView = prevList.some(item => item.title === '管理员视图');
            if (!hasAdminView) {
              return [
                ...prevList,
                {
                  title: '管理员视图',
                  icon: 'settings',
                  onPress: () => router.push({pathname: "/mypage/AdminControl" }),
                },
              ];
            }
            return prevList;
          });
        }
        else{
          setSettingsList(initialSettingsList)
        }
      };
      checkAdminStatus();

      // 可选：返回一个清理函数，当屏幕失去焦点时执行
      return () => {
        // 如果需要在屏幕失去焦点时执行任何清理工作，可以在这里添加
      };
    }, [])
  );

  return (
    <View style={styles.settingsContainer}>
      {settingsList.map((item, index) => (
        <TouchableOpacity key={index} style={styles.settingItem} onPress={item.onPress}>
          <Text>{item.title}</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="gray" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  settingsContainer: {
    marginTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});

export default SettingsList;