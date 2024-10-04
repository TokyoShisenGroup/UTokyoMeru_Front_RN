import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Modal, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios'; // 需要安装 axios

import Header from '@/components/mypage/Header';
import { getPrefList, getCities } from '@/utils/getAddress';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

// 日本的都道府县列表
const prefectures = [
  { id: "01", name: "北海道" },
  { id: "02", name: "青森県" },
  { id: "03", name: "岩手県" },
  { id: "04", name: "宮城県" },
  { id: "05", name: "秋田県" },
  { id: "06", name: "山形県" },
  { id: "07", name: "福島県" },
  { id: "08", name: "茨城県" },
  { id: "09", name: "栃木県" },
  { id: "10", name: "群馬県" },
  { id: "11", name: "埼玉県" },
  { id: "12", name: "千葉県" },
  { id: "13", name: "東京都" },
  { id: "14", name: "神奈川県" },
  { id: "15", name: "新潟県" },
  { id: "16", name: "富山県" },
  { id: "17", name: "石川県" },
  { id: "18", name: "福井県" },
  { id: "19", name: "山梨県" },
  { id: "20", name: "長野県" },
  { id: "21", name: "岐阜県" },
  { id: "22", name: "静岡県" },
  { id: "23", name: "愛知県" },
  { id: "24", name: "三重県" },
  { id: "25", name: "滋賀県" },
  { id: "26", name: "京都府" },
  { id: "27", name: "大阪府" },
  { id: "28", name: "兵庫県" },
  { id: "29", name: "奈良県" },
  { id: "30", name: "和歌山県" },
  { id: "31", name: "鳥取県" },
  { id: "32", name: "島根県" },
  { id: "33", name: "広島県" },
  { id: "34", name: "山口県" },
  { id: "35", name: "徳島県" },
  { id: "36", name: "香川県" },
  { id: "37", name: "愛媛県" },
  { id: "38", name: "高知県" },
  { id: "39", name: "福岡県" },
  { id: "40", name: "佐賀県" },
  { id: "41", name: "長崎県" },
  { id: "42", name: "熊本県" },
  { id: "43", name: "大分県" },
  { id: "44", name: "宮崎県" },
  { id: "45", name: "鹿児島県" },
  { id: "46", name: "沖縄県" }
]

