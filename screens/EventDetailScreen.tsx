import * as React from 'react';
import { Text, View, ScrollView, Dimensions, Button, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';
import EventAttendeeList from '../components/EventAttendeeList';
import useUser from '../hooks/useUser';
import firebaseUtils from '../utils/firebaseUtils';

const { height, width } = Dimensions.get('screen');
const { getImgUrl } = firebaseUtils;

export default function EventDetailScreen({ navigation, route }) {
  const singleEvent = route.params.selectedEvent;

  const [image, setImage] = useState('');

  useEffect(() => {
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
        <Text style={styles.details}> Date: {singleEvent.date} </Text>
        <Text style={styles.details}> Start Time: {singleEvent.start_time} </Text>
        <Text style={styles.details}> End Time: {singleEvent.end_time} </Text>
        <Text style={styles.details}> Capacity {singleEvent.capacity} </Text>
        <Text style={styles.details}> Venue: {singleEvent.location_name} </Text>
        <EventAttendeeList />
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