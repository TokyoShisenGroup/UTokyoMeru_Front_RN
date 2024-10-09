import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { AntDesign } from '@expo/vector-icons'; // 导入图标
import sendVerificationCode from '@/utils/sendVerificationCode';
import axios from 'axios';
import { API_URL } from '@/constants/config';

type FormData = {
  email: string;
  verificationCode: string;
  newPassword: string;
  confirmPassword: string;
};

const Reset = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { control, handleSubmit, formState: { errors }, getValues } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    await axios.post(`${API_URL}/login/reset`, {
      mail_address: data.email,
      verification_code: data.verificationCode,
      password: data.newPassword,
      verification_code_type: "reset"
    }).then((response) => {
      console.log(response.data);
      Alert.alert('密码重置成功');
    }).catch((error) => {
      console.log(error);
      Alert.alert('密码重置请求失败');
    });
    setModalVisible(false);
  };

  const sendCode = async () => {
    const email = getValues('email');
    if (email) {
        try{
          await sendVerificationCode(email);
          Alert.alert('验证码已发送到您的邮箱');
        }
        catch(error){
          Alert.alert('发送验证码失败');
        }
    } else {
      Alert.alert('请先输入邮箱地址');
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.forgetPassword}>忘记密码？</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>重置密码</Text>
            <View style={styles.formContainer}> 
            <Text style={styles.label}>邮箱</Text>
            <Controller
              control={control}
              rules={{ required: '邮箱不能为空', pattern: { value: /^\S+@\S+$/i, message: '请输入有效的邮箱地址' } }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="邮箱"
                />
              )}
              name="email"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            </View>
            <View style={styles.formContainer}>
            <Text style={styles.label}>验证码</Text>
            <View style={styles.verificationContainer}>
              <Controller
                control={control}
                rules={{ required: '验证码不能为空' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, styles.verificationInput]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="验证码"
                  />
                )}
                name="verificationCode"
              />
              <TouchableOpacity style={styles.verificationButton} onPress={sendCode}>
                <Text style={styles.verificationButtonText}>获取验证码</Text>
              </TouchableOpacity>
            </View>
            {errors.verificationCode && <Text style={styles.errorText}>{errors.verificationCode.message}</Text>}
            </View>

            <View style={styles.formContainer}>
            <Text style={styles.label}>新密码</Text>
            <Controller
              control={control}
              rules={{ required: '新密码不能为空', minLength: { value: 6, message: '密码至少6个字符' } }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="新密码"
                  secureTextEntry
                />
              )}
              name="newPassword"
            />
            {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword.message}</Text>}
            </View>

            <View style={styles.formContainer}>
            <Text style={styles.label}>确认新密码</Text>
            <Controller
              control={control}
              rules={{
                required: '请确认新密码',
                validate: value => value === getValues('newPassword') || '两次输入的密码不一致'
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="确认新密码"
                  secureTextEntry
                />
              )}
              name="confirmPassword"
            />
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.submitButtonText}>确认重置</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  forgetPassword: {
    color: '#007AFF',
    fontSize: 14,
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  formContainer: {
    width: '100%',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 5, // 增加点击区域
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
  verificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  verificationInput: {
    width: '60%',
  },
  verificationButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  verificationButtonText: {
    color: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Reset;

