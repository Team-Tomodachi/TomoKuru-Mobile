import Feather from "@expo/vector-icons/Ionicons";
import HomeStack from "./HomeStack";
import ExploreStack from "./ExploreStack";
import SafetyScreen from "./SafetyScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { styles } from "../styles/styles";
import { useEffect, useState } from "react";
import { ref, getDownloadURL, getStorage } from "firebase/storage";
import useUser from "../hooks/useUser";
import { Image, TouchableOpacity } from "react-native";
import useAuthStore from "../store/auth";

export default function MainTabs() {
  const { isUserSignedIn } = useAuthStore();
  const { data, isPlaceholderData } = useUser();

  const Tab = createBottomTabNavigator();
  const [profileImage, setProfileImage] = useState<string>("");

  useEffect(() => {
    if (isUserSignedIn && !isPlaceholderData) {
      const fileRef = ref(getStorage(), data.photo_url);
      getDownloadURL(fileRef).then(res => setProfileImage(res));
    } else {
      setProfileImage("");
    }
  }, [isUserSignedIn]);

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
        headerLeft: () => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Modal User")}
              delayPressIn={0}
              //TODO: fix ~1 sec delay after press (android only?)
            >
              {isUserSignedIn && profileImage.length !== 0 ? (
                <Image
                  style={styles("rounded:full", "w:10", "h:10", "ml:2")}
                  source={{
                    uri: profileImage,
                  }}
                />
              ) : (
                <Image
                  style={styles("rounded:full", "w:10", "h:10", "ml:2")}
                  source={require("../assets/new-user.png")}
                />
              )}
            </TouchableOpacity>
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Explore" component={ExploreStack} />
      <Tab.Screen name="Safety" component={SafetyScreen} />
    </Tab.Navigator>
  );
}
