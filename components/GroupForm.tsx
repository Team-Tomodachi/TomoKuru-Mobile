// Formik x React Native example
import React from "react";
import { Button, TextInput, View, Switch, Text } from "react-native";
import { Formik } from "formik";
import { styles } from "../styles/styles";

interface Group {
  groupName: string;
  groupDesciption: string;
  isPrivate: boolean;
}

export function GroupForm() {
  const initialValues: Group = {
    groupName: "",
    groupDesciption: "",
    isPrivate: false,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: Group) => console.log(values)}>
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
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
  );
}
