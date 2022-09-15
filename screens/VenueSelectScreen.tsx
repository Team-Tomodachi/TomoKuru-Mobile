import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";

const venues = [
  { id: 1, venueName: "SpikeZ" },
  { id: 2, venueName: "SportBarz" },
];

export default function VenueSelectScreen({ navigation }) {
  return (
    <FlatList
      data={venues}
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            navigation.navigate({
              name: "Create Event",
              params: { venueId: item.id, venueName: item.venueName },
            })
          }>
          <Text>{item.venueName}</Text>
        </Pressable>
      )}
      keyExtractor={item => String(item.id)}
    />
  );
}
