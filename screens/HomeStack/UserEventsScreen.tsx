import { FlatList } from 'react-native';
import React from 'react';
import EventListItem from '../../components/EventListItem';
import useUserCreatedEvents from '../../hooks/useUserEvent';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import useJoinedEvents from '../../hooks/useJoinedEvent';

const Tab = createMaterialTopTabNavigator();

function CreatedEvents() {
  const { data } = useUserCreatedEvents();

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return <EventListItem singleEvent={item} />;
      }}
      keyExtractor={(item, index) => index}
    />
  );
}

function JoinedEvents() {
  const { data } = useJoinedEvents();

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return <EventListItem singleEvent={item} />;
      }}
      keyExtractor={(item, index) => index}
    />
  );
}

export default function UserEventsScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Creator" component={CreatedEvents} />
      <Tab.Screen name="Attendee" component={JoinedEvents} />
    </Tab.Navigator>
  );
}
