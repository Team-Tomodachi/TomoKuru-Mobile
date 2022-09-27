import React, { useState, useEffect } from 'react';
import { styles } from '../styles/styles';
import { Button, Text, View, Alert, Pressable } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import * as SMS from 'expo-sms';
import * as Linking from 'expo-linking';
import useUserStore from '../store/user';
import useAuthStore from '../store/auth';
import axios from 'axios';
import { Styling } from "../styles/styling"

export default function SafetyScreen() {
  const [userData, setUserData] = useState('');
  const { isUserSignedIn } = useAuthStore();
  const { email } = useUserStore();

  useEffect(() => {
    axios
      .get(`http://tomokuru.i-re.io/api/users/${email}`)
      .then((response) => setUserData(response.data));
  }, []);

  const noContactalert = () => {
    Alert.alert('No Emergency Contact Found!', 'Please update your emergency contact in settings');
  };

  const notSignedIn = () => {
    Alert.alert('Not signed in', 'Please sign in');
  };

  const sendDangerSMS = async () => {
    if (!isUserSignedIn) {
      notSignedIn();
      return;
    }
    if (userData.contact === '') {
      noContactalert();
      return;
    }
    await SMS.sendSMSAsync(
      `${userData.contact}`,
      'I arrived at the venue and do not feel comfortable. Please call me ASAP!',
    );
  };

  const sendOKSMS = async () => {
    if (!isUserSignedIn) {
      notSignedIn();
      return;
    }
    if (userData.contact === '') {
      noContactalert();
      return;
    }
    await SMS.sendSMSAsync(`${userData.contact}`, 'I arrived at the venue everything is fine!');
  };

  const callCops = () => {
    const url = 'tel://110';
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={[Styling.greyBox, { marginBottom: 90 }]}>
        <Text style={Styling.sectionText}>
          The <Text style={Styling.tomoNoSize}>Tomo<Text style={Styling.kuruNoSize}>Kuru</Text></Text> team cares about your safety.
          Upon signing in, you can register an emergency contact's phone number.
          These buttons help to quickly update your emergecy contact on your situation, or contact the police.
        </Text>
      </View>
      <Pressable
        onPress={sendOKSMS}
        style={[Styling.actionButton, { backgroundColor: "#1DAE23", marginBottom: 50 }]}
      >
        <Text style={[Styling.actionButtonText, { backgroundColor: "#1DAE23", color: "white", fontSize: 20 }]}>
          <Feather name="user-check" color="white" size={20}></Feather>   I AM OK</Text>
      </Pressable>
      <Pressable
        onPress={sendDangerSMS}
        style={[Styling.actionButton, { backgroundColor: "#D92222", marginBottom: 10 }]}
      >
        <Text style={[Styling.actionButtonText, { backgroundColor: "#D92222", color: "white", fontSize: 20 }]}>
          <Feather name="alert-triangle" color="white" size={20}></Feather>   PLEASE HELP</Text>
      </Pressable>
      <Pressable
        onPress={callCops}
        style={[Styling.actionButton, { backgroundColor: "#7C0404" }]}
      >
        <Text style={[Styling.actionButtonText, { backgroundColor: "#7C0404", color: "white", fontSize: 20 }]}>
          <Feather name="alert-circle" color="white" size={20}></Feather>   CALL POLICE</Text>
      </Pressable>
    </View>
  );
}
