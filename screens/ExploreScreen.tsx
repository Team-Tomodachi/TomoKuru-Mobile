import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ListGroups from '../components/ListGroups';
import ListEvents from '../components/ListEvents';
import ListVenues from '../components/ListVenues';

const Tab = createMaterialTopTabNavigator();

export default function ExploreScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Groups" component={ListGroups} />
      <Tab.Screen name="Events" component={ListEvents} />
      <Tab.Screen name="Venues" component={ListVenues} />
    </Tab.Navigator>
  );
}
