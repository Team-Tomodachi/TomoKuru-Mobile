import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateEventScreen from "./CreateEventScreen";
import VenueSelectScreen from "./VenueSelectScreen";
import { Button } from "react-native";

const Stack = createNativeStackNavigator();

export default function CreateEventStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Create Event"
        component={CreateEventScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Button title="Close" onPress={() => navigation.popToTop()} />
          ),
        })}
      />
      <Stack.Screen name="Select Venue" component={VenueSelectScreen} />
    </Stack.Navigator>
  );
}