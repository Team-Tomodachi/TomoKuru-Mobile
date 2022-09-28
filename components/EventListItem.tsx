import * as React from 'react';
import { Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import firebaseUtils from '../utils/firebaseUtils';

const { height, width } = Dimensions.get('screen');
const { getImgUrl } = firebaseUtils;

const shortenDescription = (description: any) => {
  if (!description) {
    return 'description is empty';
  } else if (description.length > 120) {
    return description.slice(0, 120) + '...';
  } else {
    return description;
  }
};

export default function EventListItem({ singleEvent }) {
  const navigation = useNavigation();
  const [image, setImage] = useState('');

  useEffect(() => {
    (async () => {
      if (singleEvent?.photo_url) {
        const imgUrl = await getImgUrl(singleEvent?.photo_url);
        if (imgUrl) setImage(imgUrl);
      }
    })();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Event Details', {
          selectedEvent: singleEvent,
        });
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 0,
          borderRadius: 5,
          margin: 10,
          marginLeft: 15,
          marginRight: 15,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: 'white',
        }}
      >
        <Image
          style={{
            height: height * 0.1,
            width: width * 0.2,
            marginTop: 20,
            marginLeft: 20,
            marginRight: 50,
            marginBottom: 20,
          }}
          source={
            image.length === 0
              ? require('../assets/place-holder.jpg')
              : {
                uri: image,
              }
          }
        />
        <View
          style={{
            flexDirection: 'column',
            width: width * 0.5,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              // fontFamily: "OpenSans",
              fontWeight: '700',
            }}
          >
            {singleEvent?.name}
          </Text>
          <Text
            style={{
              // fontFamily: "OpenSans",
              fontStyle: 'italic',
              color: '#8F8F8F',
            }}
          >
            Date: {new Date(Date.parse(singleEvent?.start_time)).toLocaleDateString()}
          </Text>
          <Text>{shortenDescription(singleEvent?.description)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
