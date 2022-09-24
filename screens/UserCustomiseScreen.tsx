import { Alert, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles/styles';
import { TextInput, Button } from 'react-native-paper';
import { Formik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Constants from 'expo-constants';
import useUser from '../hooks/useUser';

interface InfoToUpdate {
  name: string;
  cityWard: string;
  prefecture: string;
  contact: string;
}

export default function UserCustomiseScreen({ navigation }) {
  const [isUpdateDisabled, setUpdateDisabled] = useState<boolean>(true);
  const [isResetDisabled, setResetDisbaled] = useState<boolean>(true);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (values: InfoToUpdate) =>
      axios.patch(`${Constants?.expoConfig?.extra?.apiURL}/api/users/${data.email}`, {
        first_name: values.name,
        city_ward: values.cityWard,
        prefecture: values.prefecture,
        contact: values.contact,
      }),
    {
      onMutate: async (values: InfoToUpdate) => {
        await queryClient.cancelQueries(['userInfo']);
        const previousUserInfo = queryClient.getQueryData(['userInfo']);
        if (previousUserInfo) {
          queryClient.setQueryData(['userInfo'], {
            ...previousUserInfo,
            first_name: values.name,
            city_ward: values.cityWard,
            prefecture: values.prefecture,
          });
          return { previousUserInfo };
        }
      },
      onError: (err, variables, context) => {
        console.log(err);
        if (context?.previousUserInfo) {
          queryClient.setQueryData(['userInfo'], context.previousUserInfo);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['userInfo']);
      },
    },
  );

  const { data } = useUser();

  const initialValues: InfoToUpdate = {
    name: data.first_name,
    cityWard: data.city_ward,
    prefecture: data.prefecture,
    contact: data.contact,
  };

  const enableButtons = () => {
    setUpdateDisabled(false);
    setResetDisbaled(false);
  };

  const disableButtons = () => {
    setUpdateDisabled(true);
    setResetDisbaled(true);
  };

  return (
    <View style={styles('flex:1', 'flex:col', 'justify:center')}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          mutate(values);
          navigation.goBack();
          Alert.alert('Succes', 'Your info has been updated');
        }}
      >
        {({ setFieldValue, handleSubmit, resetForm, values }) => (
          <>
            <TextInput
              label="Name"
              value={values.name}
              placeholder={values.name}
              clearButtonMode="while-editing"
              onChangeText={(text) => {
                setFieldValue('name', text);
                enableButtons();
              }}
            />
            <TextInput
              label="City/ward"
              value={values.cityWard}
              placeholder={values.cityWard}
              clearButtonMode="while-editing"
              onChangeText={(text) => {
                setFieldValue('cityWard', text);
                enableButtons();
              }}
            />
            <TextInput
              label="Prefecture"
              value={values.prefecture}
              placeholder={values.prefecture}
              clearButtonMode="while-editing"
              onChangeText={(text) => {
                setFieldValue('prefecture', text);
                enableButtons();
              }}
            />
            <TextInput
              label="Emergency Contact"
              value={values.contact}
              placeholder={values.contact}
              clearButtonMode="while-editing"
              onChangeText={(text) => {
                setFieldValue('contact', text);
                enableButtons();
              }}
            />
            <View style={styles('flex:col', 'items:center', 'my:5')}>
              <Button
                disabled={isUpdateDisabled}
                onPress={handleSubmit}
                style={styles(
                  'bg:green-500',
                  'rounded:lg',
                  'h:10',
                  'justify:center',
                  'items:center',
                  'w:72',
                )}
              >
                Update
              </Button>
              <Text style={styles('my:3', 'text:2xl')}>or</Text>
              <Button
                disabled={isResetDisabled}
                onPress={() => {
                  resetForm();
                  disableButtons();
                }}
                style={styles(
                  'bg:red-500',
                  'rounded:lg',
                  'h:10',
                  'justify:center',
                  'items:center',
                  'w:72',
                )}
              >
                Reset
              </Button>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
