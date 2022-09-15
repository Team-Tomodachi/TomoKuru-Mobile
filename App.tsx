import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleProvider } from "react-native-zephyr";
import HomeStack from "./screens/HomeStack";
import ExploreScreen from "./screens/ExploreScreen";
import SafetyScreen from "./screens/SafetyScreen";
import Feather from "@expo/vector-icons/Ionicons";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ModalUser() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Sign In" component={SignIn} />
      <Stack.Screen name="Sign Up" component={SignUp} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          }
          if (route.name === "Explore") {
            iconName = "search";
          }
          if (route.name === "Safety") {
            iconName = "flag";
          }

          // You can return any component that you like here!
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Safety" component={SafetyScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <StyleProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main Tab"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Modal User"
            component={ModalUser}
            options={{ headerShown: false, presentation: "modal" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StyleProvider>
  );
}
