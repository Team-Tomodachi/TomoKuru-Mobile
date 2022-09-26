import React, { useEffect, useState } from 'react';
import { Button, FlatList, ScrollView, Text, View } from 'react-native';
import useAuthStore from '../../store/auth';
import useUserStore from '../../store/user';
import axios from 'axios';
import Constants from 'expo-constants';
import HListItem from '../../components/HListItem';
import { styles } from '../../styles/styles';
import useUser from '../../hooks/useUser';

export default function HomeScreen({ navigation }) {
  const { isUserSignedIn } = useAuthStore();
  const [userCreatedGroups, setUserCreatedGroups] = useState([]);
  const [userCreatedEvents, setUserCreatedEvents] = useState([]);

  const { data } = useUser();
  useEffect(() => {
    if (data) {
      axios
        .get(`${Constants?.expoConfig?.extra?.apiURL}/api/users/${data.id}/groups/creator`)
        .then((res) => setUserCreatedGroups(res.data));
      axios
        .get(`${Constants?.expoConfig?.extra?.apiURL}/api/users/${data.id}/events/creator`)
        .then((res) => setUserCreatedEvents(res.data));
    }
  }, []);

  return (
    <View style={styles('w:full', 'flex:1', 'justify:center', 'items:center', 'p:1')}>
      {isUserSignedIn ? (
        <View>
          <View style={styles('flex:row', 'justify:between', 'items:center')}>
            <Text style={styles('text:2xl')}>Your groups</Text>
            <Button title="See More"></Button>
          </View>
          <View style={{ height: 200, flexGrow: 0 }}>
            <FlatList
              horizontal={true}
              data={userCreatedGroups}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return <HListItem imgUrl={item.photo_url} name={item.group_name} />;
              }}
            />
          </View>
          <Button onPress={() => navigation.navigate('Create Group')} title="Create Group" />
          <View style={styles('flex:row', 'justify:between', 'items:center')}>
            <Text style={styles('text:2xl')}>Your events</Text>
            <Button title="See More"></Button>
          </View>
          <View style={{ height: 200, flexGrow: 0 }}>
            <FlatList
              horizontal={true}
              data={userCreatedEvents}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return <HListItem imgUrl={item.photo_url} name={item.name} />;
              }}
            />
          </View>
          <Button onPress={() => navigation.navigate('Create Event Stack')} title="Create Event" />
        </View>
      ) : (
        <Button onPress={() => navigation.navigate('Modal User')} title="Sign In" />
      )}
    </View>
  );
}
