import * as React from "react";
import { Button, Text, View, ScrollView, Dimensions } from "react-native";
import ListGroups from "../components/ListGroups";
import ListVenues from "../components/ListVenues";
import ListEvents from "../components/ListEvents";

const { height, width } = Dimensions.get("screen");

export default function ExploreScreen() {
  return (
    <ScrollView style={{ backgroundColor: "rgba(182, 182, 182, 1)" }}>
      <View style={{ 
          flexDirection: "row",
          height: height * 0.05,
          width: width * 0.95,
          justifyContent: "space-between",
          position: "absolute",
      }}>
        <Button title="Groups" />
        <Button title="Events" />
        <Button title="Venues" />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text style={{ fontSize: 30, marginTop: 30, borderWidth: 1 }}>Groups</Text>
        <ListGroups />
        <Text style={{ fontSize: 30 }}>Events</Text>
        <ListEvents />
        <Text style={{ fontSize: 30 }}>Venues</Text>
        <ListVenues />
      </View>
    </ScrollView>
  );
}
