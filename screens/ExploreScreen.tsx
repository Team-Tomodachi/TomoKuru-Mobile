import React, { useState, useEffect } from "react";
import { Button, Text, View, ScrollView, Dimensions } from "react-native";
import Venues from "../components/Venues";
import Groups from "../components/Groups";
import Events from "../components/Events";



const { height, width } = Dimensions.get("screen");


export default function ExploreScreen(props: any) {

const [screenView, setScreenView] = useState("Groups")

  return (
    <View>
        <View style={{ 
          flexDirection: "row",
          height: height * 0.05,
          width: width * 0.95,
          justifyContent: "space-between",
        }}>
            <Button title="Groups" onPress={ () => setScreenView("Groups")}/>
            <Button title="Events" onPress={ () => setScreenView("Events")}/>
            <Button title="Venues" onPress={ () => setScreenView("Venues")}/>
        </View>
        <ScrollView style={{ backgroundColor: "#FFF" }}>
          <View style={{ 
              flexDirection: "row",
              height: height * 0.05,
              width: width * 0.95,
              justifyContent: "space-between",
              position: "absolute",
          }}>
          </View>
          <View
            // style={{
            //   justifyContent: "center",
            //   alignItems: "center",
            // }}
            >    
            {screenView=== "Groups" ? <Groups /> : <View></View>}
            {screenView=== "Events" ? <Events /> : <View></View>}
            {screenView=== "Venues" ? <Venues /> : <View></View>}
          </View>
        </ScrollView>
      </View>
  );
}
