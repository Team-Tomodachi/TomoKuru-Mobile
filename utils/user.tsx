import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";

class UserUtils {
  static async handleSignIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      Alert.alert("Error", `${e}`);
    }
  }

  static async handleSignUp(
    email: string,
    password: string,
    confirmPassword: string,
  ) {
    if (email.length === 0) {
      Alert.alert("Error", "Email is required");
      return;
    }
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
  }
}

export default UserUtils;
