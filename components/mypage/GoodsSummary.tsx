import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const GoodsSummary = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => console.log('我发布的')}>
                <Text style={styles.number}>0</Text>
                <Text style={styles.text}>我发布的</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => console.log('我卖出的')}>
                <Text style={styles.number}>0</Text>
                <Text style={styles.text}>我卖出的</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => console.log('我买到的')}>
                <Text style={styles.number}>0</Text>
                <Text style={styles.text}>我买到的</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => console.log('我收藏的')}>
                <Text style={styles.number}>0</Text>
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