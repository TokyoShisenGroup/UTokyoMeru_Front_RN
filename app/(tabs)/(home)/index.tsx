import React, {useEffect} from 'react';
import GoodsList from '@/components/homepage/GoodsList';
import ISearchBar from '@/components/homepage/ISearchBar';
import {GoodPropsSimplified} from '@/lib/types';
import {SafeAreaView, Text, View} from 'react-native';
import { useState } from 'react';
import {useGoods} from "@/lib/dataRequest";



function HomeScreen() {
    // useState
    // const [mygoodsinHome, setMygoodsinHome] = useState<GoodPropsSimplified[] | null>(null);
    
    const mygoodsinHome = useGoods()?.mygoods
    // console.log(mygoodsinHome)

    if(mygoodsinHome!=null && mygoodsinHome!=undefined){
        return (
            <SafeAreaView>
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
