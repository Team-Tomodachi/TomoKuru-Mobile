import * as React from 'react';
import { Text, View } from 'react-native';

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
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'white',
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: '700' }}>{singlePackage.package_name}</Text>
      <Text>Description: {singlePackage.description}</Text>
      <Text>Cost per person: {singlePackage.package_per_person_cost}</Text>
      <Text>Duration: {singlePackage.duration}</Text>
      <Text>Food: {singlePackage.food}</Text>
      <Text>Drinks: {singlePackage.drinks}</Text>
      <Text>Capacity: {singlePackage.maximum_number_of_people}</Text>
      <Text>Other Notes: {singlePackage.other_notes}</Text>
    </View>
  );
}
