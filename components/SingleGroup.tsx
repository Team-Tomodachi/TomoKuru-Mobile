import * as React from "react";
import { Text, View, ScrollView, Dimensions, Image, Button } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import axios from "axios";

const { height, width } = Dimensions.get("screen");

export default function SingleGroup(props: any) {

  const [loaded] = useFonts({
    OpenSans: require("../assets/fonts/OpenSans-Medium.ttf"),
  });
  if (!loaded) {
    return null;
  }
  const singleGroup = props.selectedGroup

  console.log("selected group in SingleGroup: " + props.selectedGroup)


  return (
    <View>
        <ScrollView>
        <Text>{singleGroup.group_name} </Text>
        <Text>{singleGroup.group_description} </Text>
        <Text>{singleGroup.group_leader} </Text>
        <Text>{singleGroup.private} </Text>
        <Button title="Back" onPress={ () => props.setSingleView(false)}/>
        </ScrollView>

    </View>

  );

}