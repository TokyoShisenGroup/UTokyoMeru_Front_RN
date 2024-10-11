import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


const HeaderUserInfo = ({avatar, username}: {avatar: string, username: string}) => {
    return (
    <View style={styles.container}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.username}>{username}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    username: {
        fontSize: 18,
        color: 'black',
    }
})
export default HeaderUserInfo;
