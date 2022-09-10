import * as React from "react";
import { Button, Text, View } from "react-native";
import useAuthStore from "../store/auth";
import { GroupForm } from "../components/GroupForm";
import UserUtils from "../utils/user";

export default function HomeScreen({ navigation }) {
  const { isUserSignedIn, signUserOut } = useAuthStore();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isUserSignedIn ? (
        <View>
          <Button
            title="Sign Out"
            onPress={() => {
              UserUtils.handleSignOut();
              signUserOut();
            }}
          />
          <GroupForm />
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
