import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc, query, orderBy, limit, serverTimestamp, DocumentData } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { StyleSheet } from 'react-native';
import useUser from '../hooks/useUser';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
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
      renderBubble={props => (
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              backgroundColor: '#fff',
            },
            right: {
              backgroundColor: '#FCB90F',
            },
          }}
          textStyle={{
            left: {
              color: '#000',
            },
            right: {
              color: '#000',
            },
          }}
        />
      )}
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