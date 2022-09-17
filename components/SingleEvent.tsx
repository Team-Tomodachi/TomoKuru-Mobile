import * as React from "react";
import { Text, View, ScrollView, Dimensions, Image, Button } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import axios from "axios";

const { height, width } = Dimensions.get("screen");

export default function SingleEvent(props: any) {
  const singleEvent = props.selectedEvent;
  const [groupData, setGroupData] = useState({})
  const [venueData, setVenueData] = useState({})

  // const [loaded] = useFonts({
  //   OpenSans: require("../assets/fonts/OpenSans-Medium.ttf"),
  // });
  // if (!loaded) {
  //   return null;
  // }
  
  console.log(props.selectedEvent)

  useEffect(() => {
    if (singleEvent.group_id) {
      axios.get(`http://tomokuru.i-re.io/api/groups/${singleEvent.group_id}`).then(function (response) {
      setGroupData(response.data);
    });
    }
  }, []);
  useEffect(() => {
    if (singleEvent.venue_id) {
      axios.get(`http://tomokuru.i-re.io/api/venues/${singleEvent.venue_id}`).then(function (response) {
      setVenueData(response.data);
    });
    }
  }, []);

  console.log(groupData);

  return (
    <View>
        <ScrollView>
          <Image
                  style={{
                    height: height * 0.3,
                    width: width * 0.9,
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 50,
                    marginBottom: 20,
                  }}
                  source={require("../DummyData/DummyEventPhotos/canada-world-cup.jpeg")}></Image>
            <Text style={{ 
            fontSize: 30, 
            fontFamily: "OpenSans",
            textDecorationLine: 'underline'
          }}> {singleEvent.name} </Text>
            <Text style={{ 
            fontSize: 20, 
            fontFamily: "OpenSans",
          }}> Group: {groupData.name || ""} </Text>
            <Text style={{ 
            fontSize: 20, 
            fontFamily: "OpenSans",
          }}> {singleEvent.description} </Text>
            <Text style={{ 
            fontSize: 20, 
            fontFamily: "OpenSans",
          }}> Date: {singleEvent.date} </Text>
            <Text style={{ 
            fontSize: 20, 
            fontFamily: "OpenSans",
          }}> Start Time: {singleEvent.start_time} </Text>
            <Text style={{ 
            fontSize: 20, 
            fontFamily: "OpenSans",
          }}> End Time: {singleEvent.end_time} </Text>
            <Text style={{ 
            fontSize: 20, 
            fontFamily: "OpenSans",
          }}> Capacity {singleEvent.capacity} </Text>
            <Text style={{ 
            fontSize: 20, 
            fontFamily: "OpenSans",
          }}> Venue: {venueData.name || ""} </Text>
            <Button title="Back" onPress={ () => props.setSingleView(false)}/>
        </ScrollView>
    </View>

  );

}