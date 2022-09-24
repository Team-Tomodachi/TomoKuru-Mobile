import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { styles } from "../styles/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import GroupListItem from "./GroupListItem"

const { height, width } = Dimensions.get("screen");


export default function ListGroups({ navigation }) {

  const [groupData, setGroupData] = useState([])

  useEffect(() => {
    axios.get("http://tomokuru.i-re.io/api/groups").then(function (response) {
      setGroupData(response.data);
    });
  }, []);



  return (
    <View>
      <ScrollView style={{ backgroundColor: "#B6B6B6" }}>
        {groupData.map((group, index) => {
          return (
            <GroupListItem singleGroup={group} key={index} /> 
          )
        })
      }
      </ScrollView>
    </View>
  )
}
    
