import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { GoodPropsSimplified } from '@/lib/types';
import { ListItem, Avatar } from 'react-native-elements';
import { router } from 'expo-router';
interface ListProps {
    goods: GoodPropsSimplified[];
}

const List: React.FC<ListProps> = ({ goods }) => {
    console.log(goods);
    return (
        <ScrollView>
            {goods.map((good) => (
                <TouchableOpacity key={good.good_id} onPress={() => {
                    router.push({
                        pathname: "/goodspage/GoodsDetail",
                        params: { id: good.good_id }
                    });
                }}>
                    <ListItem bottomDivider>
                        <View style={styles.imageContainer}>
                        <Image source={{ uri: good.images[0] }} style={styles.image} />
                    </View>
                    <ListItem.Content>
                        <ListItem.Title style={styles.title}>{good.title}</ListItem.Title>
                        <View style={styles.priceContainer}>
                            <ListItem.Subtitle style={styles.mark}>¥</ListItem.Subtitle>
                            <ListItem.Subtitle style={styles.price}>{good.price}</ListItem.Subtitle>
                        </View>
                        <View style={styles.user}>
                            <Image style={styles.avatar} source={{ uri: good.user?.Avatar || "https://pic.616pic.com/ys_img/00/06/27/5m1AgeRLf3.jpg" }} />
                            <Text style={styles.name}>{good.user?.Name}</Text>
                        </View>
                    </ListItem.Content>
                    </ListItem>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        marginLeft: 10
    },
    image: {
        width: 100, 
        height: 100,
        borderRadius: 10
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    price: {
        marginTop: 5,
        fontSize: 20,
        color: 'red'
    },
    mark: {
        fontSize: 14,
        color: 'red',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    name: {
        marginLeft: 5,
        fontSize: 14,
        color: '#666'
    },
    avatar: {
        width: 18,
        height: 18,
        borderRadius: 9
    }
})

export default List;