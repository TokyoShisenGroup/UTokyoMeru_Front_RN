// storageApi.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';




export var TOKEN_KEY:string = "token";
export var USERMAILADDRESS_KEY:string = "usermailaddress";
export var USERNAME_KEY:string = "username";

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

// 定义用户信息类型
export interface UserInfo {
  token: string;
  mailAddress: string;
  userName: string;
  userId: number;
}

const USER_INFO_KEY = 'userInfo';

// 封装API方法
const storageApi = {
  init: async (): Promise<void> => {
    // TOKEN_KEY = await storageApi.load("token");
    // USERMAILADDRESS_KEY = await storageApi.load("usermailaddress");
    // USERNAME_KEY = await storageApi.load("username");
  },
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
    await storageApi.init();
  },

  // 获取数据
  load: async (key: string): Promise<StorageData | null> => {
    try {
      const data = await storage.load({ key: key });
      return data;
    } catch (error) {
      console.log('Error loading data:', error);
      return null;
    }
    await storageApi.init();
  },

  // 移除数据
  remove: async (key: string): Promise<void> => {
    try {
      await storage.remove({ key: key });
      console.log(`Data removed for key: ${key}`);
    } catch (error) {
      console.error('Error removing data:', error);
    }
    await storageApi.init();
  },

  // 检查登录状态
  isLoggedIn: async (): Promise<boolean> => {
    try {
      const userInfo = await storage.load({ key: USER_INFO_KEY });
      // 检查是否有 token 且 token 不为空
      return !!(userInfo?.token);
    } catch (error) {
      return false;
    }
  },

  // 清除所有数据
  clearAll: async (): Promise<void> => {
    try {
      // 完全清除存储
      await storage.clearMap();
      
      // 确保用户信息被清除
      await storage.save({
        key: USER_INFO_KEY,
        data: null
      });
      
      console.log('All data cleared successfully');
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  },

  // 存储所有用户信息
  saveUserInfo: async (userInfo: Partial<UserInfo>): Promise<void> => {
    try {
      // 获取现有数据，与新数据合并
      const existingData = await storage.load({ key: USER_INFO_KEY }).catch(() => ({}));
      const newData = { ...existingData, ...userInfo };
      
      await storage.save({
        key: USER_INFO_KEY,
        data: newData,
      });
      console.log('User info saved successfully');
    } catch (error) {
      console.error('Error saving user info:', error);
    }
  },

  // 获取所有用户信息
  getUserInfo: async (): Promise<UserInfo | null> => {
    try {
      const data = await storage.load({ key: USER_INFO_KEY });
      console.log("Retrieved user info:", data);
      if (!data) {
        console.log("No user info found");
        return null;
      }
      return data;
    } catch (error) {
      console.error("Error loading user info:", error);
      return null;
    }
  },

  // 清除用户信息
  clearUserInfo: async (): Promise<void> => {
    try {
      await storage.remove({ key: USER_INFO_KEY });
      console.log('User info cleared');
    } catch (error) {
      console.error('Error clearing user info:', error);
    }
  },
};

// 导出封装的 storageApi
export default storageApi;
