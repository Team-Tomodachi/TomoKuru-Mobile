import React from "react";
import ExploreVenues from "./ExploreVenues";
import ExploreGroups from "./ExploreGroups";
import ExploreEvents from "./ExploreEvents";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function ExploreStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Groups" component={ExploreGroups} />
      <Tab.Screen name="Events" component={ExploreEvents} />
      <Tab.Screen name="Venues" component={ExploreVenues} />
    </Tab.Navigator>
  );
}
