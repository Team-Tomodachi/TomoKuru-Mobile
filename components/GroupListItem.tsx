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
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("screen");

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

  
// let image = "";
export default function ListGroupItems ({ singleGroup }) {

    const [image, setImage] = useState("")

    useEffect(() => {
        if (!singleGroup.photo_url){
          setImage("https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg")
        }
        else{
        const fileRef = ref(getStorage(), singleGroup.photo_url );
        getDownloadURL(fileRef).then(res => { 
          setImage(res);
        })
        }
      }
    )
    const navigation = useNavigation();


          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Group Details", {
                  selectedGroup: singleGroup
                })
              }}
              >
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
                }}
                >
                    
                <Image
                    style={{
                      height: height * 0.1,
                      width: width * 0.2,
                      marginTop: 20,
                      marginLeft: 20,
                      marginRight: 50,
                      marginBottom: 20,
                    }}
                      source={{
                        uri: image,
                      }}
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
                    {singleGroup.group_name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "OpenSans",
                      fontStyle: "italic",
                      color: "#8F8F8F",
                    }}>
                    {isPrivate(singleGroup.private) === "private"
                      ? "Private Group"
                      : "Public Group"}
                    , {singleGroup.members_num} Members
                  </Text>
                  <Text style={{ fontFamily: "OpenSans" }}>
                    {shortenDescription(singleGroup.group_description)}
                  </Text>
                </View>
                </View>
            </TouchableOpacity>
          );
}