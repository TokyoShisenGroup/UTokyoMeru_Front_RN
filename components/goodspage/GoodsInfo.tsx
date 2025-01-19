import { View, Text, Button, StyleSheet } from 'react-native';
import {GoodProps} from '@/lib/types';
import UserCard from '@/components/goodspage/UserCard';
import Tag from '@/components/goodspage/Tag';
import ButtonSheets from '@/components/goodspage/ButtonSheets';
const GoodsInfo: React.FC<GoodProps> = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.currencySymbol}>¥</Text>
                <Text style={styles.price}>{props.price}</Text>
                <Text style={styles.lastUpdate}>最后更新：1分前</Text>
            </View>
            <ButtonSheets />
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>商品详情</Text>
                <Text style={styles.description}>{props.description}</Text>
            </View>
            <View style={styles.tagsContainer}>
                {props.tags?.map((tag, index) => (
                    <Tag 
                    key={index} 
                    text={tag} 
                    onPress={() => {console.log(tag,"pressed")}}
                    />
                ))}
            </View>
            <UserCard {...props.user} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 14,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    currencySymbol: {
        fontSize: 20,
        marginTop: 10,
        color: 'grey',
    },
    price: {
        fontSize: 32,
    },
    lastUpdate: {
        fontSize: 10,
        color: 'grey',
        marginTop: 20,
        marginLeft: 10,
    },
    descriptionContainer: {
        paddingTop: 10,
        marginBottom: 10,
        borderTopWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
    },
    descriptionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,  
    },
    description: {
        fontSize: 16,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 12,
        marginBottom: 12,
    },
});

export default GoodsInfo;