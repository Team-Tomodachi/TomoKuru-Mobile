import * as React from "react";
import { Text, View, ScrollView, Dimensions, Image, Button } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import axios from "axios";

const { height, width } = Dimensions.get("screen");

export default function SingleEvent(props: any) {

  const [loaded] = useFonts({
    OpenSans: require("../assets/fonts/OpenSans-Medium.ttf"),
  });
  if (!loaded) {
    return null;
  }
  const singleEvent = props.selectedEvent;

  console.log("selected event in SingleEvent: " + props.selectedEvent)



  return (
    <View>
        <ScrollView>
          <Image
                  style={{
                    height: height * 0.3,
                    width: width * 0.9,
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 50,
                    marginBottom: 20,
                  }}
                  source={require("../DummyData/DummyEventPhotos/canada-world-cup.jpeg")}></Image>
            <Text> {props.IndexValue} </Text>
            <Text> {singleEvent.event_name} </Text>
            <Text> {singleEvent.event_creator} </Text>
            <Text> {singleEvent.event_description} </Text>
            <Text> {singleEvent.event_date} </Text>
            <Text> {singleEvent.event_start_time} </Text>
            <Text> {singleEvent.event_end_time} </Text>
            <Text> {singleEvent.event_capacity} </Text>
            <Text> {singleEvent.event_venue} </Text>
            <Button title="Back" onPress={ () => props.setSingleView(false)}/>
        </ScrollView>
    </View>

  );

}