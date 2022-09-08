import * as React from "react";
import { Button, Text, View } from "react-native";
import useAuthStore from "../store/auth";
import { GroupForm } from "../components/GroupForm";

export default function HomeScreen({ navigation }) {
  const { isUserSignedIn } = useAuthStore();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        {isUserSignedIn ? "You are signed in" : "You need to sign in"}
      </Text>
      <Button
        onPress={() => navigation.navigate("Modal User")}
        title="Sign In"
      />
      <GroupForm />
    </View>
  );
}
