import * as React from "react";
import { styles } from "../styles/styles";
import { Button, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Ionicons";
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast'
import { useState } from "react";



export default function SafetyScreen() {
  let [showToast, setShowToast] = useState(false);

  return (
    <RootSiblingParent>
      <View style={{flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={styles("bg:green-600", "rounded:lg", "p:10", "flex:row", "justify:evenly", "m:10")}>
          <Feather name="star" color="white" size={30}></Feather>
          <Button title="I'M OK" color="white" onPress={() => setShowToast(true)}/>
        </View>
        <Text style={styles("text:2xl", "color:red-500", "m:5")} >EMERGENCY</Text>
        <View style={styles("bg:orange-400", "rounded:lg", "p:6", "flex:row", "justify:evenly", "m:5")}>
          <Feather name="alert-sharp" color="white" size={30}></Feather>
          <Button title="NOTIFY CONTACT" color="white" onPress={() => setShowToast(true)}/>
        </View>
        <View style={styles("bg:red-500", "rounded:lg", "p:8", "flex:row", "justify:evenly", "m:5" )}>
          <Feather name="alert-circle-outline" color="white" size={30}></Feather>
          <Button title="NOTIFY POLICE" color="white" onPress={() => setShowToast(true)}/>
        </View>
      </View>
      <Toast visible={showToast} onHide={() => setShowToast(false)} shadow={true}>Please hold the button for 1 second!</Toast>
    </RootSiblingParent>
    
  );
}
