import * as React from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EventListItem from './EventListItem';

export default function ListEvents({ navigation }) {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    axios.get('http://tomokuru.i-re.io/api/events').then(function (response) {
      setEventData(response.data);
    });
  }, []);

  return (
    <FlatList
      data={eventData}
      keyExtractor={(item, index) => index}
      renderItem={({ item }) => {
        return <EventListItem singleEvent={item} />;
      }}
    />
  );
}
