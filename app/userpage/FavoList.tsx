import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import Header from '@/components/favolist/Header';
import List from '@/components/favolist/List';
import { useUserFavorites } from '@/lib/dataRequest';

const FavoList = () => {
    const {data, error, isLoading} = useUserFavorites()

    if (error) {
        console.log(error);
        return (
            <SafeAreaView>
                <Text>Error: {error.message}</Text>
            </SafeAreaView>
        )
    }

    if (isLoading) {
        return (
        <SafeAreaView>
            <Text>Loading...</Text>
        </SafeAreaView>
        );
    }

    return (
        <View>
            <SafeAreaView>
                <Header title='我的收藏' />
            </SafeAreaView>
            <ScrollView style={{marginBottom: 120}}>
                <List goods={data || []} />
            </ScrollView>
        </View>
    )
}

export default FavoList;