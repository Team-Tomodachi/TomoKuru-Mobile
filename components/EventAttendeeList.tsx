import * as React from 'react';
import { Text, Dimensions, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

const { height, width } = Dimensions.get('screen');

export default function EventAttendeeList({ eventID }) {
  const [attendeeList, setAttendeeList] = useState([]);

  useEffect(() => {
    axios.get(`http://tomokuru.i-re.io/api/events/attendees/${eventID}`).then(function (response) {
      setAttendeeList(response.data);
    });
  }, []);

  const getAttendeeList = () => {
    let memberList = '';
    for (const member of attendeeList) {
      memberList += `${member.first_name}, `;
    }
    return memberList;
  };

  return (
    <>
      <Text style={styles.details}>
        {attendeeList.length} Attendees
      </Text>
      <Text style={styles.secondary}>
        {/* {getAttendeeList()} */}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    height: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 30,
    // fontFamily: "OpenSans",
    textDecorationLine: 'underline',
  },
  details: {
    fontSize: 18,
    fontFamily: "OpenSans-Bold",
    // marginTop: 15,
    marginBottom: 2,
  },
  detailsUnderlined: {
    fontSize: 20,
    // fontFamily: "OpenSans",
    textDecorationLine: 'underline',
  },
  image: {
    height: height * 0.3,
    width: width * 0.6,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 50,
    marginBottom: 20,
  },
  secondary: {
    fontFamily: "OpenSans-Regular",
    fontSize: 16,
    // marginBottom: 20,
  }
});
