import * as React from "react";
import { Text, View, ScrollView, Dimensions, Image } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import axios from "axios";
import SingleVenue from "../components/SingleVenue";
import ListVenues from "../components/ListVenues";


export default function ListItems() {
  const [venueData, setVenueData] = useState([]);
  const [singleView, setSingleView] = useState(false);
  const [IndexValue, setIndexValue] = useState(Number);
  const [selectedVenue, setSelectedVenue] = useState({})

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

  return (
        <View>
          {singleView === true ? (
                <SingleVenue 
                    IndexValue={IndexValue}
                    selectedVenue={selectedVenue}
                    setSingleView={setSingleView}
                /> 
            ) : (
                <ListVenues 
                    venueData={venueData}
                    setIndexValue={setIndexValue}
                    setSingleView={setSingleView}
                    setSelectedVenue={setSelectedVenue}
                    selectedVenue={selectedVenue}
                />
            )}
        </View>
        )
}
