import axios from 'axios';
import Constants from 'expo-constants';
import { useQuery } from '@tanstack/react-query';
import useUser from './useUser';

export default function useJoinedEvents() {
  const { data } = useUser();
  const { id } = data;

  return useQuery(['joinedEvents'], () =>
    axios
      .get(`${Constants?.expoConfig?.extra?.apiURL}/api/users/${id}/events/attendee`)
      .then((res) => res.data),
  );
}
