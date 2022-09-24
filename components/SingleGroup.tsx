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
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import axios from "axios";
import useUserStore from "../store/user";
import GroupMemberList from "./GroupMemberList";

const { height, width } = Dimensions.get("screen");

export default function SingleGroup({ navigation, route }) {
  const [isMember, setIsMember] = React.useState(false);
  const singleGroup = route.params.selectedGroup;
  const { id } = useUserStore();
  const [groupID, setGroupID] = useState(singleGroup.id)

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
            style={styles.image}
            source={require("../DummyData/DummyGroupPhotos/sunday-futsal-in-kinshicho.jpeg")}></Image>
        </View>
        <Text style={styles.title}>{singleGroup.group_name} </Text>
        <Text style={styles.details}>{singleGroup.group_description} </Text>
        <Text style={styles.detailsUnderlined}>
          Group Leader: {singleGroup.group_leader}{" "}
        </Text>
        <Text style={styles.detailsUnderlined}>
          Privacy:{singleGroup.private}{" "}
        </Text>
        <GroupMemberList groupID={groupID}/>

        <TouchableOpacity
          onPress={() =>
            axios.post(
              `http://tomokuru.i-re.io/api/groups/${singleGroup.id}/${id}`,
            )
          }
          style={styles.button}>
          <Text style={styles.details}> Join This Group</Text>
        </TouchableOpacity>
        <Button title="Back" onPress={() => navigation.goBack()}></Button>

        {/* <TouchableOpacity
            onPress={ () => props.setSingleView(false)}
            style={styles.button}>
            <Text style={styles.details}>Go Back</Text>
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
  title: {
    fontSize: 30,
    // fontFamily: "OpenSans",
    textDecorationLine: "underline",
  },
  details: {
    fontSize: 20,
    // fontFamily: "OpenSans",
  },
  detailsUnderlined: {
    fontSize: 20,
    // fontFamily: "OpenSans",
    textDecorationLine: "underline",
  },
  image: {
    height: height * 0.3,
    width: width * 0.6,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 50,
    marginBottom: 20,
  },
});
