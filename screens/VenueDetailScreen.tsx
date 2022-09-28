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
import { Styling } from "../styles/styling"
import Feather from '@expo/vector-icons/Feather';
import * as Linking from 'expo-linking';


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

  const callNum = () => {
    const url = `tel:${singleVenue.phone_num}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView
      style={{
        backgroundColor: 'white',
      }}
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 5,
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
      <View
        style={
          Styling.greyBox
        }
      >
        <Text style={styles.title}>{singleVenue.location_name}</Text>
        <Text style={styles.venueType}>{singleVenue.venue_type} - {singleVenue.prefecture}, {singleVenue.city_ward}</Text>
        <Text style={styles.details}>{singleVenue.description}</Text>
        <Text style={styles.detailsItalic}>Maximum Capacity: {singleVenue.num_seats} </Text>
        <Text style={styles.detailsItalic}>{singleVenue.smoking}</Text>
        <Text style={styles.location}>{singleVenue.address} </Text>
        <TouchableOpacity
          onPress={goToMaps}
          style={styles.actionButton}
        >
          <Text
            style={styles.actionButtonText}
          >
            <Feather name="map" color="black" size={18}></Feather>   View Map
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={callNum}
          style={styles.actionButton}
        >
          <Text
            style={styles.actionButtonText}
          >
            <Feather name="phone" color="black" size={18}></Feather>   {singleVenue.phone_num}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL(`mailto:${singleVenue.venue_email}`).catch(error => {
            console.log(error);
          })}
          style={styles.actionButton}
        >
          <Text
            style={styles.actionButtonText}
          >
            <Feather name="mail" color="black" size={18}></Feather>   {singleVenue.venue_email}
          </Text>
        </TouchableOpacity>
        {/* <Text> {singleVenue.outdoor_seating} </Text>
        <Text> {singleVenue.venue_url} </Text>
        <Text> {singleVenue.photo_link} </Text> */}
        {showPackages ? (
          <ViewPackages singleVenue={singleVenue.id} />
        ) : (
          <>
            <TouchableOpacity
              onPress={() => setShowPackages(true)}
              style={styles.actionButton}
            >
              <Text
                style={styles.actionButtonText}
              >
                <Feather name="info" color="black" size={18}></Feather>   Show Packagaes
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    // height: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCB90F',
    padding: 7,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontFamily: "OpenSans-Bold",
    marginBottom: 2,
  },
  details: {
    fontSize: 17,
    fontFamily: "OpenSans-Medium",
    marginBottom: 7,
  },
  detailsItalic: {
    fontSize: 16,
    fontFamily: "OpenSans-Italic",
    color: "#4B4B4B",
  },
  group: {
    fontSize: 20,
    fontFamily: "OpenSans-BoldItalic",
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "OpenSans-Bold",
  },
  image: {
    height: height * 0.3,
    width: width * 0.9,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  venueType: {
    fontSize: 18,
    fontFamily: "OpenSans-MediumItalic",
    marginBottom: 7,
    color: "#4B4B4B",
  },
  location: {
    fontSize: 18,
    fontFamily: "OpenSans-SemiBold",
    marginTop: 15,
    color: "#4B4B4B",
  },
  actionButton: {
    backgroundColor: '#FCB90F',
    padding: 7,
    margin: 10
  },
  actionButtonText: {
    backgroundColor: '#FCB90F',
    fontSize: 18,
    fontFamily: 'OpenSans-ExtraBold',
    textAlign: "center",
  },
});