import * as React from "react";
import { Text, View, ScrollView, Dimensions, Image } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import axios from "axios";
import SingleVenue from "../components/SingleVenue";

const { height, width } = Dimensions.get("screen");

export default function ListItems(props: any) {
  // const [venueData, setVenueData] = useState([]);
  // const [singleView, setSingleView] = useState(false);
  // const [IndexValue, setIndexValue] = useState(Number);

  const [loaded] = useFonts({
    OpenSans: require("../assets/fonts/OpenSans-Medium.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <View>
        <ScrollView style={{ backgroundColor: "rgba(182, 182, 182, 1)" }}>
          {props.venueData.map((venue, index) => {
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
                  source={require("../DummyData/DummyVenuePhotos/ce-la-vi.jpeg")}></Image>
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
                      props.setSelectedVenue(props.venueData[index])
                      console.log("selected venue: " + props.selectedVenue)
                      console.log("index passed from OnPress: " + index)}
                    }
                    style={{ fontSize: 18, fontFamily: "OpenSans" }}>
                    {venue.location_name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "OpenSans",
                      textDecorationLine: "underline",
                    }}>
                    Type: {venue.venue_type}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "OpenSans",
                      textDecorationLine: "underline",
                    }}>
                    Location: {venue.city_ward}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "OpenSans",
                      textDecorationLine: "underline",
                    }}>
                    Contact: {venue.phone_num}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
    </View>
  );
}
