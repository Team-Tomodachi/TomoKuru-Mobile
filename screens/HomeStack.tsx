import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import CreateGroupScreen from "./CreateGroupScreen";
import CreateEventScreen from "./CreateEventScreen";
import VenueSelectScreen from "./VenueSelectScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home Main"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Create Group" component={CreateGroupScreen} />
        <Stack.Screen name="Create Event" component={CreateEventScreen} />
        <Stack.Screen name="Select Venue" component={VenueSelectScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
