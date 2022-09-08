import * as React from "react";
import { styles } from "../styles/styles";
import { Button, Text, View, ScrollView, Dimensions } from "react-native";
import Feather from "@expo/vector-icons/Ionicons";
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast'
import { useState } from "react";
import ListItems from "../components/ListItems";
import ListVenues from "../components/ListVenues";
import ListEvents from "../components/ListEvents";

export default function ExploreScreen() {
  let [showToast, setShowToast] = useState(false);
  const [currentView, setCurrentView] = useState()

  const {height, width} = Dimensions.get("screen");

  return (
    <ScrollView>
      <View style={{ 
        flex: 3, 
        justifyContent: "center", 
        alignItems: "center"
        }}>
      <Text style= {{ fontSize: 30}}> Explore Groups</Text>
      <ListItems />
      <View>
        <Button title="Explore More Groups" onPress={() => setShowToast(true)}/>
      </View>
    <Text style= {{ fontSize: 30}} > Explore Events</Text>
    <ListEvents />
      <View>
        <Button title="Explore More Events" onPress={() => setShowToast(true)}/>
      </View>
    <Text style= {{ fontSize: 30}}> Explore Venues</Text>
    <ListVenues />
      <View>
        <Button title="Explore More Venues" onPress={() => setShowToast(true)}/>
      </View>
    </View>
    </ScrollView>
  );
}
