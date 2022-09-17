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
import Constants from "expo-constants";
import axios from "axios";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import authError from "../utils/authError";
import { FirebaseError } from "firebase/app";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const { signUserIn } = useAuthStore();

  //Handler

  async function addUserToDB(email: string, uid: string, name: string) {
    await axios
      .post(`${Constants?.expoConfig?.extra?.apiURL}/api/users`, {
        user_email: email,
        firebase_id: uid,
        first_name: name,
        account_type: "user",
      })
      .then(res => console.log(res.data));
  }

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
          <Text style={styles("w:56", "text-align:justify")}>Name</Text>
          <TextInput
            style={styles("border:1", "p:1", "w:56", "m:5")}
            placeholder="Name"
            clearButtonMode="while-editing"
            keyboardType="default"
            returnKeyType="done"
            onChangeText={text => {
              setUsername(text);
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
          <Text style={styles("w:56", "text-align:justify")}>
            Confirm password
          </Text>
          <TextInput
            style={styles("border:1", "p:1", "w:56", "m:5")}
            placeholder="Password"
            clearButtonMode="while-editing"
            returnKeyType="done"
            onChangeText={text => {
              setConfirmPassword(text);
            }}
            autoCapitalize={"none"}
            secureTextEntry={true}></TextInput>
          <Pressable
            onPress={async () => {
              try {
                const userCredentials = await createUserWithEmailAndPassword(
                  auth,
                  email,
                  password,
                );
                addUserToDB(email, userCredentials?.user?.uid, username);
                signUserIn();
                navigation.navigate("Home");
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
            <Text style={{ color: "white" }}>Sign Up</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
