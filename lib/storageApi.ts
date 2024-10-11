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

  // 清除所有数据
  clearAll: async (): Promise<void> => {
    try {
      await storageApi.save("token", "");
      await storageApi.save("usermailaddress", "");
      await storageApi.save("username", "");

      console.log('All data cleared.');
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
    await storageApi.init();
  },

  getToken: async (): Promise<string | null> => {
    if (await storageApi.load("token") === "") {
      console.log("token not found");
      return "";
    }
    await storageApi.init();
    return await storageApi.load("token");
  },
  getUserMailaddress: async (): Promise<string | null> => {
    if (await storageApi.load("usermailaddress") === "") {
      console.log("usermailaddress not found");
      return "";
    }
    await storageApi.init();
    return await storageApi.load("usermailaddress");
  },
  getUserName: async (): Promise<string | null> => {
    if (await storageApi.load("username") === "") {
      console.log("username not found");
      return "";
    }
    await storageApi.init();
    return await storageApi.load("username");
  },
  getUserId: async (): Promise<string | null> => {
    if (await storageApi.load("userid") === "") {
      console.log("userid not found");
      return "";
    }
    await storageApi.init();
    return await storageApi.load("userid");
  },
  saveToken: async (token: string): Promise<void> => {
    await storageApi.save("token", token);
    await storageApi.init();
  },
  saveUserMailaddress: async (User_Mailaddress: string): Promise<void> => {
    await storageApi.save("usermailaddress", User_Mailaddress);
    await storageApi.init();
  },
  saveUserName: async (User_Name: string): Promise<void> => {
    await storageApi.save("username", User_Name);
    await storageApi.init();
  },
  saveUserId: async (User_Id: string): Promise<void> => {
    await storageApi.save("userid", User_Id);
    console.log("用户的id是", User_Id);
    await storageApi.init();
  }
};

// 导出封装的 storageApi
export default storageApi;
