import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Alert } from "react-native";

class UserUtils {
  static async handleSignIn(email: string, password: string) {
    try {
      signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      Alert.alert("Error", `${e.errorcode}`);
    }
  }

  static async handleSignUp(
    email: string,
    password: string,
    confirmPassword: string,
  ) {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return userCredentials.user;
    } catch (e) {
      Alert.alert("Error", `${e}`);
    }
  }

  static async handleSignOut() {
    try {
      await signOut(auth);
      Alert.alert("Signed Out", "You have sucessfully signed out");
    } catch (e) {
      Alert.alert("Error", `${e}`);
    }
  }
}

export default UserUtils;
