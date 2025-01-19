import React from 'react';
import GoodsList from '@/components/homepage/GoodsList';
import {SafeAreaView, Text, View} from 'react-native';
import {useGoods} from "@/lib/dataRequest";
import {GoodPropsSimplified} from '@/lib/types';

function HomeScreen() {
    const {data, error, isLoading} = useGoods({
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshInterval: 30000,
        dedupingInterval: 5000,
    });

    if (isLoading){
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }
    
    return (
        <SafeAreaView>
            <GoodsList data={data as GoodPropsSimplified[]} />
        </SafeAreaView>
    );
}

export default HomeScreen;
