import { useState } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import { styles } from '../styles/styles';
import useUser from '../hooks/useUser';

export default function Messages() {
  const messagesRef = collection(firestore, 'event_a319070e-b918-46e1-858a-3e6f87bc1965');
  const messageQuery = query(messagesRef, orderBy('timestamp'), limit(25));
  const [messages] = useCollectionData(messageQuery, { idField: 'id' });
  const [messageToSend, setMessageToSend] = useState('');

  const sendMessage = async () => {
    const { data } = useUser();

    if (data) {
      try {
        await addDoc(messagesRef, {
          message: messageToSend,
          timestamp: serverTimestamp(),
          user_id: data.id,
          name: data.first_name,
          photo_url: data.photo_url,
        });
      } catch (error) {
        console.log(error);
      }
    }

    setMessageToSend('');
  };

  return (
    <>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          return <Text style={styles('border:1', 'p:2', 'rounded:md', 'm:2')}>{item.message}</Text>;
        }}
      />
      <View style={styles('flex:row')}>
        <TextInput
          style={styles('border:1', 'h:16', 'flex:1')}
          placeholder="Your message"
          onChangeText={(text) => setMessageToSend(text)}
        />
        <Button title="Send message" onPress={sendMessage} />
      </View>
    </>
  );
}
