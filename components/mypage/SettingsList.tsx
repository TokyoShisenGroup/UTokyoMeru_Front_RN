import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import storageApi from '@/lib/storageApi';
import { whetherAdmin } from '@/utils/webRequest';
import { router } from 'expo-router';
import { useAuth } from '@/lib/context/AuthContext';

const initialSettingsList = [
  { title: '个人信息', icon: 'person', onPress: () => console.log('个人信息') },
  { title: '聊天', icon: 'chat', onPress: () => router.push("/chat") },
];

const SettingsList = () => {
  const [settingsList, setSettingsList] = useState(initialSettingsList);
  const { isLoggedIn, setIsLoggedIn, checkLoginStatus } = useAuth();

  const handleLogout = async () => {
    try {
      await storageApi.clearAll();
      setIsLoggedIn(false);
      router.replace("/");
      router.push("/loginpage/Login");
    } catch (error) {
      console.error("登出错误:", error);
    }
  };
  

  useFocusEffect(
    React.useCallback(() => {
      const checkLogin = async () => {
        const userinfo = await storageApi.getUserInfo();

        if (isLoggedIn) {
          // 用户已登录，添加注销选项
          let updatedList = [...initialSettingsList, {
            title: '注销',
            icon: 'log-out-outline',
            onPress: handleLogout
          }];

          // 检查是否为管理员
          if (isLoggedIn && userinfo && await whetherAdmin(userinfo.mailAddress)) {
            updatedList = [
              ...updatedList,
              {
                title: '管理员视图',
                icon: 'settings',
                onPress: () => router.push({ pathname: "/adminpage/AdminControl" }),
              },
            ];
          }

          setSettingsList(updatedList);
        }else{
          setSettingsList(initialSettingsList);
        }
      };
      
      checkLoginStatus();
      checkLogin();

      return () => {
        // 清理逻辑
      };
    }, [isLoggedIn])
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
      borderRadius: 10,
      backgroundColor: 'white',
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
  }
);

export default SettingsList;