const RegisterScreen = () => {
  const {control, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showPrefecturePicker, setShowPrefecturePicker] = useState(false);
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [prefecture, setSelectedPrefecture] = useState([]);
  const [city, setSelectedCity] = useState([]);
  const [selectedGender, setSelectedGender] = useState(0);
  const selectedPrefecture = watch("prefecture");
  const selectedCity = watch("city");

  enum Gender {
    Unknown = 0,
    Male = 1,
    Female = 2,
    NonBinary = 3
  }
  
  // 创建一个映射对象,用于转换显示文本和枚举值
  const genderMap = [
    { label: "未知", value: Gender.Unknown },
    { label: "男", value: Gender.Male },
    { label: "女", value: Gender.Female },
    { label: "非二元", value: Gender.NonBinary }
  ];


  const getGenderLabel = (value: Gender) => {
    switch (value) {
      case Gender.Unknown:
        return "未知";
      case Gender.Male:
        return "男";
      case Gender.Female:
        return "女";
      case Gender.NonBinary:
        return "非二元";
    }
  };

  const GenderLabel: React.FC<{ value: string }> = (props) => {
    console.log(props);
    return <Text>{props.value}</Text>
  }

  const findAddressByPostalCode = async (postalCode: string) => {
    try {
      const response = await axios.get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`);
      const prefecture = response.data.results[0].address1;
      const city = response.data.results[0].address2;
      setValue("prefecture", prefecture);
      setValue("city", city);
    } catch (error) {
      console.error('获取地址失败:', error);
      return null;
    }
  };
  const onSubmit = async (data: any) => {
    console.log(data);
    return;
    try {
      const response = await axios.post('https://your-api-endpoint.com/register', data);
      
      if (response.status === 200) {
        Alert.alert('注册成功', '您已成功注册！');
        router.push('/loginpage/Login');
      } else {
        Alert.alert('注册失败', '请稍后重试');
      }
    } catch (error) {
      console.error('注册错误:', error);
      Alert.alert('注册错误', '发生了一个错误，请稍后重试');
    }
  };

  const sendVerificationCode = () => {
    // 发送验证码的逻辑
    console.log('发送验证码');
  };

  return (
    <SafeAreaView style={styles.container}>
    <Header title="注册" onBackPress={() => router.back()}/>
    <ScrollView style={styles.container}>
      <Controller
        control={control}
        rules={{ 
            required: '用户名为必填项',
            maxLength: { value: 15, message: '用户名最多15个字符' }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text style={styles.label}>用户名 <Text style={styles.requiredStar}>*</Text></Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="请输入用户名"
              autoCapitalize="none"
            />
            {errors.username && typeof errors.username.message === 'string' && 
             <Text style={styles.errorText}>{errors.username.message}</Text>}
          </View>
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          required: '邮箱为必填项',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: '请输入有效的邮箱地址'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text style={styles.label}>邮箱 <Text style={styles.requiredStar}>*</Text></Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="请输入邮箱"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && typeof errors.email.message === 'string' && 
            <Text style={styles.errorText}>{errors.email.message}</Text>}
          </View>
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{ 
            required: '验证码为必填项',
            pattern: {
                value: /^\d{6}$/,
                message: '验证码必须是6位数字'
              }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text style={styles.label}>验证码 <Text style={styles.requiredStar}>*</Text></Text>
            <View style={styles.codeContainer}>
              <TextInput
                style={[styles.input, styles.codeInput]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="请输入验证码"
              />
              <TouchableOpacity style={styles.codeButton} onPress={sendVerificationCode}>
                <Text style={styles.codeButtonText}>发送验证码</Text>
              </TouchableOpacity>
            </View>
            {errors.verificationCode && typeof errors.verificationCode.message === 'string' && 
                <Text style={styles.errorText}>{errors.verificationCode.message}</Text>}
          </View>
        )}
        name="verificationCode"
      />

      <Controller
        control={control}
        rules={{ required: '密码为必填项', minLength: { value: 6, message: '密码至少6个字符' } }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text style={styles.label}>密码 <Text style={styles.requiredStar}>*</Text>  </Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="请输入密码"
              secureTextEntry
            />
            {errors.password && typeof errors.password.message === 'string' && 
             <Text style={styles.errorText}>{errors.password.message}</Text>}
          </View>
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={{
          required: '确认密码为必填项',
          validate: (value) => value === control._fields.password?._f.value || '两次输入的密码不一致'
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text style={styles.label}>确认密码 <Text style={styles.requiredStar}>*</Text>  </Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="请再次输入密码"
              secureTextEntry
            />
            {errors.confirmPassword && typeof errors.confirmPassword.message === 'string' && 
            <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
          </View>
        )}
        name="confirmPassword"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View>
            <Text style={styles.label}>性别</Text>
            <TouchableOpacity 
              style={styles.pickerButton} 
              onPress={() => setShowGenderPicker(true)}
            >
              <Text style={styles.pickerButtonText}>
                {value}
              </Text>
            </TouchableOpacity>
            <Modal
              visible={showGenderPicker}
              transparent={true}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => {
                      onChange(itemValue);
                    }}
                    style={styles.picker}
                  >
                    {genderMap.map((item) => (
                      <Picker.Item key={item.value} label={item.label} value={item.value} />
                    ))}
                  </Picker>
                  <TouchableOpacity 
                    style={styles.confirmButton}
                    onPress={() => {
                      console.log(value);
                      setSelectedGender(value);
                      setShowGenderPicker(false)
                    }}
                  >
                    <Text style={styles.confirmButtonText}>确定</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        )}
        name="gender"
      />

      <Controller
        control={control}
        name="birthDate"
        render={({ field: { onChange, value } }) => (
          <View>
            <Text style={styles.label}>出生日期</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dateInput}>
                {value ? value.toLocaleDateString() : '请选择出生日期'}
              </Text>
            </TouchableOpacity>

            <Modal
              transparent={true}
              visible={showDatePicker}
              onRequestClose={() => setShowDatePicker(false)}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <DateTimePicker
                    value={value || new Date()}
                    mode="date"
                    display="spinner"
                    onChange={(event, selectedDate) => {
                      if (selectedDate) {
                        onChange(selectedDate);
                      }
                    }}
                  />
                  <TouchableOpacity 
                    style={styles.confirmButton}
                    onPress={() => setShowDatePicker(false)}
                  >
                    <Text style={styles.confirmButtonText}>关闭</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        )}
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text style={styles.label}>手机号</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="请输入手机号"
              keyboardType="phone-pad"
            />
          </View>
        )}
        name="phone"
      />
      <View style={styles.zipCodeContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.zipCodeInputContainer}>
              <Text style={styles.label}>邮编</Text>
              <TextInput
                style={[styles.input, styles.zipCodeInput]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="请输入邮编"
                keyboardType="numeric"
              />
            </View>
          )}
          name="postalCode"
        />
        <TouchableOpacity style={styles.zipCodeButton} onPress={() => findAddressByPostalCode(watch("postalCode"))}>
          <Text style={styles.zipCodeButtonText}>查询</Text>
        </TouchableOpacity>
      </View>
    <View style={styles.addressRow}>
    <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.addressPickerContainer}>
            <Text style={styles.label}>都道府県</Text>
            <TouchableOpacity 
              style={styles.pickerButton} 
              onPress={() => setShowPrefecturePicker(true)}
            >
              <Text style={styles.pickerButtonText}>
                {value || "選択してください"}
              </Text>
            </TouchableOpacity>
            <Modal
              visible={showPrefecturePicker}
              transparent={true}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => {
                      onChange(itemValue);
                      console.log(itemValue);
                    }}
                    style={styles.picker}
                  >
                    {prefectures.map((pref) => (
                      <Picker.Item key={pref.id} label={pref.name} value={pref.name} />
                    ))}
                  </Picker>
                </View>
                <TouchableOpacity 
                  style={styles.confirmButton}
                  onPress={() => {
                    setShowPrefecturePicker(false);
                    console.log(selectedPrefecture);
                    setShowCityPicker(true);
                  }}
                >
                  <Text style={styles.confirmButtonText}>确定</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        )}
        name="prefecture"
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.addressPickerContainer}>
            <Text style={styles.label}>市区町村</Text>
            <TouchableOpacity 
              style={styles.pickerButton} 
              onPress={() => setShowCityPicker(true)}
              disabled={!selectedPrefecture}
            >
              <Text style={styles.pickerButtonText}>
                {value || "選択してください"}
              </Text>
            </TouchableOpacity>
            <Modal
              visible={showCityPicker}
              transparent={true}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => {
                      onChange(itemValue);
                      console.log(itemValue);
                    }}
                    style={styles.picker}
                  >
                    {getCities(prefectures.find(pref => pref.name === selectedPrefecture)?.id || '')?.map((city) => (
                      <Picker.Item key={city.citycode} label={city.city} value={city.city} />
                    ))}
                  </Picker>
                </View>
                <TouchableOpacity 
                  style={styles.confirmButton}
                  onPress={() => setShowCityPicker(false)}
                >
                  <Text style={styles.confirmButtonText}>确定</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        )}
        name="city"
      />  
    </View>
    <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text style={styles.label}>详细地址</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="请输入详细地址"
            />
          </View>
        )}
        name="address"
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.registerButtonText}>注册</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  requiredStar: {
    color: 'red',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeInput: {
    flex: 1,
    marginRight: 10,
  },
  codeButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  codeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  pickerButtonText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  picker: {
    height: 200,
  },
  confirmButton: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    marginBottom: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
  addressContainer: {
    marginBottom: 15,
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressPickerContainer: {
    flex: 1,
    marginRight: 10,
  },
  zipCodeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  zipCodeInputContainer: {
    flex: 1,
    marginRight: 10,
  },
  zipCodeInput: {
    flex: 1,
  },
  zipCodeButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 100,
  },
  zipCodeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

export default RegisterScreen;