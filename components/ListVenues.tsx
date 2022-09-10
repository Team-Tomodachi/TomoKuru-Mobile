import * as React from "react";
import { styles } from "../styles/styles";
import { Button, Text, View, ScrollView, Dimensions, Image } from "react-native";
import Feather from "@expo/vector-icons/Ionicons";
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast'
import { useState, useEffect } from "react";
import { useFonts } from 'expo-font';
import DummyVenues from "../DummyData/DummyVenues.json";
import axios from "axios"

const {height, width} = Dimensions.get("screen");



export default function ListItems(props: any) {

    const [venueData, setVenueData] = useState([]);

    useEffect(() => {
        axios.get('http://tomokuru.i-re.io/api/venues')
        .then(function (response) {
        setVenueData(response.data)
        console.log(venueData)});
      }, []);

    const [loaded] = useFonts({
        OpenSans: require('../assets/fonts/OpenSans-Medium.ttf'),
      });
      if (!loaded) {
        return null;
      }

      const shortenDescription = (description: string) =>{
        if (description.length > 75){
            return description.slice(0, 40) + "...";
        }
        else{
            return description;
        }
    }


    // let [showList, setShowList] = useState([]);

    // useEffect(() => {
    //     return setShowList(DummyVenues);
    // }, [])

  return (
    <ScrollView style={{backgroundColor: "rgba(182, 182, 182, 1)"}}>
    {venueData.map((venue, index) => {
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
             source={require("../DummyData/DummyVenuePhotos/ce-la-vi.jpeg")}></Image>
            <View style={{flexDirection: "column", 
                height: height*.1, 
                width: width*.5,
                marginTop: 20,
                justifyContent: "space-evenly" }}>
                <Text style= {{ fontSize: 18, fontFamily: 'OpenSans'}}>{venue.location_name}</Text>
                <Text style= {{ fontFamily: 'OpenSans', textDecorationLine: 'underline' }}>Type: {venue.venue_type}</Text>
                <Text style= {{ fontFamily: 'OpenSans', textDecorationLine: 'underline' }}>Location: {shortenDescription(venue.address)}</Text>
                <Text style= {{ fontFamily: 'OpenSans', textDecorationLine: 'underline' }}>Contact: {venue.phone_num}</Text>
            </View>
        </View>
    )})}
    </ScrollView>
  )
}