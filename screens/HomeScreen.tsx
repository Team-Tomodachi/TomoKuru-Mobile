import * as React from "react";
import { Button, View } from "react-native";
import useAuthStore from "../store/auth";

export default function HomeScreen({ navigation }) {
  const { isUserSignedIn } = useAuthStore();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isUserSignedIn ? (
        <View>
          <Button
            onPress={() => navigation.navigate("Create Group")}
            title="Create Group"
          />
          <Button
            onPress={() => navigation.navigate("Create Event Stack")}
            title="Create Event"
          />
        </View>
      ) : (
        <Button
          onPress={() => navigation.navigate("Modal User")}
          title="Sign In"
        />
      )}
    </View>
  );
}
