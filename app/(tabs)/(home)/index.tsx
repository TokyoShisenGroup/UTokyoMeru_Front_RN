import React from 'react';
import GoodsList from '@/components/homepage/GoodsList';
import ISearchBar from '@/components/homepage/ISearchBar';
import {GoodPropsSimplified} from '@/types';
import { SafeAreaView, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { getGoodsOfHomePage } from '@/api/GoodsApi';

const items: GoodPropsSimplified[] = [
  {
    id: '1',
    title: 'test',
    image: 'https://pic1.zhimg.com/v2-119565438456235a942996a574800eb8_b.jpg',
    price: 9999999.12,
    description:
      'This is a test descriptionqweqweqweqweeweqweqweqweqweqwewqeqewqweqwe',
    user: {
      name: 'brynn',
      avatar:
        'https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
    },
  },
  {
    id: '2',
    title: 'test2',
    image: 'https://picx.zhimg.com/v2-0bdd648c59f9ab3fb91c54933f7b0c21_b.jpg',
    price: 1,
    description: 'This is a test description2',
    user: {
      name: 'brynn',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
  },
  {
    id: '3',
    title: 'test3',
    image: 'https://pic4.zhimg.com/v2-21ac80bdc1a514bd4cd56e880cc55d79_b.jpg',
    price: 100,
    description: 'This is a test description3',
    user: {
      name: 'brynn',
      avatar: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTgxMTc1MTYzM15BMl5BanBnXkFtZTgwNzI5NjMwOTE@._V1_UY256_CR16,0,172,256_AL_.jpg',
    },
  },
  {
    id: '4',
    title: 'test4',
    image:
      'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
    price: 200,
    description: 'This is a test',
    user: {
      name: 'brynn',
      avatar: 'https://uifaces.co/our-content/donated/1H_7AxP0.jpg',
    },
  },
  {
    id: '5',
    title: 'test4',
    image:
      'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
    price: 200,
    description:
      'This is a test description4qweqweq  r erwuheiuwgcrhlewcghjkbkjnhbkhbjghjbgvfhggjhbvgfhjhbgvfhhjgb',
    user: {
      name: 'brynn',
      avatar: 'https://uifaces.co/our-content/donated/1H_7AxP0.jpg',
    },
  },
  {
    id: '6',
    title: 'test4',
    image:
      'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
    price: 200,
    description:
      'This is a test description4qweqweq  r erwuheiuwgcrhlewcghjkbkjnhbkhbjghjbgvfhggjhbvgfhjhbgvfhhjgb',
    user: {
      name: 'brynn',
      avatar: 'https://uifaces.co/our-content/donated/1H_7AxP0.jpg',
    },
  },
  {
    id: '7',
    title: 'test4',
    image:
      'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
    price: 200,
    description:
      'This is a test description4qweqweq  r erwuheiuwgcrhlewcghjkbkjnhbkhbjghjbgvfhggjhbvgfhjhbgvfhhjgb',
    user: {
      name: 'brynn',
      avatar: 'https://uifaces.co/our-content/donated/1H_7AxP0.jpg',
    },
  },
  {
    id: '8',
    title: 'test4',
    image:
      'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
    price: 200,
    description:
      'This is a test description4qweqweq  r erwuheiuwgcrhlewcghjkbkjnhbkhbjghjbgvfhggjhbvgfhjhbgvfhhjgb',
    user: {
      name: 'brynn',
      avatar: 'https://uifaces.co/our-content/donated/1H_7AxP0.jpg',
    },
  },
];

function HomeScreen() {
  // const [goods, setGoods] = useState<GoodPropsSimplified[] | undefined>(undefined);
  // useEffect(() => {
  //   getGoodsOfHomePage().then(setGoods);
  // }, []);

  // if (goods === undefined) {
  //   return (
  //     <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <Text>Loading...</Text>
  //     </SafeAreaView>
  //   )
  // }
  return (
    <SafeAreaView>
      <ISearchBar onSearch={()=>{console.log("Hello")}}/>
      <GoodsList data={items} />
    </SafeAreaView>
  );
}

export default HomeScreen;
