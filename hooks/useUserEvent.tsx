import axios from 'axios';
import Constants from 'expo-constants';
import { useQuery } from '@tanstack/react-query';
import useUser from './useUser';

export default function useUserCreatedEvents() {
  const { data } = useUser();
  const { id } = data;

  return useQuery(['userCreatedEvents'], () =>
    axios
      .get(`${Constants?.expoConfig?.extra?.apiURL}/api/users/${id}/events/creator`)
      .then((res) => res.data),
  );
}
