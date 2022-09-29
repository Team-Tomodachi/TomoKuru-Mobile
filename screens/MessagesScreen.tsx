import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc, query, orderBy, limit, serverTimestamp, DocumentData } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { View, Text, FlatList, TextInput, Pressable, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Button, StyleSheet, Keyboard } from 'react-native';
import useUser from '../hooks/useUser';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Styling } from "../styles/styling"
import { reauthenticateWithPopup } from 'firebase/auth';
import { GiftedChat } from 'react-native-gifted-chat';
import * as R from 'remeda';
import { uuidv4 } from '@firebase/util';

export default function MessagesScreen({ route }) {
  const messagesRef = collection(firestore, `${route.params?.collectionName}`);
  const messageQuery = query(messagesRef, orderBy('timestamp'), limit(25));
  const [messages] = useCollectionData(messageQuery, { idField: 'id' });
  const [messageToSend, setMessageToSend] = useState('');
  const [messagesToShow, setMessagesToShow] = useState([]);

  const getMessage = (firebaseMessage: DocumentData) => {
    const data = {
      _id: `${uuidv4()}`,
      text: firebaseMessage.message,
      createdAt: new Date(firebaseMessage?.timestamp?.seconds),
      user: {
        _id: firebaseMessage.user_id,
        name: firebaseMessage.user_name,
      }
    }

    return data
  }

  useEffect(() => {
    console.log(messages)
    if (messages) {
      const temp = [];
      for (let value of messages) {
        temp.push(getMessage(value));
      }
      setMessagesToShow(temp.reverse());
    }
  }, [messages])


  const { data } = useUser();

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   style={styles.container}>
    //   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    //     <>
    //       <FlatList
    //         data={messages}
    //         keyExtractor={(item, index) => index}
    //         renderItem={({ item }) => {
    //           return <Text style={[Styling.actionButton]}>{item.message} -{item.user_name}</Text>;
    //         }}
    //       />
    //       <TextInput placeholder="Message" style={styles.textInput} onChangeText={(text) => setMessageToSend(text)} value={messageToSend} />
    //       <Pressable
    //         disabled={messageToSend.length === 0}
    //         style={Styling.actionButton}
    //         onPress={() => {
    //           addDoc(messagesRef, {
    //             message: messageToSend,
    //             timestamp: serverTimestamp(),
    //             user_id: data.id,
    //             user_name: data.first_name,
    //             photo_url: data.photo_url,
    //           });
    //           setMessageToSend('');
    //         }}
    //       >
    //         <Text style={Styling.actionButtonText}>SEND</Text>
    //       </Pressable>
    //     </>
    //   </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
    <GiftedChat
      messages={messagesToShow}
      onSend={messages =>
        addDoc(messagesRef, {
          message: messages[0].text,
          timestamp: new Date(),
          user_id: data.id,
          user_name: data.first_name,
          photo_url: data.photo_url,
        })}
      user={{
        _id: data.id,
      }}
    />
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
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});