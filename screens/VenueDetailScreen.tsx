import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import openMap from 'react-native-open-maps';
import firebaseUtils from '../utils/firebaseUtils';
import ViewPackages from '../components/ViewPackages';

const { height, width } = Dimensions.get('screen');
const { getImgUrl } = firebaseUtils;

export default function VenueDetailScreen({ navigation, route }) {
  const singleVenue = route.params.selectedVenue;
  const [image, setImage] = useState('');
  const [showPackages, setShowPackages] = useState(false);

  const goBackHidePackages = () => {
    setShowPackages(false);
    navigation.goBack();
  };

  useEffect(() => {
    (async () => {
      if (singleVenue.photo_url) {
        const imgUrl = await getImgUrl(singleVenue.photo_url);
        if (imgUrl) setImage(imgUrl);
      }
    })();
  }, []);

  const goToMaps = () => {
    openMap({ query: singleVenue.address, provider: 'google' });
  };

  return (
    <View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 25,
          }}
        >
          <Image
            style={styles.image}
            source={
              image.length === 0
                ? require('../assets/place-holder.jpg')
                : {
                    uri: image,
                  }
            }
          />
        </View>
        <Text style={styles.title}>{singleVenue.location_name} </Text>
        <Text style={styles.detailsItalicized}>{singleVenue.venue_type} </Text>
        <Text style={styles.details}> {singleVenue.description} </Text>
        <Text style={styles.details}>
          🏙{singleVenue.city_ward}, {singleVenue.prefecture}
        </Text>
        <Text style={styles.details}> 📞 {singleVenue.phone_num} </Text>
        <Text style={styles.details}>📍{singleVenue.address} </Text>
        <TouchableOpacity>
          <Button title="🗺Open in Maps🗺" onPress={goToMaps} />
        </TouchableOpacity>
        <Text style={styles.details}> ✉️ {singleVenue.venue_email} </Text>
        <Text style={styles.details}>🪑{singleVenue.num_seats} </Text>
        <Text style={styles.details}>🚬 {singleVenue.smoking} </Text>
        {/* <Text> {singleVenue.outdoor_seating} </Text>
        <Text> {singleVenue.venue_url} </Text>
        <Text> {singleVenue.photo_link} </Text> */}
        {showPackages ? (
          <ViewPackages singleVenue={singleVenue.id} />
        ) : (
          <Button title="Show Packages" onPress={() => setShowPackages(true)} />
        )}
        <Button
          title="Go Back"
          onPress={() => {
            goBackHidePackages();
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    height: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 30,
    // fontFamily: "OpenSans",
    textDecorationLine: 'underline',
  },
  details: {
    fontSize: 20,
    // fontFamily: "OpenSans",
  },
  detailsUnderlined: {
    fontSize: 20,
    // fontFamily: "OpenSans",
    textDecorationLine: 'underline',
  },
  detailsItalicized: {
    fontSize: 20,
    // fontFamily: "OpenSans",
    fontStyle: 'italic',
  },
  image: {
    height: height * 0.3,
    width: width * 0.9,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 50,
    marginBottom: 20,
  },
});
