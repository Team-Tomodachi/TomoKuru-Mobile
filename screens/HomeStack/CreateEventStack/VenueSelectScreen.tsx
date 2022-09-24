import { View, Text, FlatList, Pressable } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { styles } from '../../../styles/styles';

export default function VenueSelectScreen({ navigation }) {
  const allVenues = useQuery(['allVenues'], () =>
    axios.get('http://tomokuru.i-re.io/api/venues').then((res) => res.data),
  );

  return (
    <FlatList
      data={allVenues.data}
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            navigation.navigate({
              name: 'Create Event',
              params: { venueId: item.id, venueName: item.location_name },
            })
          }
          style={styles('bg:white', 'm:2', 'rounded:lg', 'p:2')}
        >
          <Text style={styles('text:2xl')}>{item.location_name}</Text>
          <Text style={styles('text:sm')}>{item.address}</Text>
        </Pressable>
      )}
      keyExtractor={(item) => String(item.id)}
    />
  );
}
