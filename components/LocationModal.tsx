import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { styles } from "../styles/styles";

const { width } = Dimensions.get("window");

interface Props {
  isVisible: boolean;
  location: string;
  setIsVisible: (isVisible: boolean) => void;
  setLocation: (tag: string) => void;
}

const LocationModal = (props: Props) => {
  const { isVisible, location, setIsVisible, setLocation } = props;

  return (
    <>
      <Modal animationType="slide" transparent={true} visible={props.isVisible}>
        <View style={styled.modalView}>
          <Searchbar
            style={{ marginBottom: 10 }}
            value={location}
            placeholder="Enter a location"
            onChangeText={text => {
              setLocation(text);
            }}></Searchbar>
          <Pressable
            style={[styled.button, styled.buttonClose]}
            onPress={() => {
              setIsVisible(!isVisible);
            }}>
            <Text
              style={styles(
                "text:2xl",
                "text-align:center",
                "font-weight:bold",
              )}>
              Clear
            </Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

const styled = StyleSheet.create({
  container: {
    backgroundColor: "#7CA1B4",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  square: {
    backgroundColor: "#7cb48f",
    width: 100,
    height: 100,
    margin: 4,
  },
  modalView: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 0,
    paddingHorizontal: 40,
  },
  button: {
    width: width * 0.9,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default LocationModal;
