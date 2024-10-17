import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '@/components/favolist/Header';
import List from '@/components/favolist/List';
import { useUserSales } from '@/lib/dataRequest';
import storageApi from '@/lib/storageApi';


const SaleList = () => {
    const [id, setId] = useState<number | undefined>(undefined);
    useEffect(()=>{
        const fetchID = async () => {
            const id = await storageApi.getUserId();
            setId(id);
        }
        fetchID();
    },[])


    const {data, error, isLoading} = useUserSales(id?.toString() || '')

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
                <Header title='我发布的' />
            </SafeAreaView>
            <ScrollView style={{marginBottom: 120}}>
                <List goods={data || []} />
            </ScrollView>
        </View>
    )
}

export default SaleList;