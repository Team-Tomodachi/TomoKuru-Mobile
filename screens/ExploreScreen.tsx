import * as React from "react";
import { Button, Text, View, ScrollView } from "react-native";
import ListItems from "../components/ListItems";
import ListVenues from "../components/ListVenues";
import ListEvents from "../components/ListEvents";

export default function ExploreScreen() {
  return (
    <ScrollView style={{ backgroundColor: "rgba(182, 182, 182, 1)" }}>
      <View
        style={{
          flex: 3,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text style={{ fontSize: 30 }}> Explore Groups</Text>
        <ListItems />
        <View>
          <Button title="Explore More Groups" />
        </View>
        <Text style={{ fontSize: 30 }}> Explore Events</Text>
        <ListEvents />
        <View>
          <Button title="Explore More Events" />
        </View>
        <Text style={{ fontSize: 30 }}> Explore Venues</Text>
        <ListVenues />
        <View>
          <Button title="Explore More Venues" />
        </View>
      </View>
    </ScrollView>
  );
}
