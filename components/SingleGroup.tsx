import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import axios from "axios";
import useUserStore from "../store/user";

const { height, width } = Dimensions.get("screen");

export default function SingleGroup({ route }) {
  // const [loaded] = useFonts({
  //   OpenSans: require("../assets/fonts/OpenSans-Medium.ttf"),
  // });
  // if (!loaded) {
  //   return null;
  // }
  const [isMember, setIsMember] = React.useState(false);
  const singleGroup = route.params.selectedGroup;
  const { id } = useUserStore();

  return (
    <View>
      <ScrollView
        style={{
          backgroundColor: "white",
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 20,
          }}>
          <Image
            style={{
              height: height * 0.3,
              width: width * 0.6,
              marginTop: 20,
              marginLeft: 20,
              marginRight: 50,
              marginBottom: 20,
            }}
            source={require("../DummyData/DummyGroupPhotos/sunday-futsal-in-kinshicho.jpeg")}></Image>
        </View>
        <Text
          style={{
            fontSize: 30,
            fontFamily: "OpenSans",
            textDecorationLine: "underline",
          }}>
          {singleGroup.group_name}{" "}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "OpenSans",
          }}>
          {singleGroup.group_description}{" "}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "OpenSans",
            textDecorationLine: "underline",
          }}>
          Group Leader: {singleGroup.group_leader}{" "}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "OpenSans",
            textDecorationLine: "underline",
          }}>
          Privacy:{singleGroup.private}{" "}
        </Text>
        <TouchableOpacity
          onPress={async () => {
            if (!id) {
              Alert.alert("Error", "Please log in first");
              return;
            }
            await axios.post(
              `http://tomokuru.i-re.io/api/groups/members/${singleGroup.id}/${id}`,
            );
            setIsMember(!isMember);
          }}
          style={styles.button}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "OpenSans",
            }}>
            {isMember ? "Leave this group" : "Join This Group"}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
            onPress={ () => props.setSingleView(false)}
            style={styles.button}>
            <Text 
            style={{ 
            fontSize: 20, 
            fontFamily: "OpenSans"}}>
            Go Back</Text>
          </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  button: {
    height: height * 0.1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
    padding: 10,
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
  },
});
