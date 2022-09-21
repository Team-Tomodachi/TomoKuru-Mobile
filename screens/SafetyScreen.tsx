import React, { useState, useEffect } from "react";
import { styles } from "../styles/styles";
import { Button, Text, View, Alert } from "react-native";
import Feather from "@expo/vector-icons/Ionicons";
import * as SMS from 'expo-sms';
import * as Linking from 'expo-linking';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


export default function SafetyScreen() {
  // let [showToast, setShowToast] = useState(false);
  // const [userData, setUserData] = useState("");

  const queryClient = useQueryClient();

  const { email } = queryClient.getQueryData(
    ["userInfo"],
  );
  console.log(email)

//   useEffect(() => {
//     axios.get(`http://tomokuru.i-re.io/api/users/${email}`).then(function (response) {
//       setUserData(response.data);
//     });
//   }, []);

// console.log(userData);

const sendDangerSMS = async() => {
  await SMS.sendSMSAsync(
  "08039021969",
  'I arrived at the venue and do not feel comfortable. Please call me ASAP!',
  )
  console.log("danger SMS has been sent")
}

// const sendDangerSMS = async() => {
//   await SMS.sendSMSAsync(

//   `${user.emergency_contact}`,
//   `${user.custom_danger_message}`,
//   )
//   console.log("danger SMS has been sent")
// }

const sendOKSMS = async () => {
  await SMS.sendSMSAsync(
  "08039021969",
  'I arrived at the venue everything is fine!',
  )
  console.log("IM OKAY SMS has been sent")
}

// const sendOKSMS = async () => {
//   await SMS.sendSMSAsync(
//   `${user.emergency_contact}`,
//   `${user.custom_ok_message}`,
//   )
//   console.log("IM OKAY SMS has been sent")
// }

const callCops = () =>{
  const url="tel://08039021969"
  Linking.openURL(url);
}

// const callCops = () =>{
//   const url="tel://110"
//   Linking.openURL(url);
// }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={styles(
          "bg:green-600",
          "rounded:lg",
          "p:2",
          "flex:row",
          "justify:evenly",
          "m:10",
          
        )}>
        <Feather name="star" color="white" size={30}></Feather>
        <Button
          title="I'M OK"
          color="green-600"
          onPress={sendOKSMS}
        />
      </View>
      <Text style={styles("text:2xl", "color:red-500", "m:5")}>EMERGENCY</Text>
      <View
        style={styles(
          "bg:orange-400",
          "rounded:lg",
          "p:2",
          "flex:row",
          "justify:evenly",
          "m:5",
        )}>
        <Feather name="alert-sharp" color="white" size={30}></Feather>
        <Button
          title="NOTIFY CONTACT"
          color="white"
          onPress={sendDangerSMS}
        />
      </View>
      <View
        style={styles(
          "bg:red-700",
          "rounded:lg",
          "p:2",
          "flex:row",
          "justify:evenly",
        )}>
        <Feather name="alert-circle-outline" color="white" size={30}></Feather>
        <Button
          title="NOTIFY POLICE"
          color="white"
          onPress={callCops}
        />
      </View>
    </View>
  );
}
