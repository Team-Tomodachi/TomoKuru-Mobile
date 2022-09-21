import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../styles/styles";
import useAuthStore from "../store/auth";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import authError from "../utils/authError";
import axios from "axios";
import Constants from "expo-constants";
import { FirebaseError } from "firebase/app";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "../store/user";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [canFetch, setCanFetch] = useState<boolean>(false);

  const { signUserIn } = useAuthStore();
  const { setUserInfo } = useUserStore();

  useQuery(
    ["userInfo"],
    () =>
      axios
        .get(`${Constants?.expoConfig?.extra?.apiURL}/api/users/${email}`)
        .then(res => res.data),
    {
      enabled: canFetch,
    },
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={styles("w:56", "text-align:justify")}>Email</Text>
          <TextInput
            style={styles("border:1", "p:1", "w:56", "m:5")}
            placeholder="Email"
            clearButtonMode="while-editing"
            keyboardType="email-address"
            returnKeyType="done"
            onChangeText={text => {
              setEmail(text);
            }}
            autoCapitalize="none"></TextInput>
          <Text style={styles("w:56", "text-align:justify")}>Password</Text>
          <TextInput
            style={styles("border:1", "p:1", "w:56", "m:5")}
            placeholder="Password"
            clearButtonMode="while-editing"
            returnKeyType="done"
            onChangeText={text => {
              setPassword(text);
            }}
            autoCapitalize={"none"}
            secureTextEntry={true}></TextInput>
          <Pressable
            onPress={async () => {
              try {
                await signInWithEmailAndPassword(auth, email, password);
                // setCanFetch(true);
                setUserInfo("", "", email);
                signUserIn();
                navigation.popToTop();
              } catch (error) {
                if (error instanceof FirebaseError) {
                  Alert.alert("Error", authError[error.code]);
                }
              }
            }}
            style={styles(
              "bg:green-600",
              "rounded:lg",
              "p:2",
              "flex:row",
              "justify:evenly",
              "m:2",
            )}>
            <Text style={{ color: "white" }}>Sign In</Text>
          </Pressable>
          <Text>or</Text>
          <Pressable
            onPress={() =>
              navigation.navigate("Modal User", { screen: "Sign Up" })
            }
            style={styles(
              "bg:orange-400",
              "rounded:lg",
              "p:2",
              "flex:row",
              "justify:evenly",
              "m:2",
            )}>
            <Text>Sign Up</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
