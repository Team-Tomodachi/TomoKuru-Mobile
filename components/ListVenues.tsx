import {
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { Chip, Searchbar } from "react-native-paper";
import { styles } from "../styles/styles";

const { height, width } = Dimensions.get("screen");

export default function ListVenues({ navigation }) {
  const [query, setQuery] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [venueData, setVenueData] = useState([]);
  const [isLocationModalVisibile, setLocationModalVisibile] =
    useState<boolean>(false);

  useEffect(() => {
    filterVenues(query, location);
  }, [query, location]);

  const shortenDescription = (description: any) => {
    if (!description) {
      return "-";
    } else if (description.length > 120) {
      return description.slice(0, 120) + "...";
    } else {
      return description;
    }
  };

  const filterVenues = (query: string, location: string) => {
    axios
      .get("http://tomokuru.i-re.io/api/venues", {
        params: {
          query: query?.toLowerCase(),
          location: location?.toLowerCase(),
        },
      })
      .then(response => {
        setVenueData(response.data);
      });
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <Searchbar
          placeholder="Search"
          onChangeText={text => {
            setQuery(text);
          }}
          value={query}
        />
        {isLocationModalVisibile ? (
          <Searchbar
            placeholder="Location"
            onChangeText={text => {
              setLocation(text);
            }}
            value={location}
          />
        ) : null}
        <ScrollView horizontal={true}>
          <View
            style={styles(
              "bg-opacity:0",
              "flex:row",
              "h:10",
              "justify:evenly",
              "p:1",
            )}>
            <Chip
              mode="outlined"
              icon="map-marker"
              onPress={() =>
                setLocationModalVisibile(!isLocationModalVisibile)
              }>
              {location.length === 0 ? "Location" : location}
            </Chip>
            <Chip mode="outlined" icon="smoking-off">
              Smoking
            </Chip>
            <Chip mode="outlined" icon="table-chair">
              Outdoor Seating
            </Chip>
            <Chip mode="outlined" icon="account-multiple">
              Capacity
            </Chip>
          </View>
        </ScrollView>
        <ScrollView style={{ backgroundColor: "rgba(182, 182, 182, 1)" }}>
          {venueData.map((venue, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={venue =>
                  navigation.navigate("Venue Details", {
                    selectedVenue: venueData[index],
                  })
                }>
                <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 0,
                    borderRadius: 5,
                    margin: 10,
                    marginLeft: 15,
                    marginRight: 15,
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor: "white",
                  }}
                  key={index}>
                  <Image
                    style={{
                      height: height * 0.1,
                      width: width * 0.2,
                      marginTop: 20,
                      marginLeft: 20,
                      marginRight: 50,
                      marginBottom: 20,
                    }}
                    source={require("../DummyData/DummyVenuePhotos/ce-la-vi.jpeg")}></Image>
                  <View
                    style={{
                      flexDirection: "column",
                      width: width * 0.5,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "700",
                      }}>
                      {venue.location_name}
                    </Text>
                    <Text
                      style={{
                        fontStyle: "italic",
                        color: "#8F8F8F",
                      }}>
                      {venue.venue_type} {venue.prefecture} {venue.city_ward}
                    </Text>
                    <Text>{shortenDescription(venue.description)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
