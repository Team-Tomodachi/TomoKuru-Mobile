import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import HListItem from "./HListItem";
import useUser from "../hooks/useUser";
import Constants from "expo-constants";
import axios from "axios";

export default function HorizontalList() {
  const [userCreatedEvents, setUserCreatedEvents] = useState([]);
  const { data } = useUser();
  const { id } = data;
  if (id) {
    axios
      .get(`${Constants?.expoConfig?.extra?.apiURL}/api/events/user/${id}`)
      .then(res => setUserCreatedEvents(res.data));
  }

  return (
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
  );
}
