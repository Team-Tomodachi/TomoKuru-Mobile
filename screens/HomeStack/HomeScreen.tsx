import React, { useState } from 'react';
import { Button, ScrollView, Text, View, Pressable } from 'react-native';
import useAuthStore from '../../store/auth';
import axios from 'axios';
import Constants from 'expo-constants';
import HListItem from '../../components/HListItem';
import HorizontalList from '../../components/HorizontalList';
import { styles } from '../../styles/styles';
import useUser from '../../hooks/useUser';
import { Styling } from "../../styles/styling"

export default function HomeScreen({ navigation }) {
  const { isUserSignedIn } = useAuthStore();
  const [userCreatedGroups, setUserCreatedGroups] = useState([]);

  const { data } = useUser();
  const { id } = data;
  if (id) {
    axios
      .get(`${Constants?.expoConfig?.extra?.apiURL}/api/groups/${id}`)
      .then((res) => setUserCreatedGroups(res.data));
  }

  return (
    <View style={styles('w:full', 'flex:1', 'justify:center', 'items:center', 'p:1')}>

      {isUserSignedIn ? (
        <View>
          <View style={styles('flex:row', 'justify:between', 'items:center')}>
            <Text style={styles('text:2xl')}>Your groups</Text>
            <Button title="See More"></Button>
          </View>
          <ScrollView style={{ height: 200, flexGrow: 0 }} horizontal={true}>
            <>
              {userCreatedGroups?.map((group, index) => {
                return <HListItem key={index} imageUrl={group.photo_url} name={group.group_name} />;
              })}
            </>
          </ScrollView>
          <Button onPress={() => navigation.navigate('Create Group')} title="Create Group" />
          <View style={styles('flex:row', 'justify:between', 'items:center')}>
            <Text style={styles('text:2xl')}>Your events</Text>
            <Button title="See More"></Button>
          </View>
          <HorizontalList />
          <Button onPress={() => navigation.navigate('Create Event Stack')} title="Create Event" />
        </View>
      ) : (
        <>
          <Text style={Styling.tomoLogo}>Tomo<Text style={Styling.kuruLogo}>Kuru</Text></Text>
          <View style={Styling.greyBox}>
            <Text style={Styling.sectionText}><Text style={Styling.tomoNoSize}>Tomo<Text style={Styling.kuruNoSize}>Kuru</Text></Text> is an app where you can join groups, browse events, and connect with venues to find the best place to host your social gatherings!</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate('Modal User', { screen: 'Sign In' })}
            style={Styling.actionButton}
          >
            <Text style={Styling.actionButtonText}>SIGN IN</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Modal User', { screen: 'Sign Up' })}
            style={[Styling.actionButton, { backgroundColor: "#CC960C" }]}
          >
            <Text style={[Styling.actionButtonText, { backgroundColor: "#CC960C" }]}>SIGN UP</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}