import React from 'react';
import { SafeAreaView } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';
import {SearchBar} from '@rneui/base';

interface ISearchBarProps {
  onSearch: (query: string) => void;
}

const ISearchBar: React.FC<ISearchBarProps> = ({onSearch}) => {
  const [value, setValue] = React.useState('');

  const handleSearchChange = (newValue: string) => {
    setValue(newValue);
    onSearch(newValue);
  };

  const onCancel = () => {
    setValue('');
    onSearch('');
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
    />
  );
};

export default ISearchBar;
