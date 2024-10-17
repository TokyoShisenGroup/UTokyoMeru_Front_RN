import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import Header from '@/components/favolist/Header';
import List from '@/components/favolist/List';
import { useUserBought } from '@/lib/dataRequest';

const BoughtList = () => {
    const {data, error, isLoading} = useUserBought()

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
                <Header title='我买到的' />
            </SafeAreaView>
            <ScrollView style={{marginBottom: 120}}>
                {/*todo：这里应该点击之后进入订单详情页 */}
                <List goods={data || []} />
            </ScrollView>
        </View>
    )
}

export default BoughtList;