import * as React from 'react';
import { Text, View } from 'react-native';
import { Styling } from '../styles/styling';

export default function PackageListItem({ singlePackage }) {
  return (
    <View
      style={{
        flexDirection: 'column',
        borderWidth: 0,
        borderRadius: 5,
        margin: 10,
        marginLeft: 15,
        marginRight: 15,
        padding: 10,
        backgroundColor: 'white',
      }}
    >
      <Text style={Styling.h2Text}>{singlePackage.package_name}</Text>
      <Text style={Styling.sectionText}>Description: {singlePackage.description}</Text>
      <Text style={Styling.sectionText}>Cost per person: {singlePackage.package_per_person_cost}</Text>
      <Text style={Styling.sectionText}>Duration: {singlePackage.duration}</Text>
      <Text style={Styling.sectionText}>Food: {singlePackage.food}</Text>
      <Text style={Styling.sectionText}>Drinks: {singlePackage.drinks}</Text>
      <Text style={Styling.sectionText}>Capacity: {singlePackage.maximum_number_of_people}</Text>
      <Text style={Styling.sectionText}>Other Notes: {singlePackage.other_notes}</Text>
    </View>
  );
}
