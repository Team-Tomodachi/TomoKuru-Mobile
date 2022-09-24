import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import GroupMemberList from '../components/GroupMemberList';
import useUser from '../hooks/useUser';

const { height, width } = Dimensions.get('screen');

export default function GroupDetailScreen({ navigation, route }) {
  const singleGroup = route.params.selectedGroup;
  const { data } = useUser();
  const [image, setImage] = useState('');

  useEffect(() => {
    if (singleGroup.photo_url) {
      const fileRef = ref(getStorage(), singleGroup.photo_url);
      getDownloadURL(fileRef).then((res) => {
        setImage(res);
      });
    }
  }, []);

  return (
    <View>
      <ScrollView
        style={{
          backgroundColor: 'white',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 20,
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
        <Text style={styles.title}>{singleGroup.group_name} </Text>
        <Text style={styles.details}>{singleGroup.group_description} </Text>
        <Text style={styles.detailsUnderlined}>Group Leader: {singleGroup.group_leader} </Text>
        <Text style={styles.detailsUnderlined}>Privacy:{singleGroup.private} </Text>
        <GroupMemberList groupID={singleGroup.id} />
        <TouchableOpacity
          onPress={() => {
            if (!data?.id) {
              Alert.alert('Please Login to Join Groups!');
            } else {
              axios.post(`http://tomokuru.i-re.io/api/groups/${singleGroup.id}/${data.id}!`);
              Alert.alert(`You have joined ${singleGroup.group_name}`);
            }
          }}
          style={styles.button}
        >
          <Text style={styles.details}>Join This Group</Text>
        </TouchableOpacity>
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
