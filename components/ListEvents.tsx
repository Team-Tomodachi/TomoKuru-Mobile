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
import axios from "axios";

const { height, width } = Dimensions.get("screen");

export default function ListEvents({ navigation }) {

  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    axios.get("http://tomokuru.i-re.io/api/events").then(function (response) {
      setEventData(response.data);
    });
  }, []);

  const shortenDescription = (description: any) => {
    if (!description) {
      return "description is empty";
    } else if (description.length > 120) {
      return description.slice(0, 120) + "...";
    } else {
      return description;
    }
  };

  return (
    <View>
      <ScrollView style={{ backgroundColor: "rgba(182, 182, 182, 1)" }}>
        {eventData.map((event, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate({
                  name: "Event Details",
                  params: { selectedEvent: eventData[index] },
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
                  source={require("../DummyData/DummyEventPhotos/canada-world-cup.jpeg")}></Image>
                <View
                  style={{
                    flexDirection: "column",
                    width: width * 0.5,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "OpenSans",
                      fontWeight: "700",
                    }}>
                    {event.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "OpenSans",
                      fontStyle: "italic",
                      color: "#8F8F8F",
                    }}>
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
