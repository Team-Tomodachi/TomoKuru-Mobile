import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import { styles } from '../../../styles/styles';
import Constants from 'expo-constants';
import Axios from 'axios';
import useUser from '../../../hooks/useUser';
import { ActivityIndicator } from 'react-native-paper';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { Button } from 'react-native-paper';

interface Group {
  groupName: string;
  groupDesciption: string;
  isPrivate: boolean;
}

export default function CreateGroupScreen({ navigation, route }) {
  const initialValues: Group = {
    groupName: '',
    groupDesciption: '',
    isPrivate: false,
  };

  const { data } = useUser();
  const { id } = data;

  const [imageUri, setImageUri] = useState('');
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [isUploading, setUploading] = useState<boolean>(false);

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

  const uploadImage = async () => {
    const image = await fetch(imageUri);
    const blob: Blob = await image.blob();
    const filePath: string = `groups/${uuid.v4()}-${Date.now()}`;
    const storageLocRef = ref(getStorage(), filePath);
    await uploadBytesResumable(storageLocRef, blob);
    return filePath;
  };

  const sendToDB = async (values, photoUrl) => {
    await Axios.post(`${Constants?.expoConfig?.extra?.apiURL}/api/groups`, {
      group_name: values.groupName,
      group_description: values.groupDesciption,
      user_id: id,
      private: values.isPrivate,
      photo_url: photoUrl,
      tag_id: route.params?.tagId,
    }).catch(function (error) {
      console.log('Axios Post Error!', error);
      return Promise.reject(error);
    });
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text>Group Photo</Text>
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
            onSubmit={async (values) => {
              setUploading(true);
              const photoUrl = await uploadImage();
              await sendToDB(values, photoUrl);
              setUploading(false);
              Alert.alert('Group created', 'You have successfully created a group');
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View>
                <Text>Group Name</Text>
                <TextInput
                  style={styles('border:1', 'p:1', 'w:56', 'm:5')}
                  onChangeText={handleChange('groupName')}
                  onBlur={handleBlur('groupName')}
                  value={values.groupName}
                  placeholder={values.groupName}
                />
                <Text>Group Description</Text>
                <View style={styles('border:1', 'p:1', 'w:56', 'm:5', 'h:20')}>
                  <TextInput
                    onChangeText={handleChange('groupDesciption')}
                    onBlur={handleBlur('groupDesciption')}
                    multiline={true}
                    value={values.groupDesciption}
                    placeholder={values.groupDesciption}
                  ></TextInput>
                </View>
                <Text>Tag</Text>
                <Pressable
                  onPress={() =>
                    navigation.navigate('Tags', {
                      prevScreen: 'Create Group',
                    })
                  }
                >
                  <Text style={styles('text:2xl')}>
                    {route.params?.selectedTag || 'Select a tag'}
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
