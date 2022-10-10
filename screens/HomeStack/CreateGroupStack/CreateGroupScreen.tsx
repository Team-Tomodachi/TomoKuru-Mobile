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
  TouchableOpacity,
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
import { Styling } from '../../../styles/styling';
import * as yup from 'yup';

interface Group {
  groupName: string;
  groupDesciption: string;
  isPrivate: boolean;
}

const loginValidationSchema = yup.object().shape({
  groupName: yup.string().required('A group name is required'),
  groupDesciption: yup.string().required('A group description is required'),
});

export default function CreateGroupScreen({ navigation, route }) {
  const initialValues: Group = {
    groupName: '',
    groupDesciption: '',
    isPrivate: false,
  };

  // const { data } = useUser();
  // const { id } = data;

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
    <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={[styles('w:56', 'text-align:justify'), Styling.h2Text]}>Group Photo</Text>
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
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={async (values) => {
              setUploading(true);
              let photoUrl;
              if (imageUri.length !== 0) {
                photoUrl = await uploadImage();
              }
              await sendToDB(values, photoUrl);
              setUploading(false);
              Alert.alert('Group created', 'You have successfully created a group');
              navigation.goBack();
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
              <View>
                <Text style={[styles('w:56', 'text-align:justify'), Styling.h2Text]}>
                  Group Name
                </Text>
                <TextInput
                  style={[styles('border:1', 'p:2', 'w:56', 'm:5', 'mt:1'), Styling.formField]}
                  onChangeText={handleChange('groupName')}
                  onBlur={handleBlur('groupName')}
                  value={values.groupName}
                  placeholder={values.groupName}
                />
                {errors.groupName && (
                  <Text style={[{ color: 'red' }, Styling.formField]}>{errors.groupName}</Text>
                )}
                <Text style={[styles('w:56', 'text-align:justify'), Styling.h2Text]}>
                  Group Description
                </Text>
                <TextInput
                  style={[
                    styles('border:1', 'p:2', 'w:56', 'm:5', 'mt:1', 'mb:7'),
                    Styling.formField,
                  ]}
                  onChangeText={handleChange('groupDesciption')}
                  onBlur={handleBlur('groupDesciption')}
                  multiline={true}
                  value={values.groupDesciption}
                  placeholder={values.groupDesciption}
                ></TextInput>
                {errors.groupDesciption && (
                  <Text style={[{ color: 'red' }, Styling.formField]}>
                    {errors.groupDesciption}
                  </Text>
                )}
                <Text style={[styles('w:56', 'text-align:justify'), Styling.h2Text]}>Tag</Text>
                <Pressable
                  onPress={() =>
                    navigation.navigate('Tags', {
                      prevScreen: 'Create Group',
                    })
                  }
                >
                  <Text style={styles('text:xl')}>
                    {route.params?.selectedTag || 'Select a tag'}
                  </Text>
                </Pressable>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={[
                    Styling.actionButton,
                    { backgroundColor: '#CC960C', alignItems: 'center' },
                  ]}
                >
                  <Text style={[Styling.actionButtonText, { backgroundColor: '#CC960C' }]}>
                    SUBMIT
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
