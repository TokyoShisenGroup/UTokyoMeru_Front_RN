import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {GoodPropsSimplified} from '../../types';
import GoodCard from './GoodCard';

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
      keyExtractor={item => item.id}
      renderItem={({item}) => <GoodCard item={item} />}
    />
  );
};

const GoodsList: React.FC<{data: GoodPropsSimplified[]}> = ({data}) => {
  const {leftColumn, rightColumn} = splitDataIntoColumns(data);
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
