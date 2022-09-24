import {
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import Constants from "expo-constants";
import { Searchbar, Chip } from "react-native-paper";
import BottomModal from "./BottomModal";
import { styles } from "../styles/styles";

const { height, width } = Dimensions.get("screen");

export default function ListGroups({ navigation }) {
  const [query, setQuery] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [groupData, setGroupData] = useState([]);
  const [isModalVisibile, setModalVisibile] = useState<boolean>(false);

  useEffect(() => {
    filterGroup(query, tag);
  }, [query, tag]);

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

  const filterGroup = (query: string, tag: string) => {
    axios
      .get(`${Constants?.expoConfig?.extra?.apiURL}/api/groups`, {
        params: {
          query: query?.toLocaleLowerCase(),
          tag: tag,
        },
      })
      .then(response => {
        setGroupData(response.data);
      });
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
        onChangeText={text => {
          setQuery(text);
        }}
        value={query}
      />
      <Chip
        mode="outlined"
        style={styles("w:28")}
        icon="tag"
        onPress={() => setModalVisibile(true)}>
        {tag.length === 0 ? "any tags" : tag}
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
                      fontWeight: "700",
                    }}>
                    {item.group_name}
                  </Text>
                  <Text
                    style={{
                      fontStyle: "italic",
                      color: "#8F8F8F",
                    }}>
                    {isPrivate(item.private) === "private"
                      ? "Private Group"
                      : "Public Group"}
                    , {item.members_num} Members
                  </Text>
                  <Text>{shortenDescription(item.group_description)}</Text>
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
