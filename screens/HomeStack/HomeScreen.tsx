import React from 'react';
import { Button, Pressable, ScrollView, Text, View } from 'react-native';
import useAuthStore from '../../store/auth';
import { styles } from '../../styles/styles';
import { Styling } from '../../styles/styling';
import UserCreatedGroupsList from '../../components/UserCreatedGroupsList';
import UserCreatedEventsList from '../../components/UserCreatedEventsList';

export default function HomeScreen({ navigation }) {
  const { isUserSignedIn } = useAuthStore();

  return (
    <ScrollView>
      {isUserSignedIn ? (
        <View style={styles('flex:1', 'justify:center', 'items:center')}>
          <View style={styles('flex:row', 'justify:between', 'items:center')}>
            <Text style={styles('text:2xl')}>Your groups</Text>
            <Button title="See More"></Button>
          </View>
          <View style={{ height: 200, flexGrow: 0 }}>
            <UserCreatedGroupsList />
          </View>
          <Button onPress={() => navigation.navigate('Create Group')} title="Create Group" />
          <View style={styles('flex:row', 'justify:between', 'items:center')}>
            <Text style={styles('text:2xl')}>Your events</Text>
            <Button title="See More"></Button>
          </View>
          <View style={{ height: 200, flexGrow: 0 }}>
            <UserCreatedEventsList />
          </View>
          <Button onPress={() => navigation.navigate('Create Event Stack')} title="Create Event" />
        </View>
      ) : (
        <>
          <Text style={Styling.tomoLogo}>
            Tomo<Text style={Styling.kuruLogo}>Kuru</Text>
          </Text>
          <View style={Styling.greyBox}>
            <Text style={Styling.sectionText}>
              <Text style={Styling.tomoNoSize}>
                Tomo<Text style={Styling.kuruNoSize}>Kuru</Text>
              </Text>{' '}
              is an app where you can join groups, browse events, and connect with venues to find
              the best place to host your social gatherings!
            </Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate('Modal User', { screen: 'Sign In' })}
            style={Styling.actionButton}
          >
            <Text style={Styling.actionButtonText}>SIGN IN</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Modal User', { screen: 'Sign Up' })}
            style={[Styling.actionButton, { backgroundColor: '#CC960C' }]}
          >
            <Text style={[Styling.actionButtonText, { backgroundColor: '#CC960C' }]}>SIGN UP</Text>
          </Pressable>
        </>
      )}
    </ScrollView>
  );
}
