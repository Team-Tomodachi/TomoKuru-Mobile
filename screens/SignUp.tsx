import { View, Text, TextInput, Alert, Pressable } from "react-native";
import React, { useState } from "react";
import { styles } from "../styles/styles";
import UserUtils from "../utils/user";
import useAuthStore from "../store/auth";
import Constants from "expo-constants";
import Axios from "axios";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const { signUserIn, setUserId } = useAuthStore();

  //Handler

  function addUserToDB(email: string, uid: string, name: string) {
    Axios.post(`${Constants?.manifest?.extra?.apiURL}/api/users`, {
      user_email: email,
      firebase_id: uid,
      first_name: name,
      account_type: "user",
    })
      .then(response => setUserId(response))
      .catch(function (error: JSON) {
        console.log(error);
      });
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
        // keyboardType="default"
        returnKeyType="done"
        onChangeText={text => {
          setPassword(text);
        }}
        autoCapitalize={"none"}
        secureTextEntry={true}></TextInput>
      <Text style={styles("w:56", "text-align:justify")}>Confirm password</Text>
      <TextInput
        style={styles("border:1", "p:1", "w:56", "m:5")}
        placeholder="Password"
        clearButtonMode="while-editing"
        // keyboardType="default"
        returnKeyType="done"
        onChangeText={text => {
          setConfirmPassword(text);
        }}
        autoCapitalize={"none"}
        secureTextEntry={true}></TextInput>
      <Pressable
        onPress={async () => {
          const user = await UserUtils.handleSignUp(
            email,
            password,
            confirmPassword,
          );
          addUserToDB(String(user?.email), String(user?.uid), username);
          // signUserIn();
          // navigation.navigate("Home");
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
  );
}
