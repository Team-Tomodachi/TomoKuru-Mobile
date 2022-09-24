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
import VenueListItem from "./VenueListItem"

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
              <VenueListItem singleVenue={venue} key={index} />
            );
          })}
        </ScrollView>
    </View>
  );
}
