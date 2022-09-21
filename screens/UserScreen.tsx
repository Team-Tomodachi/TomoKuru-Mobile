import { Alert, Image, Pressable, View } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../styles/styles";
import { Button } from "react-native-paper";
import useAuthStore from "../store/auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import * as ImagePicker from "expo-image-picker";
import { ActivityIndicator } from "react-native-paper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storage } from "../firebase";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uuid from "react-native-uuid";
import axios from "axios";
import Constants from "expo-constants";
import useUserStore from "../store/user";

export default function UserScreen({ navigation }) {

  const [image, setImage] = useState(null);
  const [isUploading, setUploading] = useState<boolean>(false);
  const [imageKey, setImageKey] = useState("");

  const { email } = useUserStore();
  const { signUserOut } = useAuthStore();
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  async function downloadUserPFP() {
    const pulledRef = await axios.get(
      `${Constants?.expoConfig?.extra?.apiURL}/api/users/${email}`,
    );
    const fileRef = ref(getStorage(), pulledRef.data.photo_url); //user ID
    const myImg = await getDownloadURL(fileRef);
    setImage(myImg);
  }

  useEffect(() => {
    downloadUserPFP();
  }, []);


  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const dbKey = `users/${uuid.v4()}-${Date.now()}`;
    const fileRef = ref(getStorage(), dbKey); //user ID
    await uploadBytes(fileRef, blob);
    await axios.patch(
      `${Constants?.expoConfig?.extra?.apiURL}/api/users/${email}`,
      {
        photo_url: dbKey,
      },
    );
    blob.close();
    // return await getDownloadURL(fileRef);
  }

  const pickImage = async () => {
    if (!status?.granted) {
      requestPermission();
    }
    if (status?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        setUploading(true);
        await uploadImageAsync(result.uri);
        const pulledRef = await axios.get(
          `${Constants?.expoConfig?.extra?.apiURL}/api/users/${email}`,
        );
        const fileRef = ref(getStorage(), pulledRef.data.photo_url);
        const myImg = await getDownloadURL(fileRef);
        setImage(myImg);
        setUploading(false);
        //TODO Implement lazy loading
        Alert.alert("Success", "Your profile picture has been updated");
      }
    }
  };

  return (
    <View style={styles("flex:1", "flex:col", "justify:start", "items:center")}>
      {image ? (
        <Image
          style={styles("rounded:full", "w:56", "h:56", "my:20")}
          source={{
            uri: image,
          }}
        />
      ) : (
        <View
          style={styles(
            "rounded:full",
            "w:56",
            "h:56",
            "bg:gray-700",
            "my:20",
          )}></View>
      )}
      <Button
        icon="camera"
        style={styles("bg:green-600", "my:2")}
        onPress={pickImage}
        disabled={isUploading}>
        {isUploading ? (
          <ActivityIndicator animating={true} color="white" />
        ) : (
          "update profile picture"
        )}
      </Button>
      <Button
        icon="pencil"
        style={styles("bg:yellow-400", "my:2")}
        onPress={() => navigation.navigate("Edit Details")}>
        update account details
      </Button>
      <Button
        icon="logout"
        style={styles("bg:red-500", "my:2")}
        onPress={async () => {
          try {
            await signOut(auth);
            signUserOut();
          } catch (error) {
            console.log(error);
          }
        }}>
        sign out
      </Button>
    </View>
  );
}
