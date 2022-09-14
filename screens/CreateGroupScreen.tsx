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
import Axios from "axios";
import useUserStore from "../store/user";

interface Group {
  groupName: string;
  groupDesciption: string;
  isPrivate: boolean;
}

export default function CreateGroupScreen() {
  const initialValues: Group = {
    groupName: "",
    groupDesciption: "",
    isPrivate: false,
  };

  const { id } = useUserStore();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values: Group) => {
            await Axios.post(
              `${Constants?.expoConfig?.extra?.apiURL}/api/groups`,
              {
                group_name: values.groupName,
                group_description: values.groupDesciption,
                group_leader: id,
                private: values.isPrivate,
              },
            );
            Alert.alert(
              "Group created",
              "You have successfully created a group",
            );
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
          }) => (
            <View>
              <Text>Group Name</Text>
              <TextInput
                style={styles("border:1", "p:1", "w:56", "m:5")}
                onChangeText={handleChange("groupName")}
                onBlur={handleBlur("groupName")}
                value={values.groupName}
                placeholder={values.groupName}
              />
              <Text>Group Description</Text>
              <View style={styles("border:1", "p:1", "w:56", "m:5", "h:20")}>
                <TextInput
                  onChangeText={handleChange("groupDesciption")}
                  onBlur={handleBlur("groupDesciption")}
                  multiline={true}
                  value={values.groupDesciption}
                  placeholder={values.groupDesciption}></TextInput>
              </View>
              <Text>Group Privacy</Text>
              <View
                style={styles(
                  "flex:row",
                  "items:center",
                  "w:56",
                  "m:5",
                  "justify:evenly",
                )}>
                <Text>Private</Text>
                <Switch
                  value={values.isPrivate}
                  onValueChange={value => setFieldValue("isPrivate", value)}
                />
              </View>
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
