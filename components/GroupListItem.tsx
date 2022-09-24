import * as React from 'react';
import { Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import { useState, useEffect } from 'react';
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

const isPrivate = (privacy: boolean) => {
  return privacy === false ? 'public' : 'private';
};

export default function GroupListItem({ singleGroup }) {
  const navigation = useNavigation();
  const [image, setImage] = useState('');

  useEffect(() => {
    if (singleGroup.photo_url) {
      const fileRef = ref(getStorage(), singleGroup.photo_url);
      getDownloadURL(fileRef)
        .then((res) => {
          setImage(res);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Group Details', {
          selectedGroup: singleGroup,
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
              fontWeight: '700',
            }}
          >
            {singleGroup.group_name}
          </Text>
          <Text
            style={{
              fontStyle: 'italic',
              color: '#8F8F8F',
            }}
          >
            {isPrivate(singleGroup.private) === 'private' ? 'Private Group' : 'Public Group'},{' '}
            {singleGroup.members_num} Members
          </Text>
          <Text>{shortenDescription(singleGroup.group_description)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
