import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Text, Card} from '@rneui/themed';
import {GoodPropsSimplified} from '../../types';
import {router} from 'expo-router';

interface GoodCardProps {
  item: GoodPropsSimplified;
}

const DynamicImage: React.FC<{uri: string}> = ({uri}) => {
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

const GoodCard: React.FC<GoodCardProps> = ({item}) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => {
          console.log("Pressed card with id:", item.id);
          router.push({
            pathname: "/goodspage/GoodsDetail",
            params: { id: item.id }
          });
        }}>
        <Card containerStyle={styles.card}>
          <DynamicImage uri={item.image} />
          <Text style={styles.description} numberOfLines={3}>
            {item.description}
          </Text>
          <Text style={styles.price}>¥ {item.price}</Text>
          <View style={styles.user}>
            <Image
              style={styles.avatar}
              resizeMode="cover"
              source={{uri: item.user.avatar}}
            />
            <Text style={styles.name}>{item.user.name}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    marginBottom: 10,
  },
  card: {
    padding: 0,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,
  },
  image: {
    width: '100%',
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
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  avatar: {
    width: 15,
    height: 15,
    marginRight: 5,
    marginLeft: 8,
    borderRadius: 50,
  },
  name: {
    fontSize: 10,
    marginBottom: 0,
    color: 'grey',
  },
});

export default GoodCard;
