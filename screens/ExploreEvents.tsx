import SingleEvent from '../components/SingleEvent';
import ListEvents from '../components/ListEvents';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function ExploreEvents() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Event List" component={ListEvents} options={{ headerShown: false }} />
      <Stack.Screen name="Event Details" component={SingleEvent} />
    </Stack.Navigator>
  );
}
