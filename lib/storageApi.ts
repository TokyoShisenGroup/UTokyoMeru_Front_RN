// storageApi.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';






// 定义存储数据的类型
type StorageData = any; // 可以根据你的需求修改类型

// 创建一个 Storage 实例
const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  // sync: require('./sync'),
});

// 封装API方法
const storageApi = {
  // 存储数据
  save: async (key: string, data: StorageData): Promise<void> => {
    try {
      await storage.save({
        key: key,
        data: data,
      });
      console.log(`Data saved for key: ${key}`);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  },

  // 获取数据
  load: async (key: string): Promise<StorageData | null> => {
    try {
      const data = await storage.load({ key: key });
      return data;
    } catch (error) {
      console.error('Error loading data:', error);
      return null;
    }
  },

  // 移除数据
  remove: async (key: string): Promise<void> => {
    try {
      await storage.remove({ key: key });
      console.log(`Data removed for key: ${key}`);
    } catch (error) {
      console.error('Error removing data:', error);
    }
  },

  // 清除所有数据
  clearAll: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
      console.log('All data cleared.');
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  },

  getToken: async (): Promise<string | null> => {
    if (await storageApi.load("token") === null) {
      console.log("token not found");
      return null;
    }
    return await storageApi.load("token");
  },
  getUserMailaddress: async (): Promise<string | null> => {
    if (await storageApi.load("user_mailaddress") === null) {
      console.log("user_mailaddress not found");
      return null;
    }
    return await storageApi.load("user_mailaddress");
  },
  getUserName: async (): Promise<string | null> => {
    if (await storageApi.load("user_name") === null) {
      console.log("user_name not found");
      return null;
    }
    return await storageApi.load("user_name");
  },
  saveToken: async (token: string): Promise<void> => {
    await storageApi.save("token", token);
  },
  saveUserMailaddress: async (user_mailaddress: string): Promise<void> => {
    await storageApi.save("user_mailaddress", user_mailaddress);
  },
  saveUserName: async (user_name: string): Promise<void> => {
    await storageApi.save("user_name", user_name);
  }
};

// 导出封装的 storageApi
export default storageApi;