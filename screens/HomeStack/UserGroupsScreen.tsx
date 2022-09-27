import { FlatList } from 'react-native';
import React from 'react';
import useUserCreatedGroup from '../../hooks/useUserGroup';
import GroupListItem from '../../components/GroupListItem';

export default function UserCreatedGroupsScreen() {
  const { data } = useUserCreatedGroup();

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return <GroupListItem singleGroup={item} />;
      }}
      keyExtractor={(item) => item.id}
    />
  );
}
