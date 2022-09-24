import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import useAuthStore from "../store/auth";
import useUserStore from "../store/user";
import axios from "axios";
import Constants from "expo-constants";
import HListItem from "../components/HListItem";
import { styles } from "../styles/styles";
import useUser from "../hooks/useUser";

export default function HomeScreen({ navigation }) {
  const { isUserSignedIn } = useAuthStore();
  const [userCreatedGroups, setUserCreatedGroups] = useState([]);
  const [userCreatedEvents, setUserCreatedEvents] = useState([]);

  const { data } = useUser();

  useEffect(() => {
    const { id } = data;
    axios
      .get(`${Constants?.expoConfig?.extra?.apiURL}/api/groups/${id}`)
      .then(res => setUserCreatedGroups(res.data));
    axios
      .get(`${Constants?.expoConfig?.extra?.apiURL}/api/events/user/${id}`)
      .then(res => setUserCreatedEvents(res.data));
  }, [isUserSignedIn]);

  return (
    <View
      style={styles(
        "w:full",
        "flex:1",
        "justify:center",
        "items:center",
        "p:1",
      )}>
      {isUserSignedIn ? (
        <View>
          <View style={styles("flex:row", "justify:between", "items:center")}>
            <Text style={styles("text:2xl")}>Your groups</Text>
            <Button title="See More"></Button>
          </View>
          <ScrollView style={{ height: 200, flexGrow: 0 }} horizontal={true}>
            <>
              {userCreatedGroups?.map((group, index) => {
                return (
                  <HListItem
                    key={index}
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
          <View style={styles("flex:row", "justify:between", "items:center")}>
            <Text style={styles("text:2xl")}>Your events</Text>
            <Button title="See More"></Button>
          </View>
          <ScrollView style={{ height: 200, flexGrow: 0 }} horizontal={true}>
            <>
              {userCreatedEvents?.map((event, index) => {
                return (
                  <HListItem
                    key={index}
                    imageUrl={event.photo_url}
                    name={event.name}
                  />
                );
              })}
            </>
          </ScrollView>
          <Button
            onPress={() => navigation.navigate("Create Event Stack")}
            title="Create Event"
          />
        </View>
      ) : (
        <Button
          onPress={() => navigation.navigate("Modal User")}
          title="Sign In"
        />
      )}
    </View>
  );
}
