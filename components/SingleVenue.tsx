import * as React from "react";
import { Text, View, ScrollView, Dimensions, Image } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import axios from "axios";

const { height, width } = Dimensions.get("screen");

export default function SingleVenue(props: any) {

  const [VenueData, setVenueData] = useState([]);

  useEffect(() => {
    axios.get("http://tomokuru.i-re.io/api/venues").then(function (response) {
      setVenueData(response.data);
    });
  }, []);

  const [loaded] = useFonts({
    OpenSans: require("../assets/fonts/OpenSans-Medium.ttf"),
  });
  if (!loaded) {
    return null;
  }

  const singleVenue = VenueData[props.IndexValue];

  return (
    <View>
        <ScrollView>
        <Text> {props.IndexValue} </Text>
        <Text> {VenueData[props.IndexValue]} </Text>
        <Text> {singleVenue.location_name} </Text>
        <Text> {singleVenue.city_ward} </Text>
        <Text> {singleVenue.prefecture} </Text>
        <Text> {singleVenue.phone_num} </Text>
        <Text> {singleVenue.address} </Text>
        <Text> {singleVenue.venue_email} </Text>
        <Text> {singleVenue.description} </Text>
        <Text> {singleVenue.num_seats} </Text>
        <Text> {singleVenue.smoking} </Text>
        <Text> {singleVenue.outdoor_seating} </Text>
        <Text> {singleVenue.venue_url} </Text>
        <Text> {singleVenue.photo_link} </Text>
        <Text> {singleVenue.venue_type} </Text>
        <Text> {singleVenue.user_id} </Text>
        </ScrollView>

    </View>

  );

}