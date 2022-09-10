import * as React from "react";
import { styles } from "../styles/styles";
import { Button, Text, View, ScrollView, Dimensions, Image } from "react-native";
import Feather from "@expo/vector-icons/Ionicons";
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast'
import { useState, useEffect } from "react";
import { useFonts } from 'expo-font'
import DummyGroups from "../DummyData/DummyGroups.json";
import axios from "axios"

const {height, width} = Dimensions.get("screen");

export default function ListItems(props: any) {

    // let [showList, setShowList] = useState([]);

    // useEffect(() => {
    //     return setShowList(DummyGroups);
    // }, [])

    const [groupData, setGroupData] = useState([]);

    useEffect(() => {
        axios.get('http://tomokuru.i-re.io/api/groups')
        .then(function (response) {
        setGroupData(response.data)
        console.log(groupData)});
      }, []);

    const [loaded] = useFonts({
        OpenSans: require('../assets/fonts/OpenSans-Medium.ttf'),
      });
      if (!loaded) {
        return null;
      }

    // const shortenDescription = (description: string) =>{
    //     if (description.length > 75){
    //         return description.slice(0, 75) + "...";
    //     }
    //     else{
    //         return description;
    //     }
    // }

    const isPrivate = (privacy: boolean) =>{
        return privacy === false ? "public" : "private"
    }
  return (

    <ScrollView style={{backgroundColor: "rgba(182, 182, 182, 1)"}}>
    {groupData.map((group, index) => {
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
             source={require("../DummyData/DummyGroupPhotos/sunday-futsal-in-kinshicho.jpeg")}></Image>
            <View style={{flexDirection: "column", 
                height: height*.1, 
                width: width*.5, }}>
                <Text style= {{ fontSize: 18, fontFamily: 'OpenSans'}}>{group.group_name}</Text>
                <Text style={{fontFamily: 'OpenSans'}}>Privacy: {isPrivate(group.private)}</Text>
                <Text style={{fontFamily: 'OpenSans'}}>Members: {group.groupMemberCount}</Text>
                <Text style={{fontFamily: 'OpenSans'}}>Description: {}</Text>
            </View>
             </View>
    )})}
    </ScrollView>
  )
}