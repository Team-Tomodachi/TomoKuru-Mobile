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
import useUser from "../hooks/useUser";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";
import { ActivityIndicator } from "react-native-paper";
import { Button as PaperButton } from "react-native-paper";

interface Event {
  eventName: string;
  eventDescription: string;
  eventDate: Date;
  eventTime: Date;
  venueId: string;
  photoURL: string;
  groupId: string;
}
//TODO: react-native-paper button?
//TODO: this doesn't push to db and my image ref isn't getting passed in??
//TODO: is the endpoint for photo_url here?

export default function CreateEventScreen({ navigation, route }) {
  const [venueId, setVenueId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [imageRef, setImageRef] = useState<string>("placeholder.gif");
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [isUploading, setUploading] = useState<boolean>(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const pickImage = async () => {
    if (!status?.granted) {
      requestPermission();
    }
    if (status?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setUploading(true);
        const image = await fetch(result.uri);
        const blob: Blob = await image.blob();
        const filePath: string = `events/${uuid.v4()}-${Date.now()}`;
        setImageRef(filePath);
        const storageLocRef = ref(getStorage(), filePath);
        await uploadBytesResumable(storageLocRef, blob);
        setUploading(false);
        //TODO Implement lazy loading
      }
    }
  };

  const initialValues: Event = {
    eventName: "",
    eventDescription: "",
    eventDate: new Date(),
    eventTime: new Date(),
    venueId: "",
    photoURL: "events/placeholder.gif",
    groupId: "",
  };

  useEffect(() => {
    if (route.params?.venueId) {
      setVenueId(route.params?.venueId);
    }
  }, [route.params?.venueId]);

  useEffect(() => {
    if (route.params?.groupId) {
      setGroupId(route.params?.groupId);
    }
  }, [route.params?.groupId]);

  const { data } = useUser();
  const { id } = data;

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
                date: values.eventDate,
                start_time: values.eventTime,
                venue_id: venueId,
                photo_url: imageRef,
                group_id: groupId,
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
                title={values.eventDate.toLocaleDateString()}
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
              <Text>Event Time</Text>
              <Button
                title={values.eventTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                onPress={showTimePicker}
              />
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={time => {
                  setFieldValue("eventTime", time);
                  hideTimePicker();
                }}
                onCancel={hideTimePicker}
              />
              <Text>Group</Text>
              <Pressable onPress={() => navigation.push("Select Group")}>
                <Text style={styles("text:2xl")}>
                  {route?.params?.groupName || "Select a group"}
                </Text>
              </Pressable>
              <Text>Event Venue</Text>
              <Pressable onPress={() => navigation.push("Select Venue")}>
                <Text style={styles("text:2xl")}>
                  {route?.params?.venueName || "Select a venue"}
                </Text>
              </Pressable>
              <Text>Event Photo</Text>
              <PaperButton
                icon="camera"
                style={styles("bg:green-600", "my:2")}
                onPress={pickImage}
                disabled={isUploading}>
                {isUploading ? (
                  <ActivityIndicator animating={true} color="white" />
                ) : (
                  "select photo"
                )}
              </PaperButton>
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
