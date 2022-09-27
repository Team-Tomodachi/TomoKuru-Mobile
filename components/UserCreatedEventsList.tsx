import { ScrollView } from 'react-native';
import React from 'react';
import HListItem from './HListItem';
import useUserCreatedEvents from '../hooks/useUserEvent';

export default function UserCreatedEventsList() {
  const { data } = useUserCreatedEvents();

  if (data) {
    return (
      <ScrollView>
        {data?.map((item, index) => {
          return <HListItem key={index} imgUrl={item?.photo_url} name={item?.name} />;
        })}
      </ScrollView>
    );
  }
}
