import React, { useEffect, useState } from 'react';
import {
  TextInput,
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import { styles } from '../../../styles/styles';
import Constants from 'expo-constants';
import axios from 'axios';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import useUser from '../../../hooks/useUser';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { ActivityIndicator } from 'react-native-paper';
import { Button } from 'react-native-paper';
import useUserCreatedGroup from '../../../hooks/useUserGroup';

interface Event {
  eventName: string;
  eventDescription: string;
  eventDateTime: Date;
}

export default function CreateEventScreen({ navigation, route }) {
  const [venueId, setVenueId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [isDateTimePickerVisible, setDateTimePickerVisibility] = useState(false);

  const [imageUri, setImageUri] = useState<string>('');
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [isUploading, setUploading] = useState<boolean>(false);

  const showDateTimePicker = () => {
    setDateTimePickerVisibility(true);
  };

  const hideDateTimePicker = () => {
    setDateTimePickerVisibility(false);
  };

  const pickImage = async () => {
    if (!status?.granted) {
      requestPermission();
    }
    if (status?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        // aspect: [4, 3],
        quality: 0.2,
      });
      if (!result.cancelled) {
        setImageUri(result.uri);
      }
    }
  };

  const initialValues: Event = {
    eventName: '',
    eventDescription: '',
    eventDateTime: new Date(),
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
  const createdGroup = useUserCreatedGroup().data;

  const uploadImage = async () => {
    const image = await fetch(imageUri);
    const blob: Blob = await image.blob();
    const filePath: string = `groups/${uuid.v4()}-${Date.now()}`;
    const storageLocRef = ref(getStorage(), filePath);
    await uploadBytesResumable(storageLocRef, blob);
    return filePath;
  };

  const sendToDB = async (values, photoUrl) => {
    await axios.post(`${Constants?.expoConfig?.extra?.apiURL}/api/events`, {
      user_id: id,
      name: values.eventName,
      description: values.eventDescription,
      start_time: values.eventDateTime,
      venue_id: venueId,
      photo_url: photoUrl,
      group_id: groupId,
    });
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text>Event Photo</Text>
        <Image
          source={
            imageUri.length === 0
              ? require('../../../assets/place-holder.jpg')
              : {
                uri: imageUri,
              }
          }
          style={{ width: 300, height: 150, backgroundColor: 'gray' }}
          resizeMode="cover"
        />
        <Button
          icon="camera"
          style={styles('bg:green-600', 'my:2')}
          onPress={pickImage}
          disabled={isUploading}
        >
          {isUploading ? <ActivityIndicator animating={true} color="white" /> : 'select photo'}
        </Button>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values: Event) => {
              setUploading(true);
              let photoUrl;
              if (imageUri.length !== 0) {
                photoUrl = await uploadImage();
              }
              await sendToDB(values, photoUrl);
              setUploading(false);
              Alert.alert('Event created', 'You have successfully created an event');
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
              <View>
                <Text>Event Name</Text>
                <TextInput
                  style={styles('border:1', 'p:1', 'w:56', 'm:5')}
                  onChangeText={handleChange('eventName')}
                  onBlur={handleBlur('eventName')}
                  value={values.eventName}
                  placeholder={values.eventName}
                />
                <Text>Event Description</Text>
                <View style={styles('border:1', 'p:1', 'w:56', 'm:5', 'h:20')}>
                  <TextInput
                    onChangeText={handleChange('eventDescription')}
                    onBlur={handleBlur('eventDescription')}
                    multiline={true}
                    value={values.eventDescription}
                    placeholder={values.eventDescription}
                  ></TextInput>
                </View>
                <Text>Event Date & Time</Text>
                <Button onPress={showDateTimePicker}>
                  {values.eventDateTime.toLocaleDateString() +
                    ' ' +
                    values.eventDateTime.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                </Button>
                <DateTimePickerModal
                  isVisible={isDateTimePickerVisible}
                  mode="datetime"
                  onConfirm={(time) => {
                    setFieldValue('eventTime', time);
                    hideDateTimePicker();
                  }}
                  onCancel={hideDateTimePicker}
                />
                <Text>Group</Text>
                <Pressable
                  onPress={() => {
                    if (!Array.isArray(createdGroup)) {
                      Alert.alert('No group', 'You need to create a group');
                      return;
                    }
                    navigation.push('Select Group');
                  }}
                >
                  <Text style={styles('text:2xl')}>
                    {route?.params?.groupName || 'Select a group'}
                  </Text>
                </Pressable>
                <Text>Event Venue</Text>
                <Pressable onPress={() => navigation.push('Select Venue')}>
                  <Text style={styles('text:2xl')}>
                    {route?.params?.venueName || 'Select a venue'}
                  </Text>
                </Pressable>
                <Button onPress={handleSubmit}>Submit</Button>
              </View>
            )}
          </Formik>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
