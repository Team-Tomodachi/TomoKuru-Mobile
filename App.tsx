import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleProvider } from 'react-native-zephyr';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ModalUser from './screens/UserStack/ModalUserStack';
import MainTabsStack from './screens/MainTabsStack';
import EventDetailScreen from './screens/EventDetailScreen';
import GroupDetailScreen from './screens/GroupDetailScreen';
import VenueDetailScreen from './screens/VenueDetailScreen';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Kanit-Black': require('./assets/fonts/Kanit-Black.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView}>
      <QueryClientProvider client={queryClient}>
        <StyleProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Main Tab"
                component={MainTabsStack}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Modal User"
                component={ModalUser}
                options={{ headerShown: false, presentation: 'modal' }}
              />
              <Stack.Group>
                <Stack.Screen name="Group Details" component={GroupDetailScreen} />
                <Stack.Screen name="Event Details" component={EventDetailScreen} />
                <Stack.Screen name="Venue Details" component={VenueDetailScreen} />
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </StyleProvider>
      </QueryClientProvider>
    </View>
  );
}
