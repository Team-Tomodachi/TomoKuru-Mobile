import { FlatList } from 'react-native';
import React from 'react';
import useUserCreatedGroup from '../../hooks/useUserGroup';
import GroupListItem from '../../components/GroupListItem';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import useJoinedGroups from '../../hooks/useJoinedGroup';

const Tab = createMaterialTopTabNavigator();

function CreatedGroups() {
  const { data } = useUserCreatedGroup();

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return <GroupListItem singleGroup={item} />;
      }}
      keyExtractor={(item, index) => index}
    />
  );
}

function JoinedGroups() {
  const { data } = useJoinedGroups();

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

export default function UserGroupsScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Leader" component={CreatedGroups} />
      <Tab.Screen name="Member" component={JoinedGroups} />
    </Tab.Navigator>
  );
}
