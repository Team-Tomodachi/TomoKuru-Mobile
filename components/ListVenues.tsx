import * as React from "react";
import { 
  Text, 
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity 
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

const { height, width } = Dimensions.get("screen");

export default function ListVenues({ navigation }) {

  const [venueData, setVenueData] = useState([]);

  useEffect(() => {
    axios.get("http://tomokuru.i-re.io/api/venues").then(function (response) {
      setVenueData(response.data);
    });
  }, []);

  const shortenDescription = (description: any) => {
    if (!description) {
      return "-" 
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
          {venueData.map((venue, index) => {
            return (
              <TouchableOpacity
              onPress={ () => {
                navigation.navigate({
                  name: "Venue Details",
                  params: { selectedVenue: venueData[index] },
                });
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
                    width: width * 0.5,
                  }}>
                  <Text 
                    style={{ fontSize: 18, fontFamily: "OpenSans", fontWeight: "700"}}>
                    {venue.location_name}
                  </Text>
                  <Text
                      style={{ fontFamily: "OpenSans", fontStyle: "italic", color: "#8F8F8F"}}>
                      {venue.venue_type}
                  </Text>
                  <Text
                      style={{ fontFamily: "OpenSans", fontStyle: "italic", color: "#8F8F8F"}}>
                      {venue.prefecture} , {venue.city_ward}
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
