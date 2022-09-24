import SingleGroup from '../components/SingleGroup';
import ListGroups from '../components/ListGroups';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function ExploreGroups() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Group List" component={ListGroups} options={{ headerShown: false }} />
      <Stack.Screen name="Group Details" component={SingleGroup} />
    </Stack.Navigator>
  );
}
