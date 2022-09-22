import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleProvider } from "react-native-zephyr";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ModalUser from "./screens/ModalUserStack";
import HomeStack from "./screens/HomeStack";
import ExploreStack from "./screens/ExploreStack";
import SafetyScreen from "./screens/SafetyScreen";
import Feather from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";
import { styles } from "./styles/styles";

const queryClient = new QueryClient();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation, route }) => ({
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
        headerLeft: () => (
          <Pressable
            onPress={() => navigation.navigate("Modal User")}
            style={styles(
              "h:10",
              "w:10",
              "bg:green-800",
              "rounded:full",
              "ml:2",
            )}></Pressable>
        ),
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Explore" component={ExploreStack} />
      <Tab.Screen name="Safety" component={SafetyScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
