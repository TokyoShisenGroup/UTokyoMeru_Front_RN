import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView }from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { UserDisplayProps } from '@/lib/types';
import {router, useLocalSearchParams} from 'expo-router';
import { Header } from 'react-native-elements';
import GoodsList from '@/components/homepage/GoodsList';
import UserInfoArea from '@/components/userpage/UserInfoArea';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HeaderUserInfo from '@/components/userpage/HeaderUserInfo';
import { useUserSales, useUser, swrConfig, DEFAULT_AVATAR } from '@/lib/dataRequest';
import { useAuth } from '@/lib/context/AuthContext';


const UserPage: React.FC<UserDisplayProps> = () =>{ 
    const params = useLocalSearchParams();
    const {data: goodsData, error: goodsError, isLoading: goodsLoading} = useUserSales(params.id as string, swrConfig)
    const {data: userData, error: userError, isLoading: userLoading} = useUser(params.id as string, swrConfig)
    console.log("params.id:", params.id, "type:", typeof(params.id))

    if (goodsLoading || userLoading){
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }
    else if (goodsError || userError){
        console.log("error:", goodsError || userError)
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
            centerComponent={<HeaderUserInfo avatar={userData?.avatar || DEFAULT_AVATAR} username={userData?.user_name || ""} />}
            leftComponent={
                <TouchableOpacity onPress={() => {router.back()}} style={styles.button}>
                  <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
            }
         />
            <ScrollView style={{marginBottom: hp(5)}}>
            <UserInfoArea 
                avatarUrl={userData?.avatar || DEFAULT_AVATAR} 
                username={userData?.user_name || ""} 
                bio={userData?.bio || ""} 
                rating={userData?.rating || 0} 
                onEditPress={()=>{console.log("编辑按钮")}} 
                />
                <GoodsList data={goodsData || []} />
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