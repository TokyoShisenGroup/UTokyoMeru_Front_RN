import useSWR from 'swr';
import {API_URL} from "@/constants/config";
import storageApi from './storageApi';
import { GoodPropsSimplified, ResponseForGetGoodsHomePage } from '@/lib/types';
import { GoodProps } from './types';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import SMMSApiClient from './imageApi';
import axios from 'axios';
import useSWRImmutable from 'swr/immutable';

/**
 * Good
 */
const APITOKEN = "1p4sVu5JstjtNfFh4lpQsqFtlgiS1DLa"
const smmsClient = new SMMSApiClient(APITOKEN);

export interface User {
    Avatar: string;
    Name: string;
}

/**
 * User
 */
export interface User {
    /**
     * url
     */
    avatar: null | string;
    birthday: null | string;
    created_at: string;
    deleted_at: null | string;
    gender: null | string;
    /**
     * ID
     */
    id: number;
    is_banned: boolean;
    is_deleted: boolean;
    mail_address: string;
    mail_code: null | string;
    name: string;
    /**
     * md5
     */
    password: string;
    phone_number: null | string;
    rating: number;
    rating_count: number;
    token: null | string;
    updated_at: null | string;
    user_class: string;
}

// 定义通用的 fetcher 函数，支持自定义请求选项
const fetcher = async<T>(url: string,  options?: RequestInit): Promise<T> => {
    // 如果没有自定义 headers，就初始化为一个空对象
    const token = await storageApi.getToken();
    if (token == null) {
        throw new Error("token 无定义")
    }
    const headers = options?.headers || {};

    // 在 headers 中添加 Authorization 头，将 token 传递
    const updatedOptions: RequestInit = {
        ...options,
        headers: {
            ...headers,
            'Authorization': `Bearer ${token}`, // 使用 Bearer Token 方式
        }
    };

    // 使用更新后的选项发起请求
    return fetch(url, updatedOptions).then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    });
};

// 修改 useFetch 钩子，允许传入请求选项
export const useFetch = <T>(url: string, options?: RequestInit) => {

    const { data, error, isLoading } = useSWRImmutable<T>(
        url,
        () => fetcher<T>(url, options),
        {
            refreshInterval: 120000,
            revalidateOnFocus: true, // 页面获得焦点时刷新
            revalidateOnReconnect: true, // 网络重新连接时刷新
        }
    );

    return {
        data,
        error,
        isLoading
    };
};


export const useGoods =  () => {

    const {data, error, isLoading} = useFetch<GoodPropsSimplified[]>(`${API_URL}/goods`);
    return {data, error, isLoading};
}


export const useUserSales =  (user_id: string) => {

  const {data, error, isLoading} = useFetch<GoodPropsSimplified[]>(`${API_URL}/user/sales?user_id=${user_id}`);
  return {data, error, isLoading};
}

export const useUserFavorites =  () => {

  const {data, error, isLoading} = useFetch<GoodPropsSimplified[]>(`${API_URL}/user/favolist`);
  return {data, error, isLoading};
}

type adminUsersProps = {
    id: number,
    name: string,
    email: string,
}

export const useUsers =  () => {

    const {data, error, isLoading} = useFetch<any>(`${API_URL}/admin/users`);
    if (data == undefined) {
        throw new Error("no data")
        return
    }
    var myusers: adminUsersProps[] = []
    const userlist: any[]= data.data
    userlist.forEach((item: any) => {
        myusers.push({
            id: item.ID,
            name: item.Name,
            email: item.MailAddress,
        })
    })
    // const myusers= data.data.map((item: any) => ({
    //     id: item.Id,
    //     name: item.name,
    //     email: item.mail_address,
    // }));
    return {myusers, error, isLoading};
}




export const useSpecificGoods =  (good_id: number) => {

    const {data, error, isLoading} = useFetch<GoodPropsSimplified>(`${API_URL}/goods/${good_id}`);
    if (data == undefined) {
        throw new Error("no data")
        return
    }
    const mygood = {
        good_id: data.good_id,
        title: data.title,
        price: data.price,
        owener_name: data.user.Name,
    }
    return {mygood, error, isLoading};
}

export const useSpecificUser =  (user_id: number) => {
    const {data, error, isLoading} = useFetch<User>(`${API_URL}/admin/users/${user_id}`);
    if (data == undefined) {
        throw new Error("no data")
        return
    }
    const myuser = {
        id: data.id,
        name: data.name,
        email: data.mail_address,
    }
    return {myuser, error, isLoading};
}

export const useSearchGoods =  (keyword: string) => {
    const {data, error, isLoading} = useFetch<GoodPropsSimplified[]>(`${API_URL}/goods/search?keyword=${keyword}`);
    if (data == undefined) {
        throw new Error("no data")
        return
    }
    const searchgoods = data.map((item: any) => ({
        good_id: item.good_id,
        title: item.title,
        price: item.price,
        owener_name: item.user.Name,
    }));
    return {searchgoods, error, isLoading};
}

type goodsData = {
    buy_number: number;
    sale_number: number;
    favor_number: number;
    sold_number: number;
}

export const useUserGoodsSummary = () => {
    const {data, error, isLoading} = useFetch<goodsData>(`${API_URL}/user/data`);
    return {data, error, isLoading};
}

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
      const compressedUri = await compressImage(uri);

      // 使用 SMMSApiClient 上传图片
      const uploadData = await smmsClient.uploadImage(compressedUri);

      console.log('上传成功：', uploadData);
      console.log(typeof uploadData)
      // 返回图片的 URL
      if(uploadData.data != undefined)
        return uploadData.data.url;
      else if ((uploadData as any).images !== undefined) {
        return (uploadData as any).images as string;
      }
    } catch (error) {
      console.error('图片上传错误：', error);
      throw error;
    }
  };

  const uploadImages = async (images: string[]) => {
    const uploadedUrls = [];
    for (const image of images) {
      const url = await uploadImage(image);
      console.log("插入数组的地址 ",url)
      uploadedUrls.push(url);
    }
    return uploadedUrls;
  };



type FormData = {
    title: string;
    description: string;
    price: number;
    tags: string[];
    // tagInput: string;
    // images: string[];
    seller_id: string;
    is_invisible: boolean;
    is_deleted: boolean;
    is_bought: boolean;
  };

  export const useSellItemAPI = async (postData: FormData, images: string[]) => {
    try {
      const uploadedImageUrls = await uploadImages(images);
  
      const toUploadData = {
        ...postData,
        images: uploadedImageUrls,
      };
  
      const token = await storageApi.getToken();
      if (!token) {
        console.error("Token 无定义");
        return;
      }
  
      const response = await axios.post(`${API_URL}/goods/`, toUploadData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("商品发布成功", response.data);
      return response.data;
    } catch (error) {
      console.error("提交商品信息时出错：", error);
      throw error;
    }
  };