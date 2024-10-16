import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { Header } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import { UPLOAD_IMAGE_URL, API_URL } from '@/constants/config';
import axios from 'axios';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import storageApi from "@/lib/storageApi"; // 请确保路径正确
import { useSellItemAPI } from '@/lib/dataRequest';

type FormData = {
  title: string;
  description: string;
  price: number;
  tags: string[];
  tagInput: string;
};

const SellItemPage: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const { control, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      tags: [],
      tagInput: '',
    },
  });


  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
      });

      if (!result.canceled) {
        const newImages = result.assets.map((asset) => asset.uri);
        setImages(prevImages => {
          const updatedImages = [...prevImages, ...newImages];
          return updatedImages.slice(0, 9);
        });
      }
    } catch (error) {
      console.error('图片选择错误：', error);
    }
  };

  const deleteImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };





  const handleTagInputChange = (text: string, onChange: (value: string) => void) => {
    if (text.endsWith(' ') || text.endsWith(',') || text.endsWith('\n')) {
      const newTag = text.trim().replace(/,|\s/g, '');
      if (newTag !== '') {
        const currentTags = getValues('tags') || [];
        setValue('tags', [...currentTags, newTag]);
      }
      onChange(''); // 清空输入框
    } else {
      onChange(text);
    }
  };

  const removeTag = (index: number) => {
    const currentTags = getValues('tags') || [];
    const newTags = currentTags.filter((_, i) => i !== index);
    setValue('tags', newTags);
  };

  const onSubmit = async (data: FormData) => {
    try {
      // 移除 tagInput
      const { tagInput, ...restData } = data;
      const seller_id = await storageApi.getUserId()
      if(seller_id == undefined)
      {
        console.log("用户未登录")
        return
      }
      const postData = {
        ...restData,
        seller_id: seller_id,
        is_invisible: false,
        is_deleted: false,
        is_bought: false,
      };
      postData.price = Number(postData.price)

      console.log('表单数据汇总：', postData);

      await useSellItemAPI(postData,images)
      // const response = await axios.get(`${API_URL}/goods`)
      console.log("商品发布成功");

      // router.push({
      //   pathname: "/goodspage/GoodsDetail",
      //   params: { id: response.data.good_info.ID }
      // });
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
        </View>
        <View style={styles.errorContainer}>
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
          <ScrollView horizontal style={styles.imageScrollView}>
            {images.map((image, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri: image }} style={styles.previewImage} />
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteImage(index)}
                >
                  <Text style={styles.deleteButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
            {images.length < 9 && (
              <TouchableOpacity style={styles.addImageButton} onPress={selectImage}>
                <Text style={styles.uploadText}>+</Text>
              </TouchableOpacity>
            )}
          </ScrollView>

        </View>
        <View style={styles.errorContainer}>
          {errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}
        </View>
        <View>
          <Text style={styles.title}>价格</Text>
        </View>
        <View>
          <Controller
            control={control}
            rules={{ required: '价格不能为空' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.priceContainer}>
                <Text style={{ fontSize: 26 }}>￥</Text>
                <TextInput
                  style={styles.priceInput}
                  placeholder="定个价"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  keyboardType="numeric"
                />
              </View>
            )}
            name="price"
          />
        </View>
        <View style={styles.errorContainer}>
          {errors.price && <Text style={styles.errorText}>{errors.price.message}</Text>}
        </View>
        <View>
          <Text style={styles.title}>标签</Text>
        </View>
        <View style={styles.tagContainer}>
          <Controller
            control={control}
            name="tagInput"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.tagInput}
                placeholder="打上标签让更多人看见"
                value={value}
                onChangeText={(text) => handleTagInputChange(text, onChange)}
                onSubmitEditing={() => handleTagInputChange(value + '\n', onChange)}
              />
            )}
          />
          <View style={styles.tagList}>
            {watch('tags')?.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
                <TouchableOpacity onPress={() => removeTag(index)}>
                  <Text style={styles.tagDelete}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.errorContainer}>
          {errors.tags && <Text style={styles.errorText}>{errors.tags.message}</Text>}
        </View>
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
  },
  descriptionInput: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
  },
  errorContainer: {
    marginBottom: 10,
  },
  imageScrollView: {
    flexDirection: 'row',
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    marginRight: 6,
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 5,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addImageButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 5,
  },
  uploadText: {
    fontSize: 24,
    color: '#ddd',
  },
  priceInput: {
    height: 40,
    width: wp(80),
    borderColor: '#ddd',
    borderBottomWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: wp(80),
  },
  tagContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  tagInput: {
    height: 40,
    width: wp(87),
    borderColor: '#ddd',
    borderBottomWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  tagText: {
    marginRight: 5,
  },
  tagDelete: {
    color: '#888',
    fontWeight: 'bold',
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
});

export default SellItemPage;
