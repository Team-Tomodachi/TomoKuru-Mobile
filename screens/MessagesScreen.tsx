import React, { useState } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { View, Text, FlatList, TextInput, Pressable, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Button, StyleSheet, Keyboard } from 'react-native';
import useUser from '../hooks/useUser';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Styling } from "../styles/styling"
import { reauthenticateWithPopup } from 'firebase/auth';

export default function MessagesScreen({ route }) {
  const messagesRef = collection(firestore, `${route.params?.collectionName}`);
  const messageQuery = query(messagesRef, orderBy('timestamp'), limit(25));
  const [messages] = useCollectionData(messageQuery, { idField: 'id' });
  const [messageToSend, setMessageToSend] = useState('');

  const { data } = useUser();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <FlatList
            data={messages}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
              return <Text style={[styles.messageBox]}>{item.message} -{item.user_name}</Text>;
            }}
          />
          <TextInput placeholder="Say something nice" style={styles.textInput} onChangeText={(text) => setMessageToSend(text)} />
          <Pressable
            disabled={messageToSend.length === 0}
            style={Styling.actionButton}
            onPress={() => {
              addDoc(messagesRef, {
                message: messageToSend,
                timestamp: serverTimestamp(),
                user_id: data.id,
                user_name: data.first_name,
                photo_url: data.photo_url,
              });
              setMessageToSend('');
            }}
          >
            <Text style={[Styling.actionButtonText, { textAlign: "center" }]}>SEND</Text>
          </Pressable>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    fontFamily: "OpenSans-Medium",
    fontSize: 16,
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
    textAlign: "center",
  },
  messageBox: {
    backgroundColor: '#B5B5B5',
    fontFamily: "OpenSans-Medium",
    borderRadius: 5,
    fontSize: 16,
    padding: 7,
    margin: 7,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 10,
    paddingRight: 10

    // textAlign: "center",
    // paddingLeft: 50,
    // paddingRight: 50,
    // marginRight: 15,
    // borderRadius: 5,
    // margin: 15,
  },
  messageText: {
    // backgroundColor: '#FCB90F',
    // fontSize: 20,
    // fontFamily: 'OpenSans-ExtraBold',
    textAlign: "right"
  },
});