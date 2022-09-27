import { FlatList } from 'react-native';
import React from 'react';
import useUserCreatedGroup from '../hooks/useUserGroup';
import HListItem from './HListItem';

export default function UserCreatedGroupsList() {
  const { data } = useUserCreatedGroup();

  if (data) {
    return (
      <FlatList
        horizontal={true}
        data={data}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          return <HListItem imgUrl={item?.photo_url} name={item?.group_name} />;
        }}
      />
    );
  }
}
