import { View, Image, Dimensions, StyleSheet } from 'react-native';
import React from 'react';

import GoodsSlides from '@/components/homepage/GoodsSlides';
import { GoodProps } from '@/types';

const items: GoodProps = {
    id: '1',
    name: 'test',
    image: 'https://pic1.zhimg.com/v2-119565438456235a942996a574800eb8_b.jpg',
    images: ['https://pic1.zhimg.com/v2-119565438456235a942996a574800eb8_b.jpg', 'https://picx.zhimg.com/v2-0bdd648c59f9ab3fb91c54933f7b0c21_b.jpg'],
    price: 9999999.12,
    description:
        'This is a test descriptionqweqweqweqweeweqweqweqweqweqwewqeqewqweqwe',
    user: {
        name: 'brynn',
        avatar:
            'https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
    },
}


const GoodsDetail: React.FC<GoodProps> = (props) => {
    return (
        <>
            <GoodsSlides {...items} />
        </>
    )
}
 

export default GoodsDetail