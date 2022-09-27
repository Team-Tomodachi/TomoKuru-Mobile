import axios from 'axios';
import Constants from 'expo-constants';
import { useQuery } from '@tanstack/react-query';
import useUser from './useUser';

export default function useJoinedGroups() {
  const { data } = useUser();
  const { id } = data;

  return useQuery(['joinedGroups'], () =>
    axios
      .get(`${Constants?.expoConfig?.extra?.apiURL}/api/users/${id}/groups/member`)
      .then((res) => res.data),
  );
}
