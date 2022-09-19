import * as React from "react";
import { Text, View, ScrollView, Dimensions, Image, Button } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import axios from "axios";

const { height, width } = Dimensions.get("screen");

export default function SingleVenue(props: any) {

console.log("selected venue in SingleVenue: " + props.selectedVenue)

const singleVenue = props.selectedVenue



  return (
    <View>
        <ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 20,

          }}>
            <Image
                      style={{
                        height: height * 0.3,
                        width: width * 0.9,
                        marginTop: 20,
                        marginLeft: 20,
                        marginRight: 50,
                        marginBottom: 20,
                      }}
                      source={require("../DummyData/DummyVenuePhotos/ce-la-vi.jpeg")}></Image>
          </View>
        <Text
          style={{ 
            fontSize: 30, 
            fontFamily: "OpenSans",
            textDecorationLine: 'underline'
          }}>
         {singleVenue.location_name} </Text>
         <Text style={{ 
            fontSize: 20, 
            fontFamily: "OpenSans",
          }}> {singleVenue.description} </Text>
        <Text> {singleVenue.city_ward} </Text>
        <Text> {singleVenue.prefecture} </Text>
        <Text
        style={{ 
          fontSize: 20, 
          fontFamily: "OpenSans",
        }}> 📞 {singleVenue.phone_num} </Text>
        <Text
        style={{ 
          fontSize: 20, 
          fontFamily: "OpenSans",
        }}>📍{singleVenue.address} </Text>
        {/* <Text> {singleVenue.venue_email} </Text>
        <Text> {singleVenue.num_seats} </Text>
        <Text> {singleVenue.smoking} </Text>
        <Text> {singleVenue.outdoor_seating} </Text>
        <Text> {singleVenue.venue_url} </Text>
        <Text> {singleVenue.photo_link} </Text> */}
        <Text
        style={{ 
          fontSize: 20, 
          fontFamily: "OpenSans",
        }}>Type: {singleVenue.venue_type} </Text>
        <Button title="Back" onPress={ () => props.setSingleView(false)}/>
        </ScrollView>

    </View>

  );

}