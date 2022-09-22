import * as React from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import Constants from "expo-constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Searchbar, Chip } from "react-native-paper";
import BottomModal from "./BottomModal";
import { styles } from "../styles/styles";

const { height, width } = Dimensions.get("screen");

export default function ListGroups({ navigation }) {
  const [query, setQuery] = React.useState<string>("");
  const [tag, setTag] = React.useState<string>("any tags");
  const [groupData, setGroupData] = React.useState([]);
  const [isModalVisibile, setModalVisibile] = React.useState<boolean>(false);

  React.useEffect(() => {
    axios
      .get(`${Constants?.expoConfig?.extra?.apiURL}/api/groups`)
      .then(res => setGroupData(res.data));
  }, []);

  // React.useEffect(() => {
  //   axios
  //     .get(`${Constants?.expoConfig?.extra?.apiURL}/api/groups/${tag}/${query}`)
  //     .then(res => setGroupData(res.data));
  // }, [tag, query]);

  const shortenDescription = (description: any) => {
    if (!description) {
      return "description is empty";
    } else if (description.length > 120) {
      return description.slice(0, 120) + "...";
    } else {
      return description;
    }
  };

  const isPrivate = (privacy: boolean) => {
    return privacy === false ? "public" : "private";
  };

  return (
    <View>
      <BottomModal
        isVisible={isModalVisibile}
        setIsVisible={setModalVisibile}
        setTag={setTag}
      />
      <Searchbar
        placeholder="Search"
        onChangeText={text => setQuery(text)}
        value={query}
      />
      <Chip
        mode="outlined"
        style={styles("w:28")}
        icon="tag"
        onPress={() => setModalVisibile(true)}>
        {tag}
      </Chip>
      <FlatList
        data={groupData}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate({
                  name: "Group Details",
                  params: { selectedGroup: item },
                });
              }}>
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 0,
                  borderRadius: 5,
                  margin: 10,
                  marginLeft: 15,
                  marginRight: 15,
                  paddingTop: 10,
                  paddingBottom: 10,
                  backgroundColor: "white",
                }}>
                <Image
                  style={{
                    height: height * 0.1,
                    width: width * 0.2,
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 50,
                    marginBottom: 20,
                  }}
                  source={require("../DummyData/DummyGroupPhotos/sunday-futsal-in-kinshicho.jpeg")}
                />
                <View
                  style={{
                    flexDirection: "column",
                    width: width * 0.5,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "OpenSans",
                      fontWeight: "700",
                    }}>
                    {item.group_name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "OpenSans",
                      fontStyle: "italic",
                      color: "#8F8F8F",
                    }}>
                    {isPrivate(item.private) === "private"
                      ? "Private Group"
                      : "Public Group"}
                    , {item.members_num} Members
                  </Text>
                  <Text style={{ fontFamily: "OpenSans" }}>
                    {shortenDescription(item.group_description)}
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
