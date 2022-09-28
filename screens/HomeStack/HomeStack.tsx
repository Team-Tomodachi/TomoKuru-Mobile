import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import CreateGroupStack from './CreateGroupStack/CreateGroupStack';
import CreateEventStack from './CreateEventStack/CreatEvenStack';
import UserGroupsScreen from './UserGroupsScreen';
import { Button } from 'react-native';
import UserEventsScreen from './UserEventsScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home Main" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="User Groups" component={UserGroupsScreen} />
      <Stack.Screen name="User Events" component={UserEventsScreen} />
      <Stack.Group
        screenOptions={({ navigation }) => ({
          presentation: 'modal',
          headerLeft: () => <Button color={'#FCB90F'} title="Close" onPress={() => navigation.popToTop()} />,
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
