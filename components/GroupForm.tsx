// Formik x React Native example
import React from "react";
import { Button, TextInput, View } from "react-native";
import { Formik } from "formik";
import { styles } from "../styles/styles";

interface Group {
  groupName: string;
  groupDesciption: string;
  private: string;
}

export function GroupForm() {
  const initialValues: Group = { groupName: "", groupDesciption: "" };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(value: Group) => console.log(value)}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
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
          <TextInput
            style={styles("border:1", "p:1", "w:56", "m:5")}
            onChangeText={handleChange("private")}
            onBlur={handleBlur("private")}
            value={values.private}
            placeholder={values.private}
          />
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
}
