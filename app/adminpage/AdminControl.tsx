import { API_URL } from '@/constants/config';
import { useGoods, useSpecificGoods, useUsersAdmin } from '@/lib/dataRequest';
import { useSpecificUserAdmin } from '@/lib/dataRequest';
import storageApi from '@/lib/storageApi';
import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  FlatList, Alert, ActivityIndicator,
} from 'react-native';
import useSWR, { mutate } from 'swr';

// Define types for users and goods
type AdminUser = {
  id: string;
  name: string;
  email: string;
};

type AdminGoods = {
  good_id: string;
  title: string;
  price: number;
  owener_name: string;
};

// Fetcher function
const fetcher = async (url: string) => {
  try {
    const token = await storageApi.getToken();
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('网络请求失败', error);
    throw error;
  }
};

// Function to fetch users
const getUsers = async () => {
  const response = await fetcher(`${API_URL}/admin/users`);
  const users = response.data;
  const myusers: AdminUser[] = users.map((item: any) => ({
    id: item.ID,
    name: item.Name,
    email: item.MailAddress,
  }));
  return myusers;
};

// Function to fetch goods
const getGoods = async () => {
  const response = await fetcher(`${API_URL}/goods`).catch((error) => {
    console.error('获取商品失败：', error);
    return [];
  });
  const mygoods: AdminGoods[] = response.map((item: any) => ({
    good_id: item.good_id,
    title: item.title,
    price: item.price,
    owener_name: item.user.Name,
  }));
  return mygoods;
};

const AdminControl: React.FC = () => {
  const fetchedUsers =  useUsersAdmin();
  const fetchedGoods =  useGoods();
  console.log(fetchedUsers)
  // Fetch data on mount

  // Function to delete a user
  const deleteUser = async (userId: string) => {
    try {
      await fetch(`${API_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${await storageApi.getToken()}`,
        },
      });

      Alert.alert('成功', '用户已封禁');
    } catch (error) {
      console.error('封禁用户失败：', error);
      Alert.alert('错误', '无法封禁用户');
    }
  };

  // Function to delete a goods item
  const deleteGoods = async (goodsId: string) => {
    try {
      await fetch(`${API_URL}/goods/${goodsId}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${await storageApi.getToken()}`,
        },
      });

      Alert.alert('成功', '商品已删除');
      mutate(`${API_URL}/goods`); // Revalidate data after deletion
    } catch (error) {
      console.error('删除商品失败：', error);
      Alert.alert('错误', '无法删除商品');
    }
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>用户管理</Text>
      <FlatList
        data={fetchedUsers?.myusers || []}
        keyExtractor={(item) => `user-${item.id}`}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.name} ({item.email})</Text>
            <TouchableOpacity onPress={() => deleteUser(item.id)}>
              <Text style={styles.deleteText}>删除</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>暂无用户数据</Text>}
      />

      <Text style={styles.sectionTitle}>商品管理</Text>
      <FlatList
        data={fetchedGoods?.mygoods || []}
        keyExtractor={(item) => `goods-${item.good_id}`}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.good_id} - {item.title} - ￥{item.price} - {item.user.Name}</Text>
            <TouchableOpacity onPress={() => deleteGoods(item.good_id)}>
              <Text style={styles.deleteText}>删除</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>暂无商品数据</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
  },
  deleteText: {
    color: 'red',
  },
});

export default AdminControl;