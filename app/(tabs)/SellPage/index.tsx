import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { Header } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import { UPLOAD_IMAGE_URL, API_URL } from '@/constants/config';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import * as ImageManipulator from 'expo-image-manipulator';

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

  const compressImage = async (uri: string) => {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1000 } }], // 调整尺寸
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG } // 压缩质量
    );
    return result.uri;
  };

  const uploadImage = async (uri: string) => {
    try {
       // 获取文件信息
        const fileInfo = await FileSystem.getInfoAsync(uri);
        const compressedUri = await compressImage(uri);
        // 创建 FormData 对象
        const formData = new FormData();
        
        // 从 uri 中提取文件名
        const fileName = uri.split('/').pop() || 'image.jpg';
        
        // 创建一个 Blob 对象
        const file = {
          uri: compressedUri,
          type: 'image/jpeg',
          name: fileName,
        };
        
        // 将文件添加到 FormData 中
        formData.append('image', file as any);

        console.log("上传图片中");
        // 发送请求
        const response = await fetch(`${UPLOAD_IMAGE_URL}/upload`, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": "14ac5499cfdd2bb2859e4476d2e5b1d2bad079bf",
          },
        });

    
      // 获取原始响应文本
      const responseText = await response.text();

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON 解析错误：', parseError);
        console.error('无法解析的响应内容：', responseText);
        throw new Error('服务器返回了无效的 JSON 数据');
      }

      console.log('解析后的结果：', result);
      return result.Images;
    } catch (error) {
      console.error('图片上传错误：', error);
      throw error;
    }
  };

  const uploadImages = async (images: string[]) => {
    const uploadedUrls = [];
    for (const image of images) {
      const url = await uploadImage(image);
      uploadedUrls.push(url);
    }
    return uploadedUrls;
  };

  const onSubmit = async (data: FormData) => {
    try {
      const uploadedImageUrls = await uploadImages(images);
      
      // 将上传后的图片URL和表单数据一起发送到服务器
      const postData = {
        ...data,
        images: uploadedImageUrls,
        seller: 1,
        is_invisible: false,
        is_deleted: false,
        is_bought: false,
      };

      console.log('表单数据汇总：', postData);
      const response = await axios.post(`${API_URL}/goods`, postData).catch((error) => {
        console.error('商品发布失败：', error);
        throw error;
      });
      console.log("商品发布成功");
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
              placeholder="定个价"
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
