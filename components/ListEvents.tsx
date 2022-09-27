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
    <View>
      <ScrollView style={{ backgroundColor: 'rgba(182, 182, 182, 1)' }}>
        {eventData.map((event, index) => {
          return <EventListItem singleEvent={event} key={index} />;
        })}
      </ScrollView>
    </View>
  );
}
