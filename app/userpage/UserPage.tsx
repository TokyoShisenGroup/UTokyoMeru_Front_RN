import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView }from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { UserDisplayProps } from '@/types';
import {router} from 'expo-router';
import Header from '@/components/goodspage/Header';
import GoodsList from '@/components/homepage/GoodsList';
import {GoodPropsSimplified} from '@/types';
import UserInfoArea from '@/components/userpage/UserInfoArea';

const UserPage: React.FC<UserDisplayProps> = () =>{
    return (
        <SafeAreaView>
            <Header title="" />
            <ScrollView>
            <UserInfoArea 
                avatarUrl={"https://yt3.googleusercontent.com/rR7cTyWRnDXImsaJkYpHMgyCNCV16XLg5HVIDZG1-5HerjxfPmn8mPPW27u_FU__Z8sBRyg0=s160-c-k-c0x00ffffff-no-rj"} 
                username={"yamanashi"} 
                bio={"哈呀哈基米，米呀米基哈，叮叮咚咚咚叮叮咚咚叮叮叮咚咚咚叮叮咚咚叮叮叮咚咚咚叮叮咚咚叮叮叮咚咚咚叮叮咚咚叮"} 
                rating={4.5} 
                onEditPress={()=>{console.log("编辑按钮")}} 
                />
                <GoodsList uri="goods" />
            </ScrollView>
        </SafeAreaView>
    )
}

export default UserPage;