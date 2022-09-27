import { FlatList } from 'react-native';
import React from 'react';
import EventListItem from '../../components/EventListItem';
import useUserCreatedEvents from '../../hooks/useUserEvent';

export default function UserCreatedEventsScreen() {
  const { data } = useUserCreatedEvents();

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return <EventListItem singleEvent={item} />;
      }}
      keyExtractor={(item) => item.id}
    />
  );
}
