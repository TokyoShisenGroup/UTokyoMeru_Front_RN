import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { Header } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import { UPLOAD_IMAGE_URL, API_URL } from '@/constants/config';
import axios from 'axios';

type FormData = {
  title: string;
  description: string;
  price: string;
  tags: string;
};

const SellItemPage: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
      });

      if (!result.canceled) {
        const uris = result.assets.map((asset) => asset.uri);
        console.log(uris);
        setImages(uris);
      }
    } catch (error) {
      console.error('图片选择错误：', error);
    }
  };

  const uploadImage = async (uri: string) => {
    const formData = new FormData();
    formData.append('image', {
      uri,
      type: 'image/jpeg',
      name: 'upload.jpg',
    } as any);

    try {
      const response = await fetch('您的服务器上传地址', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const result = await response.json();
      return result.Images;
    } catch (error) {
      console.error('图片上传错误：', error);
      throw error;
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      const uploadedImageUrls = await Promise.all(images.map(uploadImage));
      
      // 将上传后的图片URL和表单数据一起发送到服务器
      const postData = {
        ...data,
        images: uploadedImageUrls,
      };

      const response = await axios.post(`${API_URL}/goods`, postData);
      console.log('提交的数据：', postData);
      console.log('商品id：', response.data.ID);
      router.push({
        pathname: "/goodspage/GoodsDetail",
        params: { id: response.data.ID }
      });
    } catch (error) {
      console.error('提交表单错误：', error);
      Alert.alert('发布失败', '请稍后重试');
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('抱歉，我们需要相册权限来上传图片。');
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{ text: '出闲置', style: styles.headerTitle }}
        rightComponent={
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <Text style={styles.publishButton}>发布</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView style={styles.content}>
        <View><Text style={styles.title}>商品名称</Text></View>
        <View style={styles.titleContainer}>
          <Controller
            control={control}
            rules={{ required: '商品名称不能为空' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.descriptionInput}
                placeholder="请输入商品名称"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="title"
          />
          {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.title}>商品描述</Text>
          <Controller
            control={control}
            rules={{ required: '商品描述不能为空' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.descriptionInput}
                multiline
                numberOfLines={10}
                placeholder="描述一下你的闲置物品"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="description"
          />
          {errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}
          
          {images.length > 0 ? (
            <TouchableOpacity style={styles.imageUpload} onPress={selectImage}>
              {images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.previewImage} />
            ))}
             </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.imageUpload} onPress={selectImage}>
              <Text style={styles.uploadText}>+</Text>
            </TouchableOpacity>
          )}
         
        </View>
        <View>
          <Text style={styles.title}>价格</Text>
        </View>
        <Controller
          control={control}
          rules={{ required: '价格不能为空' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="定个好价"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
            />
          )}
          name="price"
        />
        {errors.price && <Text style={styles.errorText}>{errors.price.message}</Text>}
        <View>
          <Text style={styles.title}>标签</Text>
        </View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="打上标签让更多人看见"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="tags"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  publishButton: {
    color: '#fff',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  descriptionContainer: {
    height: hp(40),
    marginBottom: 20,
    marginTop: 20,
  },
  descriptionInput: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
  },
  imageUpload: {
    flexDirection: 'row',
    position: 'absolute',
    left: 10,
    bottom: 10,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 5,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderBottomWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  uploadText: {
    fontSize: 24,
    color: '#ddd',
  },
});

export default SellItemPage;
