import { View, Text, TextInput, Alert, Pressable } from "react-native";
import React, { useState } from "react";
import { styles } from "../styles/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Constants from "expo-constants";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (confirmPassword !== password) {
      Alert.alert("Error", "Passwords must match");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must contains at least 6 characters");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      Alert.alert("Error", `${e}`);
    }
  };

  console.log(Constants?.manifest?.extra?.enableComments);

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
        onPress={handleSignUp}
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
