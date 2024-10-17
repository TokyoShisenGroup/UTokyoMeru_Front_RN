import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useUserGoodsSummary } from "@/lib/dataRequest";

const GoodsSummary = () => {

    const {data, error, isLoading} = useUserGoodsSummary() || {}

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/userpage/SaleList')}>
                <Text style={styles.number}>{data?.sale_number}</Text>
                <Text style={styles.text}>我发布的</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/userpage/SoldList')}>
                <Text style={styles.number}>{data?.sold_number}</Text>
                <Text style={styles.text}>我卖出的</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/userpage/BoughtList')}>
                <Text style={styles.number}>{data?.buy_number}</Text>
                <Text style={styles.text}>我买到的</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/userpage/FavoList')}>
                <Text style={styles.number}>{data?.favor_number}</Text>
                <Text style={styles.text}>我收藏的</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    number: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 7,
    },
    text: {
        fontSize: 16,
    }
})

export default GoodsSummary