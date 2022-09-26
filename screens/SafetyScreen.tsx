import React, { useState, useEffect } from 'react';
import { styles } from '../styles/styles';
import { Button, Text, View, Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import * as SMS from 'expo-sms';
import * as Linking from 'expo-linking';
import useUserStore from '../store/user';
import useAuthStore from '../store/auth';
import axios from 'axios';
import Messages from '../components/Messages';

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
      {/* <View
        style={styles('bg:green-600', 'rounded:lg', 'p:2', 'flex:row', 'justify:evenly', 'm:10')}
      >
        <Feather name="user-check" color="white" size={30}></Feather>
        <Button title="I'M OK" color="green-600" onPress={sendOKSMS} />
      </View>
      <Text style={styles('text:2xl', 'color:red-500', 'm:5')}>EMERGENCY</Text>
      <View
        style={styles('bg:orange-400', 'rounded:lg', 'p:2', 'flex:row', 'justify:evenly', 'm:5')}
      >
        <Feather name="alert-triangle" color="white" size={30}></Feather>
        <Button title="NOTIFY CONTACT" color="white" onPress={sendDangerSMS} />
      </View>
      <View style={styles('bg:red-700', 'rounded:lg', 'p:2', 'flex:row', 'justify:evenly')}>
        <Feather name="alert-circle" color="white" size={30}></Feather>
        <Button title="NOTIFY POLICE" color="white" onPress={callCops} />
      </View> */}
      <Messages />
    </View>
  );
}
