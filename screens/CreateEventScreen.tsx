import React from "react";
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
} from "react-native";
import { Formik } from "formik";
import { styles } from "../styles/styles";
import Constants from "expo-constants";
import axios from "axios";
import useUserStore from "../store/user";

interface Event {
  eventName: string;
  eventDescription: string;
  eventDate: string;
}

export default function CreateEventScreen() {
  const initialValues: Event = {
    eventName: "",
    eventDescription: "",
    eventDate: "",
  };

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
              `${Constants?.expoConfig?.extra?.apiURL}/api/groups`,
              {
                user_id: id,
                event_name: values.eventName,
                event_description: values.eventDescription,
                event_date: values.eventDate,
              },
            );
            Alert.alert(
              "Event created",
              "You have successfully created an event",
            );
          }}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <Text>Event Name</Text>
              <TextInput
                style={styles("border:1", "p:1", "w:56", "m:5")}
                onChangeText={handleChange("groupName")}
                onBlur={handleBlur("groupName")}
                value={values.eventName}
                placeholder={values.eventName}
              />
              <Text>Event Description</Text>
              <View style={styles("border:1", "p:1", "w:56", "m:5", "h:20")}>
                <TextInput
                  onChangeText={handleChange("groupDesciption")}
                  onBlur={handleBlur("groupDesciption")}
                  multiline={true}
                  value={values.eventDescription}
                  placeholder={values.eventDescription}></TextInput>
              </View>
              <Text>Event Date</Text>
              <TextInput
                style={styles("border:1", "p:1", "w:56", "m:5")}
                onChangeText={handleChange("groupName")}
                onBlur={handleBlur("groupName")}
                value={values.eventDate}
                placeholder={values.eventDate}
              />
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
