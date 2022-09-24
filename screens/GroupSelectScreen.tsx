import { Text, FlatList, Pressable } from 'react-native';
import React from 'react';
import { styles } from '../styles/styles';
import useUserCreatedGroup from '../hooks/useUserGroup';

export default function GroupSelectScreen({ navigation }) {
  const { data } = useUserCreatedGroup();

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            navigation.navigate({
              name: 'Create Event',
              params: { groupId: item.id, groupName: item.group_name },
            })
          }
          style={styles('bg:white', 'm:2', 'rounded:lg', 'p:2')}
        >
          <Text style={styles('text:2xl')}>{item.group_name}</Text>
          <Text style={styles('text:sm')}>{item.group_description}</Text>
        </Pressable>
      )}
      keyExtractor={(item) => String(item.id)}
    />
  );
}
