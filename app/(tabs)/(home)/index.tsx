import React from 'react';
import GoodsList from '@/components/homepage/GoodsList';
import {SafeAreaView, Text, View} from 'react-native';
import {useGoods, swrConfig} from "@/lib/dataRequest";
import {GoodPropsSimplified} from '@/lib/types';

function HomeScreen() {
    const {data, error, isLoading} = useGoods(swrConfig);

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
