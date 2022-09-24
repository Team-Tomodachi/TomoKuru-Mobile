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

  
// let image = "";
export default function ListEventItems ({ singleEvent }) {

    const [image, setImage] = useState("")
    console.log(singleEvent)
    useEffect(() => {
        if (!singleEvent.photo_url){
          setImage("https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg")

        }
        else{
        const fileRef = ref(getStorage(), singleEvent.photo_url );
        getDownloadURL(fileRef).then(res => { 
          setImage(res);
        })
        }
      }
    )
    // const navigation = useNavigation();


          return (
            <TouchableOpacity
            //   onPress={() => {
            //     navigation.navigate("Group Details")
            //   }}
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
                    {singleEvent.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "OpenSans",
                      fontStyle: "italic",
                      color: "#8F8F8F",
                    }}>
                    Date: {singleEvent.date} 
                  </Text>
                  <Text style={{ fontFamily: "OpenSans" }}>
                    {shortenDescription(singleEvent.description)}
                  </Text>
                </View>
                </View>
            </TouchableOpacity>
          );
}