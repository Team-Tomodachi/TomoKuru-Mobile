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

    let [showList, setShowList] = useState([]);

    useEffect(() => {
        return setShowList(DummyGroups);
    }, [])


    const groupPhotoArray = 
    ["require('../DummyData/DummyGroupPhotos/canada-soccer-fans.jpeg')", 
    "require('../DummyData/DummyGroupPhotos/ping-pong-players-international.jpg')", 
    "require('../DummyData/DummyGroupPhotos/basket-weavers-guild.jpeg')", 
    "require('../DummyData/DummyGroupPhotos/chess-masters-society.jpeg')", 
    "require('../DummyData/DummyGroupPhotos/coding-nerds-unite!.jpeg')", 
    "require('../DummyData/DummyGroupPhotos/sunday-futsal-in-kinshicho.jpeg')"]
  return (
    <ScrollView>
    {DummyGroups.map((group, index) => {
        console.log(group.groupPhoto)
        return (
            <View style={{flexDirection: "row"}} key={index}>
            
            <Image style={{height: height*.1, 
             width: width*.2, 

             marginTop: 10,
             marginLeft: 20,
             marginRight: 30,
             marginBottom: 50,
            }}
             source={require("../DummyData/DummyGroupPhotos/sunday-futsal-in-kinshicho.jpeg")}></Image>
            <View style={{flexDirection: "column", 
                height: height*.1, 
                width: width*.5, }}>
                <Text style= {{ fontSize: 20}}>{group.groupName}</Text>
                <Text>Description: {group.groupDescription}</Text>
                <Text>Privacy: {group.isPrivate}</Text>
                <Text>Members: {group.groupMemberCount}</Text>
            </View>
             </View>
    )})}
    </ScrollView>
  )
}