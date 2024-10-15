import React from 'react';
import GoodsList from '@/components/homepage/GoodsList';
import ISearchBar from '@/components/homepage/ISearchBar';
import {GoodPropsSimplified} from '@/types';
import {SafeAreaView, Text, View} from 'react-native';
import { useState, useEffect } from 'react';
import {useGoods} from "@/lib/dataRequest";



function HomeScreen() {
    const goods = useGoods()
    console.log(goods)
    if(goods!=null && goods!=undefined){
        return (
            <SafeAreaView>
                <Text>
                    ${goods.map((key)=>{
                    return key.title
                })}
                </Text>
                <ISearchBar onSearch={()=>{console.log("Hello")}}/>
                <GoodsList uri="goods" />
            </SafeAreaView>
        );
    }
    else{
        return (
            <SafeAreaView>

                <ISearchBar onSearch={()=>{console.log("Hello")}}/>
                <GoodsList uri="goods" />
            </SafeAreaView>
        );    }

}

export default HomeScreen;
