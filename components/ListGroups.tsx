import * as React from "react";
import { Text, View, ScrollView, Dimensions, Image } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import axios from "axios";
import SingleGroup from "../components/SingleGroup";


const { height, width } = Dimensions.get("screen");

export default function ListItems() {

  const [groupData, setGroupData] = useState([]);
  const [singleView, setSingleView] = useState("");
  const [IndexValue, setIndexValue] = useState(Number)

  useEffect(() => {
    axios.get("http://tomokuru.i-re.io/api/groups").then(function (response) {
      setGroupData(response.data);
    });
  }, []);



  const shortenDescription = (description: string) => {
    if (description.length > 60) {
      return description.slice(0, 60) + "...";
    } else {
      return description;
    }
  };

  const isPrivate = (privacy: boolean) => {
    return privacy === false ? "public" : "private";
  };
  return (

    <View>
      <Text> This is the groups page</Text>
    </View>
    // <View>
    //   {singleView === "SingleView" ? (<SingleGroup 
    //   IndexValue={IndexValue}
    //   />) :
    //     (
    //     <ScrollView style={{ backgroundColor: "rgba(182, 182, 182, 1)" }}>
    //       {groupData.map((group, index) => {
    //         return (
    //           <View
    //             style={{
    //               height: height * 0.15,
    //               width: width * 0.9,
    //               flexDirection: "row",
    //               borderWidth: 3,
    //               borderRadius: 10,
    //               marginTop: 20,
    //               marginLeft: 20,
    //               marginRight: 20,
    //               marginBottom: 20,
    //               backgroundColor: "rgba(252, 245, 59, 1)",
    //             }}
    //             key={index}>
    //             <Image
    //               style={{
    //                 height: height * 0.1,
    //                 width: width * 0.2,
    //                 marginTop: 20,
    //                 marginLeft: 20,
    //                 marginRight: 50,
    //                 marginBottom: 20,
    //               }}
    //               source={require("../DummyData/DummyGroupPhotos/sunday-futsal-in-kinshicho.jpeg")}></Image>

    //             <View
    //               style={{
    //                 flexDirection: "column",
    //                 height: height * 0.1,
    //                 width: width * 0.5,
    //               }}>
    //               <Text 
    //               onPress={ () => {
    //                 console.log("single group button has been pressed!")
    //                 setSingleView("SingleView")
    //                 setIndexValue(index);
    //                 console.log(index + "index")
    //                 }}
    //               style={{ fontSize: 18, fontFamily: "OpenSans" }}>
    //                 {group.group_name}
    //               </Text>
    //               <Text style={{ fontFamily: "OpenSans" }}>
    //                 Privacy: {isPrivate(group.private)}
    //               </Text>
    //               <Text style={{ fontFamily: "OpenSans" }}>
    //                 Members: {group.members_num}
    //               </Text>
    //               <Text style={{ fontFamily: "OpenSans" }}>
    //                 Description: {shortenDescription(group.group_description)}
    //               </Text>
    //             </View>
    //           </View>
    //         );
    //       })}
    //     </ScrollView>
    //     )
    //   }
    // </View>
  );
}
