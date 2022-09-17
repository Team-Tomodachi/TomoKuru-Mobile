import React from "react";
import { Button, Text, View, ScrollView } from "react-native";
import Venues from "../components/Venues";
import Groups from "../components/Groups";
import Events from "../components/Events";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function ExploreScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Groups" component={Groups} />
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Venues" component={Venues} />
    </Tab.Navigator>
  );
}
