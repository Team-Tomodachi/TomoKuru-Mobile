import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import { Searchbar, Chip } from "react-native-paper";
import { styles } from "../styles/styles";

const { height, width } = Dimensions.get("screen");

export default function ListVenues(props: any) {
  const [query, setQuery] = React.useState<string>("");

  const [loaded] = useFonts({
    OpenSans: require("../assets/fonts/OpenSans-Medium.ttf"),
  });
  if (!loaded) {
    return null;
  }

  const shortenDescription = (description: any) => {
    if (!description) {
      return "-";
    } else if (description.length > 120) {
      return description.slice(0, 120) + "...";
    } else {
      return description;
    }
  };

  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={text => setQuery(text)}
        value={query}
      />
      <ScrollView horizontal={true}>
        <View
          style={styles(
            "bg-opacity:0",
            "flex:row",
            "h:10",
            "justify:evenly",
            "p:1",
          )}>
          <Chip mode="outlined" icon="map-marker">
            Location
          </Chip>
          <Chip mode="outlined" icon="smoking-off">
            Smoking
          </Chip>
          <Chip mode="outlined" icon="table-chair">
            Outdoor Seating
          </Chip>
          <Chip mode="outlined" icon="account-multiple">
            Capacity
          </Chip>
        </View>
      </ScrollView>
      <ScrollView style={{ backgroundColor: "rgba(182, 182, 182, 1)" }}>
        {props.venueData.map((venue, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                props.setIndexValue(index);
                props.setSingleView(true);
                props.setSelectedVenue(props.venueData[index]);
                console.log("selected venue: " + props.selectedVenue);
                console.log("index passed from OnPress: " + index);
              }}
              key={index}>
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
                    onPress={() => {
                      props.setIndexValue(index);
                      props.setSingleView(true);
                      props.setSelectedVenue(props.venueData[index]);
                      console.log("selected venue: " + props.selectedVenue);
                      console.log("index passed from OnPress: " + index);
                    }}
                    style={{
                      fontSize: 18,
                      fontFamily: "OpenSans",
                      fontWeight: "700",
                    }}>
                    {venue.location_name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "OpenSans",
                      fontStyle: "italic",
                      color: "#8F8F8F",
                    }}>
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
