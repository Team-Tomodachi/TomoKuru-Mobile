import * as React from 'react';
import { View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PackageListItem from './PackageListItem';
import { styles } from '../styles/styles';

export default function ViewPackages({ singleVenue }) {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios
      .get(`http://tomokuru.i-re.io/api/venues/packages/${singleVenue}`)
      .then(function (response) {
        setPackages(response.data);
      });
  }, []);

  return (
    <View style={styles('w:full')}>
      <FlatList
        data={packages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <PackageListItem singlePackage={item} />;
        }}
      />
    </View>
  );
}
