import { View, Image, Dimensions, StyleSheet, Text, Button, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import GoodsSlides from '@/components/goodspage/GoodsSlides';
import GoodsInfo from '@/components/goodspage/GoodsInfo';
import Footer from '@/components/goodspage/Footer';
import { GoodProps } from '@/lib/types';
import { useLocalSearchParams, router} from 'expo-router';
import Header from '@/components/goodspage/Header';
import {API_URL} from '@/constants/config';

const fetchGoodsDetail = async (id: string) => {
    const response = await axios.get(`${API_URL}/goods/${id}`);
    return response.data;
};

function GoodsDetail() {
    const [item, setItem] = useState<GoodProps | null>(null);
    const [error, setError] = useState<string | null>(null);
    const {id} = useLocalSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('请求超时')), 10000); // 10秒超时
            });

            try {
                const result = await Promise.race([
                    fetchGoodsDetail(id as string), // 假设这是你的数据获取函数
                    timeoutPromise
                ]);
                setItem(result as GoodProps);
            } catch (err) {
                setError(err instanceof Error ? err.message : '获取商品详情失败');
            }
        };

        fetchData();
    }, [id]);

    if (error) {
        return (
            <> 
            <SafeAreaView style={styles.container}>
            <Header title={"出错了！"} />
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{"网络连接错误，请重试"}</Text>
                <TouchableOpacity 
                    onPress={() => router.replace({
                        pathname: `/goodspage/GoodsDetail`,
                        params: { id: id }
                      })}
                    style={styles.returnButton}
                >
                    <Text style={styles.returnButtonText}>刷新</Text>
                </TouchableOpacity>
            </View>
            </SafeAreaView>
        </>
        )
    }

    if (!item) {
        return <Text>加载中...</Text>;
    }

    console.log(item);

    return (
        <> 
            <SafeAreaView style={styles.container}>
            <Header title={item.title} />
            <ScrollView style={styles.scrollView}>
                <GoodsSlides {...item} />
                <GoodsInfo {...item} />
            </ScrollView>
            <Footer id={item.user.user_id} />
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        marginBottom: 50,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    errorText: {
        textAlign: 'center',
        alignContent: 'center',
        fontSize: 24,
    },
    returnButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f0f2ff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'grey',
        width: '40%',
        height: hp(5),
        alignItems: 'center',
    },
    returnButtonText: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
    }
})

export default GoodsDetail