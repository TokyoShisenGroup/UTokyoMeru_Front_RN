import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Text, Card} from '@rneui/themed';
import {GoodPropsSimplified} from '../../lib/types';
import {router} from 'expo-router';
import FastImage from 'react-native-fast-image';


interface GoodCardProps {
  item: GoodPropsSimplified;
}

const DynamicImage: React.FC<{uri: string}> = ({uri}) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  // console.log(uri);
  return (
    <Card.Image
      source={{uri}}
      style={[styles.image, {aspectRatio}]}
      resizeMode="cover"
      onLoad={event => {
        const {width, height} = event.nativeEvent.source;
        setAspectRatio(width / height);
      }}
      onError={() => {
        console.log("Error loading image");
      }}
    />
  );
};

const GoodCard: React.FC<GoodCardProps> = ({item}) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => {
          console.log("Pressed card with id:", item.good_id);
          router.push({
            pathname: "/goodspage/GoodsDetail",
            params: { id: item.good_id }
          });
        }}>
        <Card containerStyle={styles.card}>
          <DynamicImage uri={item.images[0]} />
          <Text style={styles.description} numberOfLines={3}>
            {item.description}
          </Text>
          <Text style={styles.price}>¥ {item.price}</Text>
          <View style={styles.user}>
            <Image
              style={styles.avatar}
              resizeMode="cover"
              source={{uri: item.user?.Avatar ||"https://pic.616pic.com/ys_img/00/06/27/5m1AgeRLf3.jpg"}}
            />
            <Text style={styles.name}>{item.user?.Name||"匿名"}</Text>
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
    marginRight: 3,
    marginLeft: 3,
    marginTop: 0,
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1,
  },
  image: {
    width: '100%',
    height: undefined,
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
