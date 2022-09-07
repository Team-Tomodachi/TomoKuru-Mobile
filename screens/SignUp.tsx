import { View, Text, TextInput, Alert, Pressable } from "react-native";
import React, { useState } from "react";
import { styles } from "../styles/styles";
import UserUtils from "../utils/user";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        keyboardType="email-address"
        returnKeyType="done"
        onChangeText={text => {
          setPassword(text);
        }}
        autoCapitalize="none"
        secureTextEntry></TextInput>
      <Text style={styles("w:56", "text-align:justify")}>Confirm password</Text>
      <TextInput
        style={styles("border:1", "p:1", "w:56", "m:5")}
        placeholder="Password"
        clearButtonMode="while-editing"
        keyboardType="email-address"
        returnKeyType="done"
        onChangeText={text => {
          setConfirmPassword(text);
        }}
        autoCapitalize="none"
        secureTextEntry></TextInput>
      <Pressable
        onPress={() => UserUtils.handleSignUp(email, password, confirmPassword)}
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
