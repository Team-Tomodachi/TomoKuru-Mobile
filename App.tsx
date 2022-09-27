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

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Kanit-Black': require('./assets/fonts/Kanit-Black.ttf'),
    'Kanit-Black-Italic': require('./assets/fonts/Kanit-BlackItalic.ttf'),
    'Kanit-Bold': require('./assets/fonts/Kanit-Bold.ttf'),
    'Kanit-Bold-Italic': require('./assets/fonts/Kanit-BoldItalic.ttf'),
    'Kanit-ExtraBold-Italic': require('./assets/fonts/Kanit-ExtraBoldItalic.ttf'),
    'Kanit-ExtraBold': require('./assets/fonts/Kanit-ExtraBold.ttf'),
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-BoldItalic': require('./assets/fonts/OpenSans-BoldItalic.ttf'),
    'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
    'OpenSans-SemiBoldItalic': require('./assets/fonts/OpenSans-SemiBoldItalic.ttf'),
    'OpenSans-ExtraBold': require('./assets/fonts/OpenSans-ExtraBold.ttf'),
    'OpenSans-ExtraBoldItalic': require('./assets/fonts/OpenSans-ExtraBoldItalic.ttf'),
    'OpenSans-Italic': require('./assets/fonts/OpenSans-Italic.ttf'),
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Light': require('./assets/fonts/OpenSans-Light.ttf'),
    'OpenSans-LightItalic': require('./assets/fonts/OpenSans-LightItalic.ttf'),
    'OpenSans-Medium': require('./assets/fonts/OpenSans-Medium.ttf'),
    'OpenSans-MediumItalic': require('./assets/fonts/OpenSans-MediumItalic.ttf'),
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
    <QueryClientProvider client={queryClient}>
      <StyleProvider>
        <NavigationContainer onReady={onLayoutRootView}>
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
  );
}
