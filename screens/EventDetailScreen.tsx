import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';
import { useState, useEffect } from 'react';
import EventAttendeeList from '../components/EventAttendeeList';
import useUser from '../hooks/useUser';
import firebaseUtils from '../utils/firebaseUtils';
import axios from 'axios';
import useJoinedEvents from '../hooks/useJoinedEvent';
import useAuthStore from '../store/auth';
import { Styling } from "../styles/styling"

const { height, width } = Dimensions.get('screen');
const { getImgUrl } = firebaseUtils;

export default function EventDetailScreen({ navigation, route }) {
  const singleEvent = route.params?.selectedEvent;
  const [image, setImage] = useState('');
  const [userJoined, setUserJoined] = useState(false);
  const { id } = useUser().data;
  const { isUserSignedIn } = useAuthStore();
  const { data } = useJoinedEvents();

  useEffect(() => {
    if (data && isUserSignedIn) {
      const joinedId = data.map(event => event.id);
      if (joinedId.includes(singleEvent.id)) setUserJoined(true);
    }
    (async () => {
      if (singleEvent.photo_url) {
        const imgUrl = await getImgUrl(singleEvent.photo_url);
        if (imgUrl) setImage(imgUrl);
      }
    })();
  }, []);

  return (
    <ScrollView
      style={{
        backgroundColor: 'white',
      }}
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 5,
        }}
      >
        <Image
          style={styles.image}
          source={
            image.length === 0
              ? require('../assets/place-holder.jpg')
              : {
                uri: image,
              }
          }
        />
      </View>
      <View
        style={
          Styling.greyBox
        }
      >
        <Text style={styles.title}>{singleEvent.name}</Text>
        <Text style={styles.group}>{singleEvent.group_name}</Text>
        <Text style={styles.location}>{singleEvent.location_name} </Text>
        <Text style={styles.time}>
          {new Date(Date.parse(singleEvent.start_time)).toLocaleDateString()} - {new Date(Date.parse(singleEvent.start_time)).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
        {/* <Text style={styles.details}>End Time: {singleEvent.end_time} </Text> */}
        {/* <Text style={styles.details}>Capacity {singleEvent.capacity} </Text> */}
        <Text style={styles.details}>{singleEvent.description}</Text>
        <View>
          <EventAttendeeList eventID={singleEvent.id} />
        </View>
        {userJoined ? <TouchableOpacity
          onPress={() =>
            navigation.navigate('Messages', {
              collectionName: `event_${singleEvent.id}`,
            })
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Messages</Text>
        </TouchableOpacity> : <TouchableOpacity
          onPress={() => {
            if (!id) {
              Alert.alert('Please Login to Join Events!');
              return;
            }
            setUserJoined(true);
            axios.post(`http://tomokuru.i-re.io/api/events/attendees/${singleEvent.id}/${id}`);
            Alert.alert(`You have joined the event: ${singleEvent.name}`);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Join This Event</Text>
        </TouchableOpacity>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    // height: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCB90F',
    padding: 7,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontFamily: "OpenSans-Bold",
    marginBottom: 2,
  },
  details: {
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
  },
  group: {
    fontSize: 20,
    fontFamily: "OpenSans-BoldItalic",
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "OpenSans-Bold",
  },
  image: {
    height: height * 0.3,
    width: width * 0.9,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  time: {
    fontSize: 18,
    fontFamily: "OpenSans-MediumItalic",
    marginBottom: 5,
    color: "#4B4B4B",
  },
  location: {
    fontSize: 18,
    fontFamily: "OpenSans-SemiBold",
    marginTop: 5,
    color: "#4B4B4B",
  },
});
