import { Text, View } from "react-native";
import React, { useState } from "react";
import { styles } from "../styles/styles";
import { TextInput, Button } from "react-native-paper";
import { Formik } from "formik";

export default function UserCustomiseScreen() {
  const [isUpdateDisabled, setUpdateDisabled] = useState<boolean>(true);
  const [isResetDisabled, setResetDisbaled] = useState<boolean>(true);

  const initialValues = {
    name: "Name",
    email: "Email",
    password: "",
    cityWard: "",
    prefecture: "",
    contact: "",
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
    <View style={styles("flex:1", "flex:col", "justify:center")}>
      <Formik
        initialValues={initialValues}
        onSubmit={values => console.log(values)}>
        {({ setFieldValue, handleSubmit, resetForm, values }) => (
          <>
            <TextInput
              label="Name"
              value={values.name}
              placeholder={values.name}
              clearButtonMode="while-editing"
              onChangeText={text => {
                setFieldValue("name", text);
                enableButtons();
              }}
            />
            <TextInput
              label="Email"
              value={values.email}
              placeholder={values.email}
              clearButtonMode="while-editing"
              onChangeText={text => {
                setFieldValue("email", text);
                enableButtons();
              }}
            />
            <TextInput
              label="Password"
              value={values.password}
              placeholder={values.password}
              secureTextEntry={true}
              clearButtonMode="while-editing"
              onChangeText={text => {
                setFieldValue("password", text);
                enableButtons();
              }}
            />
            <TextInput
              label="City/ward"
              value={values.cityWard}
              placeholder={values.cityWard}
              clearButtonMode="while-editing"
              onChangeText={text => {
                setFieldValue("cityWard", text);
                enableButtons();
              }}
            />
            <TextInput
              label="Prefecture"
              value={values.prefecture}
              placeholder={values.prefecture}
              clearButtonMode="while-editing"
              onChangeText={text => {
                setFieldValue("prefecture", text);
                enableButtons();
              }}
            />
            <TextInput
              label="Contact"
              value={values.contact}
              placeholder={values.contact}
              clearButtonMode="while-editing"
              onChangeText={text => {
                setFieldValue("contact", text);
                enableButtons();
              }}
            />
            <View style={styles("flex:col", "items:center", "my:5")}>
              <Button
                disabled={isUpdateDisabled}
                onPress={() => console.log("Pressed")}
                style={styles(
                  "bg:green-500",
                  "rounded:lg",
                  "h:10",
                  "justify:center",
                  "items:center",
                  "w:72",
                )}>
                Update
              </Button>
              <Text style={styles("my:3", "text:2xl")}>or</Text>
              <Button
                disabled={isResetDisabled}
                onPress={() => {
                  resetForm();
                  disableButtons();
                }}
                style={styles(
                  "bg:red-500",
                  "rounded:lg",
                  "h:10",
                  "justify:center",
                  "items:center",
                  "w:72",
                )}>
                Reset
              </Button>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
