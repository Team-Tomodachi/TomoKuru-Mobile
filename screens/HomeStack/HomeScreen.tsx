import React, { useState } from 'react';
import { Button, ScrollView, Text, View, Pressable, StyleSheet } from 'react-native';
import useAuthStore from '../../store/auth';
import axios from 'axios';
import Constants from 'expo-constants';
import HListItem from '../../components/HListItem';
import HorizontalList from '../../components/HorizontalList';
import { styles } from '../../styles/styles';
import useUser from '../../hooks/useUser';

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
          <Button onPress={() => navigation.navigate('Modal User')} title="Sign In" />
          <Pressable
            onPress={() => navigation.navigate('Modal User', { screen: 'Sign Up' })}
            style={[componentStyles.yellow, styles(

              'rounded:lg',
              'p:2',
              'flex:row',
              'justify:evenly',
              'm:2',
            )]}
          >
            <Text style={componentStyles.yellow}>SIGN UP</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const componentStyles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',

  },
  yellow: {
    backgroundColor: "#FCB90F",
    fontSize: 20,
    fontFamily: 'OpenSans-Bold'
  },
});