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
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface Event {
  eventName: string;
  eventDescription: string;
  eventDate: Date;
  venueId: string;
}

export default function CreateEventScreen({ navigation, route }) {
  const [venueId, setVenueId] = useState("");
  const [venueName, setVenueName] = useState("No venue");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

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

  useEffect(() => {
    if (route.params?.venueId) {
      setVenueId(route.params?.venueId);
    }
  }, [route.params?.venueId]);

  const { id } = useUserStore();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values: Event) => {
            await axios.post(
              `${Constants?.expoConfig?.extra?.apiURL}/api/events`,
              {
                user_id: id,
                name: values.eventName,
                description: values.eventDescription,
                date: new Intl.DateTimeFormat("en-US", {
                  dateStyle: "long",
                }).format(values.eventDate),
                venue_id: venueId,
              },
            );
            Alert.alert(
              "Event created",
              "You have successfully created an event",
            );
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
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
              <Button
                title={new Intl.DateTimeFormat("en-US", {
                  dateStyle: "long",
                }).format(values.eventDate)}
                onPress={showDatePicker}
              />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={date => {
                  setFieldValue("eventDate", date);
                  hideDatePicker();
                }}
                onCancel={hideDatePicker}
              />
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
