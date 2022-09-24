import * as React from 'react';
import { Text, View, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import { styles } from '../styles/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('screen');

const shortenDescription = (description: any) => {
  if (!description) {
    return 'description is empty';
  } else if (description.length > 120) {
    return description.slice(0, 120) + '...';
  } else {
    return description;
  }
};

export default function ListVenueItems({ singleVenue }) {
  const [image, setImage] = useState('');

  // useEffect(() => {
  //   if (!singleVenue.photo_url) {
  //     setImage(
  //       'https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg',
  //     );
  //   } else {
  //     const fileRef = ref(getStorage(), singleVenue.photo_url);
  //     getDownloadURL(fileRef).then((res) => {
  //       setImage(res);
  //     });
  //   }
  // });
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Venue Details', {
          selectedVenue: singleVenue,
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
        {/* <Image
          style={{
            height: height * 0.1,
            width: width * 0.2,
            marginTop: 20,
            marginLeft: 20,
            marginRight: 50,
            marginBottom: 20,
          }}
          source={{
            uri: image,
          }}
        /> */}

        <View
          style={{
            flexDirection: 'column',
            width: width * 0.5,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '700' }}>{singleVenue.location_name}</Text>
          <Text style={{ fontStyle: 'italic', color: '#8F8F8F' }}>{singleVenue.venue_type}</Text>
          <Text style={{ fontStyle: 'italic', color: '#8F8F8F' }}>
            {singleVenue.prefecture} , {singleVenue.city_ward}
          </Text>
          <Text>{shortenDescription(singleVenue.description)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
