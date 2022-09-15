import React, { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  View,
  Switch,
  Text,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Pressable,
} from "react-native";
import { Formik } from "formik";
import { styles } from "../styles/styles";
import Constants from "expo-constants";
import axios from "axios";
import useUserStore from "../store/user";
import DateTimePicker from "@react-native-community/datetimepicker";

interface Event {
  eventName: string;
  eventDescription: string;
  eventDate: Date;
  venueId: string;
}

export default function CreateEventScreen({ navigation, route }) {
  const [venueId, setVenueId] = useState("");
  const [venueName, setVenueName] = useState("No venue");

  const initialValues: Event = {
    eventName: "",
    eventDescription: "",
    eventDate: new Date(),
    venueId: "",
  };

  useEffect(() => {
    if (route.params?.venueName) {
      setVenueName(route.params?.venueName);
    }
  }, [route.params?.venueName]);

  const { id } = useUserStore();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Formik
          initialValues={initialValues}
          // onSubmit={async (values: Event) => {
          //   await axios.post(
          //     `${Constants?.expoConfig?.extra?.apiURL}/api/groups`,
          //     {
          //       user_id: id,
          //       event_name: values.eventName,
          //       event_description: values.eventDescription,
          //       event_date: values.eventDate,
          //     },
          //   );
          //   Alert.alert(
          //     "Event created",
          //     "You have successfully created an event",
          //   );
          // }}>
          onSubmit={values => console.log(values)}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <Text>Event Name</Text>
              <TextInput
                style={styles("border:1", "p:1", "w:56", "m:5")}
                onChangeText={handleChange("eventName")}
                onBlur={handleBlur("eventName")}
                value={values.eventName}
                placeholder={values.eventName}
              />
              <Text>Event Description</Text>
              <View style={styles("border:1", "p:1", "w:56", "m:5", "h:20")}>
                <TextInput
                  onChangeText={handleChange("eventDescription")}
                  onBlur={handleBlur("eventDescription")}
                  multiline={true}
                  value={values.eventDescription}
                  placeholder={values.eventDescription}></TextInput>
              </View>
              <Text>Event Date</Text>
              <View>
                <DateTimePicker
                  mode="date"
                  value={values.eventDate}
                  onChange={() => handleChange("eventDate")}
                />
              </View>
              <Text>Event Venue</Text>
              <Pressable onPress={() => navigation.push("Select Venue")}>
                <Text>{venueName}</Text>
              </Pressable>
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
