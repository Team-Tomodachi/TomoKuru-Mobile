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
  Pressable,
} from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import GroupMemberList from '../components/GroupMemberList';
import useUser from '../hooks/useUser';
import firebaseUtils from '../utils/firebaseUtils';
import useJoinedGroups from '../hooks/useJoinedGroup';
import { Styling } from "../styles/styling"
import useAuthStore from '../store/auth';

const { height, width } = Dimensions.get('screen');
const { getImgUrl } = firebaseUtils;

export default function GroupDetailScreen({ navigation, route }) {
  const singleGroup = route.params.selectedGroup;
  const { id } = useUser().data;
  const [image, setImage] = useState('');
  const [userJoined, setUserJoined] = useState(false);
  const { isUserSignedIn } = useAuthStore();
  const { data } = useJoinedGroups();

  useEffect(() => {
    if (data && isUserSignedIn) {
      const joinedId = data.map(group => group.id);
      setUserJoined(joinedId.includes(singleGroup.id));
    }
    (async () => {
      if (singleGroup.photo_url) {
        const imgUrl = await getImgUrl(singleGroup.photo_url);
        if (imgUrl) setImage(imgUrl);
      }
    })();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      style={{
        backgroundColor: 'white',
      }}
    >
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
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
        {userJoined ? <TouchableOpacity
          onPress={() =>
            navigation.navigate('Messages', {
              collectionName: `group_${singleGroup.id}`,
            })
          }
          style={styles.button}
        >
          <Text style={styles.details}>Message</Text>
        </TouchableOpacity> : <TouchableOpacity
          onPress={() => {
            if (!id) {
              Alert.alert('Please Login to Join Groups!');
              return;
            }
            setUserJoined(true);
            axios.post(`http://tomokuru.i-re.io/api/groups/members/${singleGroup.id}/${id}`);
            Alert.alert(`You have joined ${singleGroup.group_name}`);
          }}
          style={styles.button}
        >
          <Text style={styles.details}>Join This Group</Text>
        </TouchableOpacity>}
        <Button title="Back" onPress={() => navigation.goBack()}></Button>
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
