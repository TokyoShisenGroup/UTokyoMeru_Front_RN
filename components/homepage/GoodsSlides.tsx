import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { GoodProps } from '@/types';

const { width: screenWidth } = Dimensions.get('window');

const GoodsSlides: React.FC<GoodProps> = (props) => {
  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item }} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={props.images}
        renderItem={renderItem}
        width={screenWidth}
        height={screenWidth / 2}
        loop={false}
        autoPlay={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width: screenWidth,
    height: screenWidth / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default GoodsSlides;