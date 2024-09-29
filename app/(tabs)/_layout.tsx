import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs >
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
