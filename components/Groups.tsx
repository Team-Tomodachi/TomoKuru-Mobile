import * as React from "react";
import { Text, View, ScrollView, Dimensions, Image } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import axios from "axios";
import SingleGroup from "../components/SingleGroup";
import ListGroups from "../components/ListGroups";


export default function ListItems() {
  const [GroupData, setGroupData] = useState([]);
  const [singleView, setSingleView] = useState(false);
  const [IndexValue, setIndexValue] = useState(Number);
  const [selectedGroup, setSelectedGroup] = useState({})

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

  return (
        <View>
          {singleView === true ? (
                <SingleGroup 
                    IndexValue={IndexValue}
                    selectedGroup={selectedGroup}
                    setSingleView={setSingleView}
                /> 
            ) : (
                <ListGroups 
                    GroupData={GroupData}
                    setIndexValue={setIndexValue}
                    setSingleView={setSingleView}
                    setSelectedGroup={setSelectedGroup}
                    selectedGroup={selectedGroup}
                />
            )}
        </View>
        )
}