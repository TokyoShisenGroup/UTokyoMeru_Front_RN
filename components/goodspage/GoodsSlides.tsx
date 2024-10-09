import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { GoodProps } from '@/types';

const GoodsSlides: React.FC<GoodProps> = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    setImagesLoaded(new Array(props.images.length).fill(false));
  }, [props.images]);

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const openModal = (image: string) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        showsPagination={true}
        loop={true}
        autoplay={false}
        onIndexChanged={(index) => setCurrentIndex(index)}
        loadMinimal={true}
        loadMinimalSize={1}
      >
        {props.images.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => openModal(image)} style={styles.slide}>
            {!imagesLoaded[index] && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}
            <Image
              source={{ uri: image }}
              style={[styles.image, !imagesLoaded[index] && styles.hiddenImage]}
              onLoad={() => handleImageLoad(index)}
            />
          </TouchableOpacity>
        ))}
      </Swiper>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalContainer} 
          activeOpacity={1} 
          onPress={() => setModalVisible(false)}
        >
          <Image
            source={{ uri: selectedImage }}
            style={styles.modalImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: '100%',
    resizeMode: 'cover',
  },
  hiddenImage: {
    opacity: 0,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  modalImage: {
    width: width,
    height: height,
  },
});

export default GoodsSlides;
