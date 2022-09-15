import * as React from "react";
import { Text, View, ScrollView, Dimensions, Image } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import axios from "axios";
import SingleEvent from "../components/SingleEvent";
import ListEvents from "../components/ListEvents";


export default function ListItems() {
  const [EventData, setEventData] = useState([]);
  const [singleView, setSingleView] = useState(false);
  const [IndexValue, setIndexValue] = useState(Number);
  const [selectedEvent, setSelectedEvent] = useState({})

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

  return (
        <View>
          {singleView === true ? (
                <SingleEvent 
                    IndexValue={IndexValue}
                    selectedEvent={selectedEvent}
                    setSingleView={setSingleView}
                /> 
            ) : (
                <ListEvents 
                    EventData={EventData}
                    setIndexValue={setIndexValue}
                    setSingleView={setSingleView}
                    setSelectedEvent={setSelectedEvent}
                    selectedEvent={selectedEvent}
                />
            )}
        </View>
        )
}