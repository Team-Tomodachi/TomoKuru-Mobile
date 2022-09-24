import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions } from 'react-native';
import { styles } from '../styles/styles';
import Constants from 'expo-constants';
import { Chip } from 'react-native-paper';

const { width } = Dimensions.get('window');

interface Props {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  setTag: (tag: string) => void;
}

const BottomModal = (props: Props) => {
  const [tagData, setTagData] = useState([]);
  const { isVisible, setIsVisible, setTag } = props;

  useEffect(() => {
    axios
      .get(`${Constants?.expoConfig?.extra?.apiURL}/api/tags/`)
      .then((res) => setTagData(res.data));
  }, []);

  return (
    <>
      <Modal animationType="slide" transparent={true} visible={props.isVisible}>
        <View style={styled.modalView}>
          <View style={styles('flex:wrap', 'flex:row', 'flex:1', 'flex:grow', 'mb:5')}>
            {tagData.map((tag) => {
              return (
                <Chip
                  style={styles('m:1')}
                  key={tag.id}
                  onPress={() => {
                    setTag(tag.tag);
                    setIsVisible(false);
                  }}
                >
                  {tag.tag}
                </Chip>
              );
            })}
          </View>
          <Pressable
            style={[styled.button, styled.buttonClose]}
            onPress={() => {
              setTag('');
              setIsVisible(!isVisible);
            }}
          >
            <Text style={styles('text:2xl', 'text-align:center', 'font-weight:bold')}>
              Any tags
            </Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

const styled = StyleSheet.create({
  container: {
    backgroundColor: '#7CA1B4',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  square: {
    backgroundColor: '#7cb48f',
    width: 100,
    height: 100,
    margin: 4,
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 40,
    shadowColor: '#000',
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
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default BottomModal;
