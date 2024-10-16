import React, {useEffect} from 'react';
import GoodsList from '@/components/homepage/GoodsList';
import ISearchBar from '@/components/homepage/ISearchBar';
import {GoodPropsSimplified} from '@/lib/types';
import {SafeAreaView, Text, View} from 'react-native';
import { useState } from 'react';
import {useGoods} from "@/lib/dataRequest";



function HomeScreen() {

    const {data, error, isLoading} = useGoods() || {}
    if (isLoading){
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }
    else if (error){
        return (
            <SafeAreaView>
                <Text>Error: {error}</Text>
            </SafeAreaView>
        );
    }
    else{
        
    }
    return (
        <SafeAreaView>
            <ISearchBar onSearch={()=>{console.log("Hello")}}/>
            <GoodsList data={data || []} />
        </SafeAreaView>
    );
}

export default HomeScreen;
