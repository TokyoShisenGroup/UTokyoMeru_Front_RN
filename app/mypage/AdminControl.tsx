import { API_URL } from '@/constants/config';
import storageApi, { TOKEN_KEY } from '@/lib/storageApi';
import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SectionList, Alert, ActivityIndicator,
} from 'react-native';

const TestButton = () => {
  storageApi.init();
  const { user, isError, isLoading } = useUser();
  // console.log(user);

  return (
    <View>
      <Text>"abc"</Text>
    </View>
  );
};

// 使用 fetch 发起请求
const fetcher = async (url: string) => {
  try {
    console.log(`Bearer ${TOKEN_KEY}`)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${TOKEN_KEY}`, // 设置 Authorization 头
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('响应数据: ', data);
    return data;
  } catch (error) {
    console.error('网络请求失败', error);
    throw new Error('网络请求失败');
  }
};

function useUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetcher(`${API_URL}/admin/users/`);
        setUser(data);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // 空依赖数组确保只在初始渲染时调用

  return {
    user,
    isLoading,
    isError,
  };
}

// 定义类型
type User = {
  id: string;
  name: string;
  email: string;
};

type Goods = {
  id: string;
  title: string;
  price: number;
};

type SectionData = {
  title: string;
  data: (User | Goods)[];
};

const AdminControl: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [goods, setGoods] = useState<Goods[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [loadingGoods, setLoadingGoods] = useState<boolean>(false);

  useEffect(() => {
    // 调用获取数据的函数
    fetchUsers();
    fetchGoods();
  }, []);

  // 获取用户数据
  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);

      // 示例数据
      const exampleUsers: User[] = [
        { id: '1', name: '用户一', email: 'user1@example.com' },
        { id: '2', name: '用户二', email: 'user2@example.com' },
      ];
      setUsers(exampleUsers);
    } catch (error) {
      console.error('获取用户列表失败：', error);
      Alert.alert('错误', '无法获取用户列表');
    } finally {
      setLoadingUsers(false);
    }
  };

  // 获取商品数据
  const fetchGoods = async () => {
    try {
      setLoadingGoods(true);

      // 示例数据
      const exampleGoods: Goods[] = [
        { id: '1', title: '商品一', price: 100 },
        { id: '2', title: '商品二', price: 200 },
      ];
      setGoods(exampleGoods);
    } catch (error) {
      console.error('获取商品列表失败：', error);
      Alert.alert('错误', '无法获取商品列表');
    } finally {
      setLoadingGoods(false);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      // 删除用户逻辑
      Alert.alert('成功', '用户已删除');
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('删除用户失败：', error);
      Alert.alert('错误', '无法删除用户');
    }
  };

  const deleteGoods = async (goodsId: string) => {
    try {
      // 删除商品逻辑
      Alert.alert('成功', '商品已删除');
      setGoods((prevGoods) => prevGoods.filter((goods) => goods.id !== goodsId));
    } catch (error) {
      console.error('删除商品失败：', error);
      Alert.alert('错误', '无法删除商品');
    }
  };

  // 组合 SectionList 数据
  const sections: SectionData[] = [
    {
      title: '用户管理',
      data: users,
    },
    {
      title: '商品管理',
      data: goods,
    },
  ];

  const renderItem = ({ item }: { item: User | Goods }) => {
    if ('email' in item) {
      // 用户项
      return (
        <View style={styles.itemContainer}>
          <Text>{item.name} ({item.email})</Text>
          <TouchableOpacity onPress={() => deleteUser(item.id)}>
            <Text style={styles.deleteText}>删除</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      // 商品项
      return (
        <View style={styles.itemContainer}>
          <Text>{item.title} - ￥{item.price}</Text>
          <TouchableOpacity onPress={() => deleteGoods(item.id)}>
            <Text style={styles.deleteText}>删除</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const renderSectionHeader = ({ section }: { section: SectionData }) => (
    <Text style={styles.sectionTitle}>{section.title}</Text>
  );

  return (
    <View style={styles.container}>
      <TestButton />
      {(loadingUsers || loadingGoods) ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          ListEmptyComponent={<Text>暂无数据</Text>}
        />
      )}
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