import * as React from "react";
import { Text, View, ScrollView, Dimensions, Image } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import SingleEvent from "../components/SingleEvent";
import axios from "axios";

const { height, width } = Dimensions.get("screen");

export default function ListEvents(props: any) {

  const [loaded] = useFonts({
    OpenSans: require("../assets/fonts/OpenSans-Medium.ttf"),
  });
  if (!loaded) {
    return null;
  }


  return (
  <View>
        <ScrollView style={{ backgroundColor: "rgba(182, 182, 182, 1)" }}>
          {props.EventData.map((event, index) => {
            return (
              <View
                style={{
                  height: height * 0.15,
                  width: width * 0.9,
                  flexDirection: "row",
                  borderWidth: 3,
                  borderRadius: 10,
                  marginTop: 20,
                  marginLeft: 20,
                  marginRight: 20,
                  marginBottom: 20,
                  backgroundColor: "rgba(252, 245, 59, 1)",
                }}
                key={index}>
                <Image
                  style={{
                    height: height * 0.1,
                    width: width * 0.2,
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 50,
                    marginBottom: 20,
                  }}
                  source={require("../DummyData/DummyEventPhotos/canada-world-cup.jpeg")}></Image>
                <View
                  style={{
                    flexDirection: "column",
                    height: height * 0.1,
                    width: width * 0.5,
                    marginTop: 20,
                    justifyContent: "space-evenly",
                  }}>
                  <Text 
                    onPress={ () => {
                      props.setIndexValue(index)
                      props.setSingleView(true)
                      props.setSelectedEvent(props.EventData[index])
                      console.log("selected event: " + props.selectedEvent)
                      console.log("index passed from OnPress: " + index)}
                    }
                    style={{ fontFamily: "OpenSans", fontSize: 18 }}>
                    {event.event_name}
                  </Text>
                  <Text style={{ fontFamily: "OpenSans" }}>
                    Group: {event.group_name}
                  </Text>
                  <Text style={{ fontFamily: "OpenSans" }}>
                    Venue: {event.location}
                  </Text>
                  <Text style={{ fontFamily: "OpenSans" }}>
                    Date/Time: {event.event_date} {event.event_start_time} ~{" "}
                    {event.event_end_time}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
  </View>
  );
}
