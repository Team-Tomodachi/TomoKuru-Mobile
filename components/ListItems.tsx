import * as React from "react";
import { styles } from "../styles/styles";
import { Button, Text, View, ScrollView, Dimensions, Image } from "react-native";
import Feather from "@expo/vector-icons/Ionicons";
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast'
import { useState, useEffect } from "react";

const {height, width} = Dimensions.get("screen");

const DummyVenues = require("../DummyData/DummyVenues.json");
const DummyGroups = require("../DummyData/DummyGroups.json");
const DummyEvents = require("../DummyData/DummyVenues.json");

const DummyVenueImage = require("../DummyData/DummyVenuePhotos/venuePhoto.jpeg");
const DummyGroupImage = require("../DummyData/DummyGroupPhotos/groupPhoto.jpeg");
const DummyEventImage = require("../DummyData/DummyEventPhotos/eventPhoto.jpeg");

const groups = [
    {
        groupName: "Canada Soccer FanZ",
        groupDescription: "For all true Canuck Fans of Canadian soccer. We often gather at the Hubs to watch our team play.",
        isPrivate: "public",
        groupMemberCount: 69
    },
]

export default function ListItems(props: any) {

    let [showList, setShowList] = useState([]);

    // let groups = JSON.parse(DummyGroups);

    useEffect(() => {
        return setShowList(DummyGroups);
    }, [])
    console.log(DummyGroups);
  return (
    <ScrollView>
    {DummyGroups.map((group, index) => {
        return (
            <View key={index}>
             <Text>{group.groupName}</Text>
             <Text>{group.groupDescription}</Text>
             <Text>{group.isPrivate}</Text>
             <Text>{group.groupMemberCount}</Text>
             <Image style={{height: height/2, width: width}}source={require("../DummyData/DummyVenuePhotos/venuePhoto.jpeg")}></Image>
             </View>
    )})}
    </ScrollView>
  )
}