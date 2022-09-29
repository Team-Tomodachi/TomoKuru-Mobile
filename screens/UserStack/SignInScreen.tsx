import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from '../../styles/styles';
import useAuthStore from '../../store/auth';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import authError from '../../utils/authError';
import axios from 'axios';
import Constants from 'expo-constants';
import { FirebaseError } from 'firebase/app';
import { useQuery } from '@tanstack/react-query';
import useUserStore from '../../store/user';
import { Styling } from '../../styles/styling';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [canFetch, setCanFetch] = useState<boolean>(false);

  const { signUserIn } = useAuthStore();
  const { setUserInfo } = useUserStore();

  useQuery(
    ['userInfo'],
    () =>
      axios
        .get(`${Constants?.expoConfig?.extra?.apiURL}/api/users/${email}`)
        .then((res) => res.data),
    {
      enabled: canFetch,
    },
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={[styles('w:56', 'text-align:justify'), Styling.h2Text]}>Email</Text>
          <TextInput
            style={[styles('border:1', 'p:2', 'w:56', 'm:5', 'mt:1', 'mb:7'), Styling.formField]}
            placeholder="Email"
            clearButtonMode="while-editing"
            keyboardType="email-address"
            returnKeyType="done"
            onChangeText={(text) => {
              setEmail(text);
            }}
            autoCapitalize="none"
          ></TextInput>
          <Text style={[styles('w:56', 'text-align:justify'), Styling.h2Text]}>Password</Text>
          <TextInput
            style={[styles('border:1', 'p:2', 'w:56', 'm:5', 'mt:1'), Styling.formField]}
            placeholder="Password"
            clearButtonMode="while-editing"
            returnKeyType="done"
            onChangeText={(text) => {
              setPassword(text);
            }}
            autoCapitalize={'none'}
            secureTextEntry={true}
          ></TextInput>
          <TouchableOpacity
            onPress={async () => {
              try {
                await signInWithEmailAndPassword(auth, email, password);
                setCanFetch(true);
                setUserInfo('', '', email);
                signUserIn();
              } catch (error) {
                if (error instanceof FirebaseError) {
                  console.log('There was an error', error);
                  Alert.alert('Error', authError[error.code]);
                } else {
                  console.log('Sing in Error:', error);
                }
              }
            }}
            style={Styling.actionButton}
          >
            <Text style={Styling.actionButtonText}>SIGN IN</Text>
          </TouchableOpacity>
          <Text>or</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Modal User', { screen: 'Sign up' })}
            style={[Styling.actionButton, { backgroundColor: '#CC960C' }]}
          >
            <Text style={[Styling.actionButtonText, { backgroundColor: '#CC960C' }]}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
