import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import CreateGroupStack from './CreateGroupStack/CreateGroupStack';
import CreateEventStack from './CreateEventStack/CreatEvenStack';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home Main" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Group
        screenOptions={({ navigation }) => ({
          presentation: 'modal',
          headerLeft: () => <Button title="Close" onPress={() => navigation.popToTop()} />,
        })}
      >
        <Stack.Screen
          name="Create Group Stack"
          component={CreateGroupStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Create Event Stack"
          component={CreateEventStack}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
