import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView }from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { UserDisplayProps } from '@/types';


const UserInfoBar: React.FC<UserDisplayProps> = ({name, avatar}) =>{
    return (
        <TouchableOpacity onPress={() => {
          console.log('进入账号详情');
        }}>
        <View style={styles.userInfoBar}>
        <Image
          source={{ uri: avatar }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{name}</Text>
        <View style={styles.touchableButton} >
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </View>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    userInfoBar: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      backgroundColor: 'white',
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
    },
    username: {
      flex: 1,
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 15,
    },
    touchableButton: {
      padding: 5,
    },
  });

export default UserInfoBar