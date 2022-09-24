import SingleVenue from '../components/SingleVenue';
import ListVenues from '../components/ListVenues';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function ExploreVenues() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Venue List" component={ListVenues} options={{ headerShown: false }} />
      <Stack.Screen name="Venue Details" component={SingleVenue} />
    </Stack.Navigator>
  );
}
