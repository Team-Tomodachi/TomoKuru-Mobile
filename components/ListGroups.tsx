import { View, Dimensions, FlatList } from 'react-native';
import { styles } from '../styles/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';
import { Searchbar, Chip } from 'react-native-paper';
import GroupListItem from './GroupListItem';

export default function ListGroups({ navigation }) {
  const [query, setQuery] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    filterGroup(query, tag);
  }, [query, tag]);

  const isPrivate = (privacy: boolean) => {
    return privacy === false ? 'public' : 'private';
  };

  const filterGroup = (query: string, tag: string) => {
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

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={(text) => {
          setQuery(text);
        }}
        value={query}
      />
      <Chip mode="outlined" style={styles('w:28')} icon="tag">
        {tag.length === 0 ? 'any tags' : tag}
      </Chip>
      <FlatList
        data={groupData}
        renderItem={({ item }) => {
          return <GroupListItem singleGroup={item} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
