import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/lib/context/AuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="goodspage/GoodsDetail" options={{ headerShown: false }} />
          <Stack.Screen name="loginpage/Login" options={{ headerShown: false }} />
          <Stack.Screen name="loginpage/Register" options={{ headerShown: false }} />
          <Stack.Screen name="userpage/UserPage" options={{ headerShown: false }} />
          <Stack.Screen name="userpage/FavoList" options={{ headerShown: false }} />
          <Stack.Screen name="userpage/SaleList" options={{ headerShown: false }} />
          <Stack.Screen name="userpage/BoughtList" options={{ headerShown: false }} />
          <Stack.Screen name="userpage/SoldList" options={{ headerShown: false }} />
          <Stack.Screen name="chat/index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="adminpage/AdminControl" options={{ headerShown: true }} />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}
