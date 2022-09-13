import * as React from "react";
import { Button, Text, View } from "react-native";
import useAuthStore from "../store/auth";
import { GroupForm } from "../components/GroupForm";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function HomeScreen({ navigation }) {
  const { isUserSignedIn, signUserOut } = useAuthStore();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isUserSignedIn ? (
        <View>
          <Button
            title="Sign Out"
            onPress={async () => {
              try {
                await signOut(auth);
                signUserOut();
              } catch (error) {
                console.log(error);
              }
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
