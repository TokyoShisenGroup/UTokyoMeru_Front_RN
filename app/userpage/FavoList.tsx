import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import Header from '@/components/favolist/Header';
import List from '@/components/favolist/List';
import useSWR from 'swr';
import axios from 'axios';
import { API_URL } from '@/constants/config';
import storageApi from '@/lib/storageApi';

const fetcher = async (url: string) => {
    const token = await storageApi.getToken();
    console.log(token);
    const res = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    return res.data;
}

const FavoList = () => {
    const {data, error, isLoading} = useSWR(`${API_URL}/user/favolist`, fetcher);

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