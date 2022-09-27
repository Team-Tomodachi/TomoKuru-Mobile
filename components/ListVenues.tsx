import {
  View,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  ActionSheetIOS,
  FlatList,
  Button,
} from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import VenueListItem from './VenueListItem';
import { Chip, Searchbar } from 'react-native-paper';
import { styles } from '../styles/styles';

export default function ListVenues({ navigation, route }) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState<string | undefined>();
  const [smoking, setSmoking] = useState('');
  const [capacity, setCapacity] = useState<number | undefined>();
  const [outdoor, setOutdoor] = useState<boolean | undefined>();
  const [venueData, setVenueData] = useState([]);

  useEffect(() => {
    setLocation(route.params?.selectedLocation);
  }, [route.params?.selectedLocation]);

  const resetFilter = () => {
    setQuery('');
    setLocation(undefined);
    setSmoking('');
    setCapacity(undefined);
    setOutdoor(undefined);
  };

  const smokingActionSheet = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          'No Smoking',
          'Smoking Outside Only',
          'Electronic Cigarettes Only',
          'Smoking and Non-smoking areas',
          'Reset',
          'Cancel',
        ],
        destructiveButtonIndex: 4,
        cancelButtonIndex: 5,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          setSmoking('No Smoking');
        }
        if (buttonIndex === 1) {
          setSmoking('Smoking Outside Only');
        }
        if (buttonIndex === 2) {
          setSmoking('Electronic Cigarettes Only');
        }
        if (buttonIndex === 3) {
          setSmoking('Smoking and Non-smoking areas');
        }
        if (buttonIndex === 4) {
          setSmoking('');
        }
      },
    );

  const capacityActionSheet = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['20', '50', '100', '150', 'Reset', 'Cancel'],
        destructiveButtonIndex: 4,
        cancelButtonIndex: 5,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          setCapacity(20);
        }
        if (buttonIndex === 1) {
          setCapacity(50);
        }
        if (buttonIndex === 2) {
          setCapacity(100);
        }
        if (buttonIndex === 3) {
          setCapacity(150);
        }
        if (buttonIndex === 4) {
          setCapacity(undefined);
        }
      },
    );

  const outdoorActionSheet = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Required', 'Not Required', 'Cancel'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          setOutdoor(true);
        }
        if (buttonIndex === 1) {
          setOutdoor(undefined);
        }
      },
    );

  useEffect(() => {
    filterVenues(query, location, smoking, capacity, outdoor);
  }, [query, location, smoking, capacity, outdoor]);

  const filterVenues = (
    query: string,
    location: string | undefined,
    smoking: string,
    capacity: number | undefined,
    outdoor: boolean | undefined,
  ) => {
    axios
      .get('http://tomokuru.i-re.io/api/venues', {
        params: {
          query: query?.toLowerCase(),
          location: location?.toLowerCase(),
          smoking: smoking,
          capacity: capacity,
          outdoor: outdoor,
        },
      })
      .then((response) => {
        setVenueData(response.data);
      });
  };

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={(text) => {
          setQuery(text);
        }}
        value={query}
      />

      <View style={styles('flex:row')}>
        <Button title="Reset" onPress={resetFilter} />
        <ScrollView horizontal={true}>
          <Chip
            style={styles('mr:1')}
            mode="outlined"
            icon="map-marker"
            onPress={() => navigation.navigate('Locations')}
          >
            {location ? location : 'Location'}
          </Chip>
          <Chip
            style={styles('mr:1')}
            mode="outlined"
            icon="smoking-off"
            onPress={smokingActionSheet}
          >
            {smoking.length === 0 ? 'Smoking' : smoking}
          </Chip>
          <Chip
            style={styles('mr:1')}
            mode="outlined"
            icon="table-chair"
            onPress={outdoorActionSheet}
          >
            {outdoor ? 'Outdoor Seating: Required' : 'Outdoor Seating: Not Required'}
          </Chip>
          <Chip
            style={styles('mr:1')}
            mode="outlined"
            icon="account-multiple"
            onPress={capacityActionSheet}
          >
            {!capacity ? 'Capacity' : capacity}
          </Chip>
        </ScrollView>
      </View>
      <FlatList
        estimatedItemSize={170}
        data={venueData}
        keyExtractor={(venue, index) => index}
        renderItem={(venue) => {
          return <VenueListItem singleVenue={venue.item} />;
        }}
      />
    </>
  );
}
