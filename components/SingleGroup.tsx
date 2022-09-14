import * as React from "react";
import { Text, View, ScrollView, Dimensions, Image } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import axios from "axios";

const { height, width } = Dimensions.get("screen");

export default function SingleGroup(props: any) {

  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    axios.get("http://tomokuru.i-re.io/api/groups").then(function (response) {
      setGroupData(response.data);
    });
  }, []);

  const [loaded] = useFonts({
    OpenSans: require("../assets/fonts/OpenSans-Medium.ttf"),
  });
  if (!loaded) {
    return null;
  }
  const singleGroup = groupData[props.IndexValue]

  return (
    <View>
        <ScrollView>
        <Text> {props.IndexValue} </Text>
        <Text> {VenueData[props.IndexValue]} </Text>
        <Text>{singleGroup.group_name} </Text>
        <Text>{singleGroup.group_description} </Text>
        <Text>{singleGroup.group_leader} </Text>
        <Text>{singleGroup.private} </Text>
        </ScrollView>

    </View>

  );

}