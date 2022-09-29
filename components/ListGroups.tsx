import { FlatList, Button, View } from 'react-native';
import { styles } from '../styles/styles';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';
import { Searchbar, Chip } from 'react-native-paper';
import GroupListItem from './GroupListItem';

export default function ListGroups({ navigation, route }) {
  const [query, setQuery] = useState<string | undefined>();
  const [tag, setTag] = useState<string | undefined>();
  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    filterGroup(query, tag);
  }, [query, tag]);

  useEffect(() => {
    setTag(route.params?.selectedTag);
  }, [route.params?.selectedTag]);

  const isPrivate = (privacy: boolean) => {
    return privacy === false ? 'public' : 'private';
  };

  const filterGroup = (query: string | undefined, tag: string | undefined) => {
    axios
      .get(`${Constants?.expoConfig?.extra?.apiURL}/api/groups`, {
        params: {
          query: query?.toLocaleLowerCase(),
          tag: tag,
        },
      })
      .then((response) => {
        setGroupData(response.data);
      });
  };

  const resetFilter = () => {
    setQuery(undefined);
    setTag(undefined);
  };

  return (
    <>
      <Searchbar
        style={{ marginBottom: 5 }}
        placeholder="Search"
        onChangeText={(text) => {
          setQuery(text);
        }}
        value={query ? query : ''}
      />
      <View style={styles('flex:row')}>
        <Button color={'#FCB90F'} title="Reset" onPress={resetFilter} />
        <Chip mode="outlined" icon="tag" onPress={() => navigation.navigate('Tags', {
          prevScreen: "Groups"
        })}>
          {tag ? tag : 'any tags'}
        </Chip>
      </View>

      <FlatList
        data={groupData}
        renderItem={({ item }) => {
          return <GroupListItem singleGroup={item} />;
        }}
        keyExtractor={(item, index) => index}
      />
    </>
  );
}
