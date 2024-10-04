import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  
import {router} from 'expo-router';

const settingsList = [
    {
        title: '个人信息',
        icon: 'person',
        onPress: () => {
            console.log('个人信息');
        }
    },
    {
        title: '账户安全',
        icon: 'lock',
        onPress: () => {
            console.log('账户安全');
        }
    },
    {
        title: '隐私设置',
        icon: 'eye-off',
        onPress: () => {
            console.log('隐私设置');
        }
    },
    {
        title: '通知管理',
        icon: 'notifications',
        onPress: () => {
            console.log('通知管理');
        }
    },
    {
        title: '帮助中心',
        icon: 'help-circle',
        onPress: () => {
            console.log('帮助中心');
        }
    },
    {
        title: '关于我们',
        icon: 'information-circle',
        onPress: () => {
            console.log('关于我们');
        }
    }
]

const SettingsList = () => {
    return(
        <View style={styles.settingsContainer}>
          {settingsList.map((item, index) => (
            <TouchableOpacity key={index} style={styles.settingItem} onPress={item.onPress}>
              <Text>{item.title}</Text>
              <Ionicons name="chevron-forward-outline" size={20} color="gray" />
            </TouchableOpacity>
          ))}
        </View>
    )
}


const styles = StyleSheet.create({
    settingsContainer: {
      marginTop: 20,
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
  });
export default SettingsList;