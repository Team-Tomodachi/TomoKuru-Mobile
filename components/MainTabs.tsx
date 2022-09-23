import Feather from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";
import HomeStack from "../screens/HomeStack";
import ExploreStack from "../screens/ExploreStack";
import SafetyScreen from "../screens/SafetyScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { styles } from "../styles/styles";

export default function MainTabs() {

const Tab = createBottomTabNavigator();

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
  