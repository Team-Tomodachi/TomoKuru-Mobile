import React from 'react';
import { Button, Pressable, ScrollView, Text, View } from 'react-native';
import useAuthStore from '../../store/auth';
import { styles } from '../../styles/styles';
import { Styling } from '../../styles/styling';

export default function HomeScreen({ navigation }) {
  const { isUserSignedIn } = useAuthStore();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      {
        isUserSignedIn ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Pressable
              style={Styling.actionButton}
              onPress={() => navigation.navigate('User Groups')}
            >
              <Text style={Styling.actionButtonText}>MY GROUPS</Text>
            </Pressable>
            <Pressable
              style={[Styling.actionButton, { marginBottom: 50 }]}
              onPress={() => navigation.navigate('User Events')}
            >
              <Text style={Styling.actionButtonText}>MY EVENTS</Text>
            </Pressable>

            <Pressable
              style={Styling.actionButton}
              onPress={() => navigation.navigate('Create Group Stack')}
            >
              <Text style={Styling.actionButtonText}>CREATE GROUP</Text>
            </Pressable>
            <Pressable
              style={Styling.actionButton}
              onPress={() => navigation.navigate('Create Event Stack')}
            >
              <Text style={Styling.actionButtonText}>CREATE EVENT</Text>
            </Pressable>


          </View>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
              onPress={() => navigation.navigate('Modal User', { screen: 'Sign up' })}
              style={[Styling.actionButton, { backgroundColor: '#CC960C' }]}
            >
              <Text style={[Styling.actionButtonText, { backgroundColor: '#CC960C' }]}>SIGN UP</Text>
            </Pressable>
          </View>
        )
      }
    </ScrollView >
  );
}
