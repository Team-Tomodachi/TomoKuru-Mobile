import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/styles';
import { Chip, TextInput } from 'react-native-paper';
import axios from 'axios';
import Constants from 'expo-constants';

export default function TagSelect({ navigation }) {
  const [tags, setTags] = useState<Array<object> | undefined>();

  useEffect(() => {
    axios.get(`${Constants?.expoConfig?.extra?.apiURL}/api/tags/`).then((res) => setTags(res.data));
  }, []);

  return (
    <View style={styles('flex:1', 'justify:center')}>
      <View style={styles('flex:wrap', 'flex:row', 'flex:1', 'flex:grow', 'mb:5')}>
        {tags?.map((tag, index) => {
          return (
            <Chip
              style={styles('m:1')}
              key={tag.id}
              onPress={() =>
                navigation.navigate('Groups', {
                  selectedTag: tags[index].tag,
                })
              }
            >
              {tag.tag}
            </Chip>
          );
        })}
      </View>
    </View>
  );
}
