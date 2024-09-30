import { Tabs } from 'expo-router';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: hp(9),
          paddingBottom: hp(2),
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },

      }}
      >
      <Tabs.Screen name="(home)" options={{ 
        headerShown: false,
        tabBarLabel: '首页',
        }}/>
      <Tabs.Screen name="SellPage" options={{ 
        headerShown: false ,
        tabBarLabel: '出闲置',
        }}/>
      <Tabs.Screen name="MyPage" options={{ 
        headerShown: false, 
        tabBarLabel: '我的',
        }}/>
    </Tabs>
  );
}
