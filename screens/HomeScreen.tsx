import * as React from "react";
import { Button, Text, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
      <Button
        onPress={() => navigation.navigate("Modal User")}
        title="Sign In"
      />
    </View>
  );
}
