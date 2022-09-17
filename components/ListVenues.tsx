import * as React from "react";
import { Text, View, ScrollView, Dimensions, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";

const { height, width } = Dimensions.get("screen");

export default function ListVenues(props: any) {

  const [loaded] = useFonts({
    OpenSans: require("../assets/fonts/OpenSans-Medium.ttf"),
  });
  if (!loaded) {
    return null;
  }

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

  return (
    <View>
        <ScrollView style={{ backgroundColor: "rgba(182, 182, 182, 1)" }}>
          {props.venueData.map((venue, index) => {
            return (
              <TouchableOpacity
              onPress={ () => {
                props.setIndexValue(index)
                props.setSingleView(true)
                props.setSelectedVenue(props.venueData[index])
                console.log("selected venue: " + props.selectedVenue)
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
                  source={require("../DummyData/DummyVenuePhotos/ce-la-vi.jpeg")}></Image>
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
                      props.setSelectedVenue(props.venueData[index])
                      console.log("selected venue: " + props.selectedVenue)
                      console.log("index passed from OnPress: " + index)}
                    }
                    style={{ fontSize: 18, fontFamily: "OpenSans", fontWeight: "700"}}>
                    {venue.location_name}
                  </Text>
                  <Text
                      style={{ fontFamily: "OpenSans", fontStyle: "italic", color: "#8F8F8F"}}>
                      {venue.venue_type} {venue.prefecture} {venue.city_ward}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "OpenSans",
                    }}>
                    {shortenDescription(venue.description)}
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
