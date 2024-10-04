import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Header from '@/components/mypage/Header';
import {router} from 'expo-router'

const Login: React.FC = () => {
  const handleBackPress = () => {
    router.back()
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="登录" onBackPress={handleBackPress} />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>欢迎使用东大煤炉</Text>
          <TextInput
            style={styles.input}
            placeholder="请输入账户"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="请输入密码"
            placeholderTextColor="#999"
            secureTextEntry
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>登录</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerButton} onPress={()=> router.push("/loginpage/Register")}>
              <Text style={styles.registerButtonText}>注册</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={()=> console.log("忘记密码")}>
            <Text style={styles.forgetPassword}>忘记密码？</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

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

export default Login;
