import Feather from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";
import HomeStack from "../screens/HomeStack";
import ExploreStack from "../screens/ExploreStack";
import SafetyScreen from "../screens/SafetyScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { styles } from "../styles/styles";
import { useState } from "react";
import { ref, getDownloadURL, getStorage } from "firebase/storage"
import useUser from "../hooks/useUser";
import { Image, TouchableOpacity } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function MainTabs() {
    const queryClient = useQueryClient();

    const Tab = createBottomTabNavigator();
    const [profileImage, setProfileImage] = useState<string>("");

    const { data, isPlaceholderData } = useUser();
    if (!isPlaceholderData) {
        // console.log("CHECKER", data);
        //TODO: get data.photo_url working so we can properly load user PFP
        const fileRef = ref(getStorage(), "users/new-user.png");
        getDownloadURL(fileRef).then(res => setProfileImage(res));
    }

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
                    profileImage ? (<TouchableOpacity
                        onPress={() => navigation.navigate("Modal User")}
                        delayPressIn={0}
                    //TODO: fix ~1 sec delay after press (android only?)
                    >
                        <Image
                            style={styles("rounded:full", "w:10", "h:10", "ml:2")}
                            source={{
                                uri: profileImage,
                            }}
                        />
                    </TouchableOpacity>) :
                        (<Pressable
                            onPress={() => navigation.navigate("Modal User")}
                            style={
                                styles(
                                    "h:10",
                                    "w:10",
                                    "bg:yellow-800",
                                    "rounded:full",
                                    "ml:2",
                                )
                            }></Pressable>)

                ),
            })}>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Explore" component={ExploreStack} />
            <Tab.Screen name="Safety" component={SafetyScreen} />
        </Tab.Navigator >
    );
}
