import React from 'react';
import { StyleSheet} from 'react-native'; 
import {Header} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import {SearchBar} from '@rneui/base';
import { GoodPropsSimplified } from '@/lib/types';
import { useGoods } from '@/lib/dataRequest';

interface ISearchBarProps {
  setData: (query: GoodPropsSimplified[]) => void;
  data: GoodPropsSimplified[];
}


const searchGoodsFromString = (query: string, data: GoodPropsSimplified[]) => {
  return data.filter((item) => item.description.includes(query) || item.title.includes(query));
}

const ISearchBar: React.FC<ISearchBarProps> = ({setData, data}) => {
  const [value, setValue] = React.useState('');

  const handleSearchChange = (newValue: string) => {
    setValue(newValue);
    setData(searchGoodsFromString(newValue, data || []));
  };

  const onCancel = () => {
    setValue('');
    setData(data);
  };

  return (
      <SearchBar
          platform='ios'
          value={value}
          onChangeText={handleSearchChange}
          onCancel={onCancel}
          placeholder="寻找你想要的..."
          placeholderTextColor="#888"
          cancelButtonTitle="取消"
          searchIcon={<Ionicons name="search" size={24} color="gray" />}
          containerStyle={{paddingBottom: 10}}
      />
  )
}

export default ISearchBar;