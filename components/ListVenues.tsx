import * as React from "react";
import { styles } from "../styles/styles";
import { Button, Text, View, ScrollView, Dimensions, Image } from "react-native";
import Feather from "@expo/vector-icons/Ionicons";
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast'
import { useState, useEffect } from "react";

const {height, width} = Dimensions.get("screen");

import DummyVenues from "../DummyData/DummyVenues.json";
import DummyGroups from "../DummyData/DummyGroups.json";
import DummyEvents from "../DummyData/DummyVenues.json";

export default function ListItems(props: any) {

    // let [showList, setShowList] = useState([]);

    // useEffect(() => {
    //     return setShowList(DummyVenues);
    // }, [])

    const shortenDescription = (description: string) =>{
        if (description.length > 75){
            return description.slice(0, 75) + "...";
        }
        else{
            return description;
        }
    }
  return (

    <ScrollView style={{backgroundColor: "black"}}>
    {DummyVenues.map((venue, index) => {
        console.log(venue.venuePhoto)
        return (
            
        <View style={{
            flexDirection: "row",
            borderWidth: 3,
            borderRadius: 10,
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20,
            backgroundColor: "white"}} key={index}>
            
            <Image style={{
             height: height*.1, 
             width: width*.2, 
             marginTop: 20,
             marginLeft: 20,
             marginRight: 50,
             marginBottom: 20,
            }}
             source={require("../DummyData/DummyVenuePhotos/ce-la-vi.jpeg")}></Image>
            <View style={{flexDirection: "column", 
                height: height*.1, 
                width: width*.5,
                marginTop: 20,
                justifyContent: "space-evenly" }}>
                <Text style= {{ fontSize: 20}}>{venue.venueName}</Text>
                <Text>Type: {venue.venueType}</Text>
                <Text>Location: {venue.venueLocation}</Text>
                <Text>Contact: {venue.venueContact}</Text>
            </View>
        </View>
    )})}
    </ScrollView>
  )
}