import { View, Text, Button, StyleSheet } from 'react-native';
import {GoodProps} from '@/types';


const GoodsInfo: React.FC<GoodProps> = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>{props.price}</Text>
            <Text style={styles.description}>{props.description}</Text>
            <Text>{props.tags.join(', ')}</Text>
            <Text>UserInfo</Text>
            <Button title="想要" />
            <Button title="购入" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 32,
    },
    description: {
        fontSize: 18,
    }
});

export default GoodsInfo;