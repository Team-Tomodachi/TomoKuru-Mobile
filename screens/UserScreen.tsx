import { View, Text } from "react-native";
import React from "react";
import { styles } from "../styles/styles";
import { Button } from "react-native-paper";

export default function UserScreen({ navigation }) {
  return (
    <View style={styles("flex:1", "flex:col", "justify:start", "items:center")}>
      <View
        style={styles(
          "rounded:full",
          "h:56",
          "w:56",
          "bg:blue-600",
          "my:20",
        )}></View>
      <Button icon="camera" style={styles("bg:green-600", "my:2")}>
        update profile picture
      </Button>
      <Button
        icon="pencil"
        style={styles("bg:yellow-400", "my:2")}
        onPress={() => navigation.navigate("Edit Details")}>
        update account details
      </Button>
      <Button icon="logout" style={styles("bg:red-500", "my:2")}>
        sign out
      </Button>
    </View>
  );
}
