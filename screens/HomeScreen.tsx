import React, { useEffect, useState } from "react";
import { Button, Image, ScrollView, Text, View } from "react-native";
import useAuthStore from "../store/auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import useUserStore from "../store/user";
import axios from "axios";
import Constants from "expo-constants";
import HListItem from "../components/HListItem";
import { styles } from "../styles/styles";

export default function HomeScreen({ navigation }) {
  const { isUserSignedIn, signUserOut } = useAuthStore();
  const [userCreatedGroups, setUserCreatedGroups] = useState([]);
  const [userCreatedEvents, setUserCreatedEvents] = useState([]);

  const { id } = useUserStore();

  useEffect(() => {
    axios
      .get(`${Constants?.expoConfig?.extra?.apiURL}/api/groups/${id}`)
      .then(res => setUserCreatedGroups(res.data));
    axios
      .get(`${Constants?.expoConfig?.extra?.apiURL}/api/events/user/${id}`)
      .then(res => setUserCreatedEvents(res.data));
  }, [isUserSignedIn]);

  return (
    <View style={styles("flex:1", "justify:center", "items:center", "p:1")}>
      {isUserSignedIn ? (
        <>
          <View
            style={styles(
              "w:full",
              "flex:row",
              "justify:between",
              "items:center",
            )}>
            <Text style={styles("text:2xl")}>Your groups</Text>
            <Button title="See More"></Button>
          </View>
          <ScrollView style={{ height: 200, flexGrow: 0 }} horizontal={true}>
            <>
              {userCreatedGroups.map(group => {
                return (
                  <HListItem
                    imageUrl={group.photo_url}
                    name={group.group_name}
                  />
                );
              })}
            </>
          </ScrollView>
          <Button
            onPress={() => navigation.navigate("Create Group")}
            title="Create Group"
          />
          <View
            style={styles(
              "w:full",
              "flex:row",
              "justify:between",
              "items:center",
            )}>
            <Text style={styles("text:2xl")}>Your events</Text>
            <Button title="See More"></Button>
          </View>
          <ScrollView style={{ height: 200, flexGrow: 0 }} horizontal={true}>
            <>
              {userCreatedEvents.map(event => {
                return (
                  <HListItem imageUrl={event.photo_url} name={event.name} />
                );
              })}
            </>
          </ScrollView>
          <Button
            onPress={() => navigation.navigate("Create Event")}
            title="Create Event"
          />
          <Button
            title="Sign Out"
            onPress={async () => {
              try {
                await signOut(auth);
                signUserOut();
              } catch (error) {
                console.log(error);
              }
            }}
          />
        </>
      ) : (
        <Button
          onPress={() => navigation.navigate("Modal User")}
          title="Sign In"
        />
      )}
    </View>
  );
}
