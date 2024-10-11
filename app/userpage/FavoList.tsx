import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import Header from '@/components/favolist/Header';
import List from '@/components/favolist/List';
import useSWR from 'swr';
import axios from 'axios';
import { API_URL } from '@/constants/config';

const fetcher = async (url: string) => {
    const res = await axios.get(url);
    return res.data;
}

const FavoList = () => {
    const {data, error, isLoading} = useSWR(`${API_URL}/goods`, fetcher);

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
        <SafeAreaView>
            <Header title='我的收藏' />
            <List goods={data} />
        </SafeAreaView>
    )
}

export default FavoList;