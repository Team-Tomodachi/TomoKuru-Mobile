import * as React from "react";
import { Text, View, ScrollView, Dimensions, Image } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import axios from "axios";

const { height, width } = Dimensions.get("screen");

export default function SingleEvent(props: any) {

  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    axios.get("http://tomokuru.i-re.io/api/events").then(function (response) {
      setEventData(response.data);
    });
  }, []);

  const [loaded] = useFonts({
    OpenSans: require("../assets/fonts/OpenSans-Medium.ttf"),
  });
  if (!loaded) {
    return null;
  }

  const singleEvent = eventData[props.IndexValue];

  return (
    <View>
        <ScrollView>
            <Text> {props.IndexValue} </Text>
            <Text> {eventData[props.IndexValue]} </Text>
            <Text> {singleEvent.event_name} </Text>
            <Text> {singleEvent.event_creator} </Text>
            <Text> {singleEvent.event_description} </Text>
            <Text> {singleEvent.event_date} </Text>
            <Text> {singleEvent.event_start_time} </Text>
            <Text> {singleEvent.event_end_time} </Text>
            <Text> {singleEvent.event_capacity} </Text>
            <Text> {singleEvent.event_venue} </Text>
        </ScrollView>

    </View>

  );

}