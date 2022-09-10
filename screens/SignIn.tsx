import { View, Text, TextInput, Alert, Pressable } from "react-native";
import React, { useState } from "react";
import { styles } from "../styles/styles";
import UserUtils from "../utils/user";
import useAuthStore from "../store/auth";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isUserSignedIn, signUserIn } = useAuthStore();

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
      <Text style={styles("w:56", "text-align:justify")}>Password</Text>
      <TextInput
        style={styles("border:1", "p:1", "w:56", "m:5")}
        placeholder="Password"
        clearButtonMode="while-editing"
        // keyboardType="email-address"
        returnKeyType="done"
        onChangeText={text => {
          setPassword(text);
        }}
        autoCapitalize={'none'}
        secureTextEntry={true}
        ></TextInput>
      <Pressable
        onPress={() => {
          UserUtils.handleSignIn(email, password);
          signUserIn();
          navigation.navigate("Home");
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
        onPress={() => navigation.navigate("Modal User", { screen: "Sign Up" })}
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
  );
}
