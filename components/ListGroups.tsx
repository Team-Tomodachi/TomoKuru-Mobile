import * as React from "react";
import { Text, View, ScrollView, Dimensions, Image } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import axios from "axios";
import SingleGroup from "../components/SingleGroup";


const { height, width } = Dimensions.get("screen");

export default function ListGroups(props: any) {



  const shortenDescription = (description: any) => {
    if (!description) {
      return "description is empty" 
    } 
    else if (description.length > 60) {
      return description.slice(0, 60) + "...";
    } 
    else{
      return description;
    }
  };

  const isPrivate = (privacy: boolean) => {
    return privacy === false ? "public" : "private";
  };
  return (


     <View>
        <ScrollView style={{ backgroundColor: "#B6B6B6" }}>
          {props.GroupData.map((group, index) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 0,
                  borderRadius: 5,
                  margin: 10,
                  padding: 5,
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
                  source={require("../DummyData/DummyGroupPhotos/sunday-futsal-in-kinshicho.jpeg")}></Image>

                <View
                  style={{
                    flexDirection: "column",
                    // height: height * 0.1,
                    width: width * 0.5,
                  }}
                  >
                  <Text 
                  onPress={ () => {
                    props.setIndexValue(index)
                    props.setSingleView(true)
                    props.setSelectedGroup(props.GroupData[index])
                    console.log("selected group: " + props.selectedGroup)
                    console.log("index passed from OnPress: " + index)}
                  }
                  style={{ fontSize: 18, fontFamily: "OpenSans" }}>
                    {group.group_name}
                  </Text>
                  <Text style={{ fontFamily: "OpenSans" }}>
                    Privacy: {isPrivate(group.private)}
                  </Text>
                  <Text style={{ fontFamily: "OpenSans" }}>
                    Members: {group.members_num}
                  </Text>
                  <Text style={{ fontFamily: "OpenSans"}}>
                    Description: {shortenDescription(group.group_description)}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
    </View>
  );
}
