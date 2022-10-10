import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateEventScreen from './CreateEventScreen';
import VenueSelectScreen from './VenueSelectScreen';
import { Button } from 'react-native';
import GroupSelectScreen from './GroupSelectScreen';

const Stack = createNativeStackNavigator();

export default function CreateEventStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Create Event"
        component={CreateEventScreen}
        options={({ navigation }) => ({
          headerLeft: () => <Button color={'#FCB90F'} title="Close" onPress={() => navigation.popToTop()} />,
        })}
      />
      <Stack.Screen name="Select Venue" component={VenueSelectScreen} />
      <Stack.Screen name="Select Group" component={GroupSelectScreen} />
    </Stack.Navigator>
  );
}
