import React, {useEffect} from 'react';
import GoodsList from '@/components/homepage/GoodsList';
import ISearchBar from '@/components/homepage/ISearchBar';
import {GoodPropsSimplified} from '@/lib/types';
import {SafeAreaView, Text, View} from 'react-native';
import { useState, useEffect } from 'react';
import {useGoods} from "@/lib/dataRequest";



function HomeScreen() {
    // useState
    const [mygoodsinHome, setMygoodsinHome] = useState<GoodPropsSimplified[] | null>(null);
    useEffect(() => {
        const getGoods = async () => {
            var homegoods = await useGoods();
            if (homegoods == undefined) {
                console.log("数据无定义")
                return
            }
            setMygoodsinHome({
                good_id: homegoods.mygoods[0].good_id,
                title: homegoods.mygoods[0].title,
                // images: homegoods.mygoods[0].images,
                price: homegoods.mygoods[0].price,
                // description: homegoods.mygoods[0].description,
                // user: homegoods.mygoods[0].user
            })
        }
    }, []);
    console.log(mygoodsinHome)
    if(mygoodsinHome!=null && mygoodsinHome!=undefined){
        return (
            <SafeAreaView>
                <Text>
                    ${mygoodsinHome.map((key)=>{
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
