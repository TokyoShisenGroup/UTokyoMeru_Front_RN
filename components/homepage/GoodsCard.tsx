import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {Text, Card} from '@rneui/themed';
import {ImageProps, ColumnProps, GoodPropsSimplified} from '../../types';
import {router} from 'expo-router'
 
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

const DynamicImage: React.FC<ImageProps> = ({uri}) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  return (
    <Card.Image
      source={{uri}}
      style={[styles.image, {aspectRatio}]}
      resizeMode="cover"
      onLoad={event => {
        const {width, height} = event.nativeEvent.source;
        setAspectRatio(width / height);
      }}
    />
  );
};

const Column: React.FC<ColumnProps> = ({data}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <View key={item.id} style={styles.cardContainer}>
          <TouchableOpacity onPress={() => {
              console.log("Pressed cards")
              router.push("/GoodsDetail")
              }}>
            <Card containerStyle={styles.card}>
              <DynamicImage uri={item.image} />
              <Text style={styles.description} numberOfLines={3}>
                {item.description}
              </Text>
              <Text style={styles.price}>¥ {item.price}</Text>
              <View style={styles.user}>
                <Image
                  style={styles.avater}
                  resizeMode="cover"
                  source={{uri: item.user.avatar}}
                />
                <Text style={styles.name}>{item.user.name}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const GoodsCard: React.FC<ColumnProps> = ({data}) => {
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
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  cardContainer: {
    width: '100%',
    marginBottom: 10,
  },
  card: {
    padding: 0,
    margin: 5,
    borderRadius: 10, // 可根据需要调整边框半径
    overflow: 'hidden', // 确保图片不会超出卡片边界
    flex: 1,
  },
  image: {
    width: '100%',
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  avater: {
    width: 15,
    height: 15,
    marginRight: 5,
    marginLeft: 8,
    borderRadius: 50,
  },
  column: {
    flex: 1,
  },
  description: {
    margin: 10,
    fontSize: 15,
  },
  price: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  name: {
    fontSize: 10,
    marginBottom: 0,
    color: 'grey',
  },
});

export default GoodsCard;
