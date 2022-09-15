import React, { useState, useEffect } from "react";
import { Button, Text, View, ScrollView, Dimensions } from "react-native";
import ListGroups from "../components/ListGroups";
import ListEvents from "../components/ListEvents";
import Venues from "../components/Venues";


const { height, width } = Dimensions.get("screen");


export default function ExploreScreen(props: any) {

const [screenView, setScreenView] = useState("ListGroups")

  return (
    <View>
        <View style={{ 
          flexDirection: "row",
          height: height * 0.05,
          width: width * 0.95,
          justifyContent: "space-between",
        }}>
            <Button title="Groups" onPress={ () => setScreenView("ListGroups")}/>
            <Button title="Events" onPress={ () => setScreenView("ListEvents")}/>
            <Button title="Venues" onPress={ () => setScreenView("Venues")}/>
        </View>
        <ScrollView style={{ backgroundColor: "rgba(182, 182, 182, 1)" }}>
          <View style={{ 
              flexDirection: "row",
              height: height * 0.05,
              width: width * 0.95,
              justifyContent: "space-between",
              position: "absolute",
          }}>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}>    
            {screenView=== "ListGroups" ? <ListGroups /> : <View></View>}
            {screenView=== "ListEvents" ? <ListEvents /> : <View></View>}
            {screenView=== "Venues" ? <Venues /> : <View></View>}
          </View>
        </ScrollView>
      </View>
  );
}
