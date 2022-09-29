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

export default function ListVenueItems({ singleVenue }) {
  const navigation = useNavigation();
  const [image, setImage] = useState('');

  useEffect(() => {
    (async () => {
      if (singleVenue.photo_url) {
        const imgUrl = await getImgUrl(singleVenue.photo_url);
        if (imgUrl) setImage(imgUrl);
      }
    })();
  }, []);

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
          paddingVertical: 10,
          paddingHorizontal: 5,
          backgroundColor: 'white',
        }}
      >
        <Image
          style={{
            height: height * 0.1,
            width: width * 0.25,
            marginRight: 10,
            borderRadius: 5
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
