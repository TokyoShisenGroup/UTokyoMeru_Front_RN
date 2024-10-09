import React, { useEffect, useState } from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {GoodPropsSimplified} from '../../types';
import GoodCard from './GoodCard';
import axios from 'axios';
import { API_URL } from '@/constants/config';

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

const GoodsList = () => {
  const {leftColumn: l, rightColumn: r} = splitDataIntoColumns([]);

  const [leftColumn, setLeftColumn] = useState<GoodPropsSimplified[]>(l);
  const [rightColumn, setRightColumn] = useState<GoodPropsSimplified[]>(r);


  const fetchMoreGoods = async () => {
    try {
      const response = await axios.get(`${API_URL}/goods`);
      const {leftColumn: l, rightColumn: r} = splitDataIntoColumns(response.data);
      setLeftColumn(l);
      setRightColumn(r);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  useEffect(() => {
    fetchMoreGoods();
    console.log("GoodsList rendered", leftColumn[0]);
  }, []);

  return (
    <FlatList
      data={[{key: 'columns'}]}
      keyExtractor={item => item.key}
      renderItem={() => (
        <View style={styles.container}>
          <View style={styles.column}>
            <Column data={leftColumn} />
          </View>
          <View style={styles.column}>
            <Column data={rightColumn} />
          </View>
        </View>
      )}
      onEndReached={() => {
        console.log('onEndReached');
      }}
    />
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
