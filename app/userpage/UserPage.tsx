import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView }from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { UserDisplayProps } from '@/lib/types';
import {router, useLocalSearchParams} from 'expo-router';
import { Header } from 'react-native-elements';
import GoodsList from '@/components/homepage/GoodsList';
import {GoodPropsSimplified} from '@/lib/types';
import UserInfoArea from '@/components/userpage/UserInfoArea';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HeaderUserInfo from '@/components/userpage/HeaderUserInfo';
import { useUserSales } from '@/lib/dataRequest';
import storageApi from '@/lib/storageApi';

const UserPage: React.FC<UserDisplayProps> = () =>{ 
    const params = useLocalSearchParams();
    const {data, error, isLoading} = useUserSales(params.id as string) || {}
    console.log("params.id:", params.id, "type:", typeof(params.id))
    if (isLoading){
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }
    else if (error){
        console.log("error:", error)
        return ( 
            <SafeAreaView>
                <Text>Error</Text>
            </SafeAreaView>
        );
    }
    else{
        
    }
    return (
        <View>
            <Header 
            placement='left'
            backgroundColor='#fff'
            rightComponent={
                <TouchableOpacity onPress={() => {router.back()}} style={styles.button}>
                  <Ionicons name="share-outline" size={24} color="black" />
                </TouchableOpacity>
            }
            centerComponent={<HeaderUserInfo avatar="https://yt3.googleusercontent.com/rR7cTyWRnDXImsaJkYpHMgyCNCV16XLg5HVIDZG1-5HerjxfPmn8mPPW27u_FU__Z8sBRyg0=s160-c-k-c0x00ffffff-no-rj" username="yamanashi" />}
            leftComponent={
                <TouchableOpacity onPress={() => {router.back()}} style={styles.button}>
                  <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
            }
         />
            <ScrollView style={{marginBottom: hp(5)}}>
            <UserInfoArea 
                avatarUrl={"https://yt3.googleusercontent.com/rR7cTyWRnDXImsaJkYpHMgyCNCV16XLg5HVIDZG1-5HerjxfPmn8mPPW27u_FU__Z8sBRyg0=s160-c-k-c0x00ffffff-no-rj"} 
                username={"yamanashi"} 
                bio={"哈呀哈基米，米呀米基哈，叮叮咚咚咚叮叮咚咚叮叮叮咚咚咚叮叮咚咚叮叮叮咚咚咚叮叮咚咚叮叮叮咚咚咚叮叮咚咚叮"} 
                rating={4.5} 
                onEditPress={()=>{console.log("编辑按钮")}} 
                />
                <GoodsList data={data || []} />
            </ScrollView>
     </View>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        marginHorizontal: 10,
    },
});

export default UserPage;