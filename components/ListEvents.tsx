import * as React from "react";
import { Text, View, ScrollView, Dimensions, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import SingleEvent from "../components/SingleEvent";
import axios from "axios";

const { height, width } = Dimensions.get("screen");

export default function ListEvents(props: any) {

  const shortenDescription = (description: any) => {
    if (!description) {
      return "description is empty" 
    } 
    else if (description.length > 120) {
      return description.slice(0, 120) + "...";
    } 
    else{
      return description;
    }
  };

  const [loaded] = useFonts({
    OpenSans: require("../assets/fonts/OpenSans-Medium.ttf"),
  });
  if (!loaded) {
    return null;
  }

  console.log(props.EventData);

  return (
  <View>
        <ScrollView style={{ backgroundColor: "rgba(182, 182, 182, 1)" }}>
          {props.EventData.map((event, index) => {
            return (
              <TouchableOpacity
              onPress={ () => {
                props.setIndexValue(index)
                props.setSingleView(true)
                props.setSelectedEvent(props.EventData[index])
                console.log("selected event: " + props.selectedEvent)
                console.log("index passed from OnPress: " + index)}
              }
              key={index}
              >
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 0,
                  borderRadius: 5,
                  margin: 10,
                  marginLeft: 15,
                  marginRight: 15,
                  // padding: 10,
                  paddingTop: 10,
                  paddingBottom: 10,
                  backgroundColor: "white",
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
                    // height: height * 0.1,
                    width: width * 0.5,
                  }}>
                  <Text 
                    onPress={ () => {
                      props.setIndexValue(index)
                      props.setSingleView(true)
                      props.setSelectedEvent(props.EventData[index])
                      console.log("selected event: " + props.selectedEvent)
                      console.log("index passed from OnPress: " + index)}
                    }
                    style={{ fontSize: 18, fontFamily: "OpenSans", fontWeight: "700"}}>
                    {event.name}
                  </Text>
                  <Text style={{ fontFamily: "OpenSans", fontStyle: "italic", color: "#8F8F8F"   }}>
                    {event.date}
                  </Text>
                  <Text style={{ fontFamily: "OpenSans" }}>
                  {shortenDescription(event.description)}
                  </Text>
                </View>
              </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
  </View>
  );
}
