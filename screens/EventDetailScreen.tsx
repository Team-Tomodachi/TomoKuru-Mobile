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

const { height, width } = Dimensions.get('screen');
const { getImgUrl } = firebaseUtils;

export default function EventDetailScreen({ navigation, route }) {
  const singleEvent = route.params.selectedEvent;
  const [image, setImage] = useState('');
  const [userJoined, setUserJoined] = useState(false);
  const { data } = useUser();

  const joinedEvents = useJoinedEvents().data;

  useEffect(() => {
    if (joinedEvents) {
      if (joinedEvents?.map((event) => event.id).includes(singleEvent.id)) setUserJoined(true);
    }
    (async () => {
      if (singleEvent.photo_url) {
        const imgUrl = await getImgUrl(singleEvent.photo_url);
        if (imgUrl) setImage(imgUrl);
      }
    })();
  }, []);

  return (
    <View>
      <ScrollView>
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
        <Text style={styles.title}> {singleEvent.name} </Text>
        <Text style={styles.details}> Group: {singleEvent.group_name} </Text>
        <Text style={styles.details}> {singleEvent.description} </Text>
        <Text style={styles.details}> Date: {new Date(Date.parse(singleEvent.start_time)).toLocaleDateString()} </Text>
        <Text style={styles.details}> Start Time: {new Date(Date.parse(singleEvent.start_time)).toLocaleTimeString()} </Text>
        <Text style={styles.details}> End Time: {singleEvent.end_time} </Text>
        <Text style={styles.details}> Capacity {singleEvent.capacity} </Text>
        <Text style={styles.details}> Venue: {singleEvent.location_name} </Text>
        <View>
          <EventAttendeeList eventID={singleEvent.id} />
        </View>
        <TouchableOpacity
          disabled={userJoined}
          onPress={() => {
            if (!data.id) {
              Alert.alert('Please Login to Join Events!');
              return;
            }
            setUserJoined(true);
            axios.post(`http://tomokuru.i-re.io/api/events/attendees/${singleEvent.id}/${data.id}`);
            Alert.alert(`You have joined the event: ${singleEvent.name}`);
          }}
          style={styles.button}
        >
          <Text style={styles.details}>Join This Event!</Text>
        </TouchableOpacity>
        {userJoined ? (
          <Pressable
            onPress={() =>
              navigation.navigate('Messages', {
                collectionName: `event_${singleEvent.id}`,
              })
            }
          >
            <Text>Messages</Text>
          </Pressable>
        ) : null}
        <Button title="Back" onPress={() => navigation.goBack()}></Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    height: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 30,
    // fontFamily: "OpenSans",
    textDecorationLine: 'underline',
  },
  details: {
    fontSize: 20,
    // fontFamily: "OpenSans",
  },
  detailsUnderlined: {
    fontSize: 20,
    // fontFamily: "OpenSans",
    textDecorationLine: 'underline',
  },
  image: {
    height: height * 0.3,
    width: width * 0.6,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 50,
    marginBottom: 20,
  },
});
