import * as React from "react";
import { Text, View, ScrollView, Dimensions, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import axios from "axios";
import SingleGroup from "../components/SingleGroup";


const { height, width } = Dimensions.get("screen");

export default function ListGroups({ navigation }) {
  const [groupData, setGroupData] = useState([]);
  
  useEffect(() => {
    axios.get("http://tomokuru.i-re.io/api/groups").then(function (response) {
      setGroupData(response.data);
    });
  }, []);

  const shortenDescription = (description: any) => {
    if (!description) {
      return "description is empty" 
    } 
    else if (description.length > 120) {
      return description.slice(0, 120) + "...";
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
          {groupData.map((group, index) => {
            return (
              <TouchableOpacity
                onPress={ () => {
                  props.setIndexValue(index)
                  props.setSingleView(true)
                  props.setSelectedGroup(props.GroupData[index])
                  console.log("selected group: " + props.selectedGroup)
                  console.log("index passed from OnPress: " + index)}
                }
                key={index}
                >
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 0,
                  borderRadius: 5,
                  margin: 10,
                  marginLeft: 15,
                  marginRight: 15,
                  // padding: 10,
                  paddingTop: 10,
                  paddingBottom: 10,
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
                    navigation.navigate({
                      name: "Group Details",
                      params: { selectedGroup: groupData[index]}
                    })}
                    // props.setIndexValue(index)
                    // props.setSingleView(true)
                    // props.setSelectedGroup(props.GroupData[index])
                    // console.log("selected group: " + props.selectedGroup)
                    // console.log("index passed from OnPress: " + index)}
                  }
                  style={{ fontSize: 18, fontFamily: "OpenSans", fontWeight: "700"}}>
                    {group.group_name}
                  </Text>
                  <Text style={{ fontFamily: "OpenSans", fontStyle: "italic", color: "#8F8F8F"   }}>
                    {isPrivate(group.private) === "private" ? "Private Group" : "Public Group"},  {group.members_num} Members
                  </Text>
                  {/* <Text style={{ fontFamily: "OpenSans" }}>
                    {group.members_num} Members
                  </Text> */}
                  <Text style={{ fontFamily: "OpenSans"}}>
                    {shortenDescription(group.group_description)}
                  </Text>
                </View>
              </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
    </View>
  );
}
