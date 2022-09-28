import { View, Text, FlatList, Pressable, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles/styles';
import { Searchbar } from 'react-native-paper';

const wards: Array<String> = [
  'Adachi',
  'Arakawa',
  'Bunkyo',
  'Chiyoda',
  'Chuo',
  'Edogawa',
  'Itabashi',
  'Katsushika',
  'Kita',
  'Koto',
  'Minato',
  'Meguro',
  'Nakano',
  'Nerima',
  'Ota',
  'Setagaya',
  'Shibuya',
  'Shinagawa',
  'Shinjuku',
  'Suginami',
  'Sumida',
  'Taito',
  'Toshima',
];

export default function LocationSelectScreen({ navigation }) {
  const [location, setLocation] = useState('');
  const [filterRes, setFilterRes] = useState([]);

  useEffect(() => {
    const filtered = wards.filter(ward => ward.toLowerCase().includes(location.toLowerCase()))
    setFilterRes(filtered)
  }, [location]);

  return (
    <SafeAreaView style={styles('flex:1')}>
      <Searchbar value={location} onChangeText={(text) => setLocation(text)} />
      <FlatList
        data={filterRes.filter((ward: string) => ward.indexOf(location) !== -1)}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={styles('border:1', 'p:1', 'm:1')}
              onPress={() =>
                navigation.navigate('Venues', {
                  selectedLocation: item,
                })
              }
            >
              <Text>{item}</Text>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}
