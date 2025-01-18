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

// const exampleGood: GoodProps = {
//     good_id: '1',
//     title: '叮咚鸡叮咚鸡大狗大狗叫叫叫，带兴奋兴奋剂，一段一段带一段',
//     images: ['https://pic1.zhimg.com/v2-119565438456235a942996a574800eb8_b.jpg', 'https://picx.zhimg.com/v2-0bdd648c59f9ab3fb91c54933f7b0c21_b.jpg'],
//     price: 9999999.12,
//     description:
//         '叮咚鸡叮咚鸡大狗大狗叫叫叫，带兴奋兴奋剂，一段一段带一段叮咚鸡叮咚鸡大狗大狗叫叫叫，带兴奋兴奋剂，一段一段带一段叮咚鸡叮咚鸡大狗大狗叫叫叫，带兴奋兴奋剂，一段一段带一段叮咚鸡叮咚鸡大狗大狗叫叫叫，带兴奋兴奋剂，一段一段带一段，叮咚鸡叮咚鸡大狗大狗叫叫叫，带兴奋兴奋剂，一段一段带一段叮咚鸡叮咚鸡大狗大狗叫叫叫，带兴奋兴奋剂，一段一段带一段叮咚鸡叮咚鸡大狗大狗叫叫叫，带兴奋兴奋剂，一段一段带一段',
//     user: {
//         Name: 'brynn',
//         Avatar:
//             'https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
//         UserID: '1',
//         Rating: 4.5,
//     },
//     tags: ['tag1', 'tag2', 'tag3'],
// }

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
            <Footer />
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