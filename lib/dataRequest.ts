import useSWR from 'swr';
import {API_URL} from "@/constants/config";
import storageApi from './storageApi';
import { GoodPropsSimplified } from '@/lib/types';
import { GoodProps } from './types';
/**
 * Good
 */


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
const fetcher = <T>(url: string, token: string, options?: RequestInit): Promise<T> => {
    // 如果没有自定义 headers，就初始化为一个空对象
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
export const useFetch = <T>(url: string, token: string, options?: RequestInit) => {
    
    const { data, error, isLoading } = useSWR<T>(
        url,
        () => fetcher<T>(url, token, options)
    );

    return {
        data,
        error,
        isLoading
    };
};


export const useGoods = async () => {
    const token = await storageApi.getToken();
    if (token == null) {
        console.log("token 无定义")
        return
    }
    const {data, error, isLoading} = useFetch<GoodPropsSimplified[]>(`${API_URL}/goods`,token);
    if (data == undefined) {
        console.log("数据无定义")
        return
    }
    console.log(data)
    const mygoods= data.map((item: any) => ({
        good_id: item.good_id,
        title: item.title,
        price: item.price,
        owener_name: item.user.Name,

    }));
    return {mygoods, error, isLoading};
}


export const useUsers = async () => {
    const token = await storageApi.getToken();
    if (token == null) {
        console.log("token 无定义")
        return
    }
    const {data, error, isLoading} = useFetch<User[]>(`${API_URL}/users`,token);
    if (data == undefined) {
        console.log("数据无定义")
        return
    }
    console.log(data)
    const myusers= data.map((item: any) => ({
        id: item.Id,
        name: item.name,
        email: item.mail_address,
    }));
    return {myusers, error, isLoading};
}




export const useSpecificGoods = async (good_id: number) => {
    const token = await storageApi.getToken();
    if (token == null) {
        console.log("token 无定义")
        return
    }
    const {data, error, isLoading} = useFetch<GoodPropsSimplified>(`${API_URL}/goods/${good_id}`,token);
    if (data == undefined) {
        console.log("数据无定义")
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

export const useSpecificUser = async (user_id: number) => {
    const token = await storageApi.getToken();
    if (token == null) {
        console.log("token 无定义")
        return
    }
    const {data, error, isLoading} = useFetch<User>(`${API_URL}/admin/users/${user_id}`,token);
    if (data == undefined) {
        console.log("数据无定义")
        return
    }
    const myuser = {
        id: data.id,
        name: data.name,
        email: data.mail_address,
    }
    return {myuser, error, isLoading};
}

export const useSearchGoods = async (keyword: string) => {
    const token = await storageApi.getToken();
    if (token == null) {
        console.log("token 无定义")
        return
    }
    const {data, error, isLoading} = useFetch<GoodPropsSimplified[]>(`${API_URL}/goods/search?keyword=${keyword}`,token);
    if (data == undefined) {
        console.log("数据无定义")
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
