import { FlatList } from 'react-native';
import React from 'react';
import HListItem from './HListItem';
import useUserCreatedEvents from '../hooks/useUserEvent';

export default function UserCreatedEventsList() {
  const { data } = useUserCreatedEvents();

  if (data) {
    return (
      <FlatList
        horizontal={true}
        data={data}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          return <HListItem imgUrl={item?.photo_url} name={item?.name} />;
        }}
      />
    );
  }
}
