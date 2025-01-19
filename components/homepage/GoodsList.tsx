import React, { useEffect, useState } from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {GoodPropsSimplified} from '../../lib/types';
import GoodCard from './GoodCard';
import axios from 'axios';
import { API_URL } from '@/constants/config';
import { useGoods } from '@/lib/dataRequest';
import ISearchBar from './ISearchBar';

const splitDataIntoColumns = (data: GoodPropsSimplified[]) => {
  const leftColumn: GoodPropsSimplified[] = [];
  const rightColumn: GoodPropsSimplified[] = [];

  data.forEach((item, index) => {
    if (index % 2 === 0) {
      leftColumn.push(item);
    } else {
      rightColumn.push(item);
    }
  });

  return {leftColumn, rightColumn};
};

const Column: React.FC<{data: GoodPropsSimplified[]}> = ({data}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.good_id}
      renderItem={({item}) => <GoodCard item={item} />}
    />
  );
};

const GoodsList: React.FC<{data: GoodPropsSimplified[]}> = ({data}) => {
  const [dataFromAPI, setDataFromAPI] = useState<GoodPropsSimplified[]>(data || []);
  const [refreshing, setRefreshing] = useState(false);
  const {leftColumn: l, rightColumn: r} = splitDataIntoColumns(dataFromAPI || []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await axios.get(`${API_URL}/goods`);
      setDataFromAPI(response.data);
    } catch (error) {
      console.error('刷新数据时出错:', error);
    } finally {
      setRefreshing(false);
      console.log('刷新完成');
    }
  };

  return (
    <>
    <ISearchBar setData={setDataFromAPI} data={data}/>
    <FlatList
      data={[{key: 'columns'}]}
      keyExtractor={item => item.key}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      renderItem={() => (
        <View style={styles.container}>
          <View style={styles.column}>
            <Column data={l} />
          </View>
          <View style={styles.column}>
            <Column data={r} />
          </View>
        </View>
      )}
      onEndReached={() => {
        console.log('onEndReached');
      }}
    />
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  column: {
    flex: 1,
    marginBottom: '18%',
  },
});

export default GoodsList;
