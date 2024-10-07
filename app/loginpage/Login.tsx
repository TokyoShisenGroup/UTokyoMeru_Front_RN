import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Header from '@/components/mypage/Header';
import { router } from 'expo-router';
import axios from 'axios';
import { API_URL } from '@/constants/config';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import storageApi from '@/lib/storageApi';
import { Button } from '@rneui/base';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    height: hp(15),
  },
  logo: {
    width: hp(15),
    height: hp(15),
    marginBottom: hp(2),
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  loginButton: {
    width: '48%',
    height: 40,
    backgroundColor: '#1890ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  registerButton: {
    width: '48%',
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: '#1890ff',
    borderWidth: 1,
  },
  registerButtonText: {
    color: '#1890ff',
    fontSize: 16,
  },
  forgetPassword: {
    marginTop: 20,
    color: '#1890ff',
    fontSize: 16,
  },
});


type FormData = {
  mail_address: string;
  password: string;
};



const Login: React.FC = () => {
  const { control, handleSubmit } = useForm<FormData>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logout = () => {
    storageApi.clearAll();
    setIsLoggedIn(false);
  }
  useEffect(() => {
    // 检查是否已经登录
    const checkLoginStatus = async () => {
      const userName = await storageApi.load('username');
      if (userName !== "") {
        setIsLoggedIn(true);
        Alert.alert('你已经是登录状态了');
      }
      else {
        Alert.alert("你还没有登录");
      }
    };
    checkLoginStatus();
  }, []);

  const handleBackPress = () => {
    router.back();
  };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(`${API_URL}/v1/login`, data);
      console.log("response");
      console.log(response.data);
      await storageApi.saveToken(response.data.token);
      await storageApi.saveUserMailaddress(response.data.user_mailaddress);
      await storageApi.saveUserName(response.data.user_name);
      setIsLoggedIn(true); // 登录成功后更新状态
      Alert.alert("你登录成功了");
    } catch (error) {
      console.error('登录失败:', error);
      Alert.alert('登录失败', '发生了一个错误，请稍后重试');
      setIsLoggedIn(false); // 登录失败后更新状态
    }
  };

  if (isLoggedIn) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header title="已登录" onBackPress={handleBackPress} />
        <View style={styles.container}>
          <Text style={styles.title}>你已经登录了！</Text>
        </View>
        {/* 注销按钮 还需要setlogin为false*/}
        <Button onPress={logout}>注销</Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="登录" onBackPress={handleBackPress} />
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={{
              uri: "https://pbs.twimg.com/profile_images/1774583774896091137/zJy327_C_400x400.jpg"
            }}
            style={styles.logo}
          />
          <Text style={styles.title}>欢迎使用东大煤炉</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="请输入账户"
                placeholderTextColor="#999"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="mail_address"
            rules={{ required: true }}
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="请输入密码"
                placeholderTextColor="#999"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
            rules={{ required: true }}
            defaultValue=""
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.loginButtonText}>登录</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerButton} onPress={() => router.push("/loginpage/Register")}>
              <Text style={styles.registerButtonText}>注册</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => console.log("忘记密码")}>
            <Text style={styles.forgetPassword}>忘记密码？</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};



export default Login;