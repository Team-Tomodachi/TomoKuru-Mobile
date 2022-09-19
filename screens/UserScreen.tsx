import { Image, Pressable, View } from "react-native";
import React, { useState } from "react";
import { styles } from "../styles/styles";
import { Button } from "react-native-paper";
import useAuthStore from "../store/auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import * as ImagePicker from "expo-image-picker";

export default function UserScreen({ navigation }) {
  const { signUserOut } = useAuthStore();
  const [image, setImage] = useState(null);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const pickImage = async () => {
    requestPermission();

    if (status?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } else {
      requestPermission();
    }
  };

  return (
    <View style={styles("flex:1", "flex:col", "justify:start", "items:center")}>
      <Pressable style={styles("my:20")} onPress={pickImage}>
        {image ? (
          <Image
            style={styles("rounded:full", "w:56", "h:56")}
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
            )}></View>
        )}
      </Pressable>
      <Button icon="camera" style={styles("bg:green-600", "my:2")}>
        update profile picture
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
