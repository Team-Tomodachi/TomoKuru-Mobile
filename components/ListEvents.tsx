import * as React from "react";
import { styles } from "../styles/styles";
import { Button, Text, View, ScrollView, Dimensions, Image } from "react-native";
import Feather from "@expo/vector-icons/Ionicons";
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast'
import { useState, useEffect } from "react";
import { useFonts } from 'expo-font';

const {height, width} = Dimensions.get("screen");

import DummyVenues from "../DummyData/DummyVenues.json";
import DummyGroups from "../DummyData/DummyGroups.json";
import DummyEvents from "../DummyData/DummyEvents.json";

export default function ListItems(props: any) {

    // let [showList, setShowList] = useState([]);

    // useEffect(() => {
    //     return setShowList(DummyEvents);
    // }, [])

    const [loaded] = useFonts({
        OpenSans: require('../assets/fonts/OpenSans-Medium.ttf'),
      });
      if (!loaded) {
        return null;
      }
  return (

    <ScrollView style={{backgroundColor: "black"}}>
    {DummyEvents.map((event, index) => {
        return (
            
        <View style={{
            flexDirection: "row",
            borderWidth: 3,
            borderRadius: 10,
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20,
            backgroundColor: "rgba(252, 245, 59, 1)"}} key={index}>
            
            <Image style={{
             height: height*.1, 
             width: width*.2, 
             marginTop: 20,
             marginLeft: 20,
             marginRight: 50,
             marginBottom: 20,
            }}
             source={require("../DummyData/DummyEventPhotos/canada-world-cup.jpeg")}></Image>
            <View style={{flexDirection: "column", 
                height: height*.1, 
                width: width*.5,
                marginTop: 20,
                justifyContent: "space-evenly" }}>
                <Text style={{fontFamily: 'OpenSans', fontSize: 20 }}>{event.eventName}</Text>
                <Text style={{fontFamily: 'OpenSans'}}> Group: {event.eventGroupName}</Text>
                <Text style={{fontFamily: 'OpenSans'}}>Venue: {event.eventLocation}</Text>
                <Text style={{fontFamily: 'OpenSans'}}>Date/Time: {event.eventDate} {event.eventStartTime} ~ {event.eventEndTime}</Text>
                <Text style={{fontFamily: 'OpenSans'}}>Creator: {event.eventCreator}</Text>
            </View>
        </View>
    )})}
    </ScrollView>
  )
}