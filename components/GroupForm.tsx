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
          <TextInput
            style={styles("border:1", "p:1", "w:56", "m:5")}
            onChangeText={handleChange("groupName")}
            onBlur={handleBlur("groupName")}
            value={values.groupName}
            placeholder={values.groupName}
          />
          <TextInput
            style={styles("border:1", "p:1", "w:56", "m:5")}
            onChangeText={handleChange("groupDesciption")}
            onBlur={handleBlur("groupDesciption")}
            value={values.groupDesciption}
            placeholder={values.groupDesciption}
          />
          <View style={styles("flex:row")}>
            <Text>Public</Text>
            <Switch
              value={values.isPrivate}
              onValueChange={value => setFieldValue("isPrivate", value)}
            />
            <Text>Private</Text>
          </View>

          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
}
