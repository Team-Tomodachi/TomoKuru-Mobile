import * as React from "react";
import { Text, View, ScrollView, Dimensions, Image, Button, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import axios from "axios";

const { height, width } = Dimensions.get("screen");

export default function SingleEvent(props: any) {
  const singleEvent = props.selectedEvent;
  const [groupData, setGroupData] = useState({})
  const [venueData, setVenueData] = useState({})

  console.log(singleEvent)

  // useEffect(() => {
  //   if (singleEvent.group_id) {
  //     axios.get(`http://tomokuru.i-re.io/api/groups/${singleEvent.group_id}`).then(function (response) {
  //     setGroupData(response.data);
  //     console.log("1")
  //     console.log(response.data)
  //   });
  //   }
  // }, []);
  // useEffect(() => {
  //   if (singleEvent.venue_id) {
  //     axios.get(`http://tomokuru.i-re.io/api/venues/${singleEvent.venue_id}`).then(function (response) {
  //     setVenueData(response.data);
  //     console.log( "2")
  //     console.log(response.data)
  //   });
  //   }
  // }, []);

  console.log("3")
  console.log(groupData);
  console.log("4");
  console.log(venueData);

  return (
    <View>
        <ScrollView>
          <Image style={styles.image} source={require("../DummyData/DummyEventPhotos/canada-world-cup.jpeg")}></Image>
            <Text style={styles.title}> {singleEvent.name} </Text>
            <Text style={styles.details}> Group: {groupData.name || ""} </Text>
            <Text style={styles.details}> {singleEvent.description} </Text>
            <Text style={styles.details}> Date: {singleEvent.date} </Text>
            <Text style={styles.details}> Start Time: {singleEvent.start_time} </Text>
            <Text style={styles.details}> End Time: {singleEvent.end_time} </Text>
            <Text style={styles.details}> Capacity {singleEvent.capacity} </Text>
            <Text style={styles.details}> Venue: {venueData.name || ""} </Text>
            <Button title="Back" onPress={ () => props.setSingleView(false)}/>
        </ScrollView>
    </View>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    height: height * 0.1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
    padding: 10,
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  },
  title: {
    fontSize: 30, 
    fontFamily: "OpenSans",
    textDecorationLine: 'underline'
  },
  details: {
    fontSize: 20, 
    fontFamily: "OpenSans",
  },
  detailsUnderlined: {
    fontSize: 20, 
    fontFamily: "OpenSans",
    textDecorationLine: 'underline'
  }, 
  image: {
    height: height * 0.3,
    width: width * 0.6,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 50,
    marginBottom: 20,
  }
});