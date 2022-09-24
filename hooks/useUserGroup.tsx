import axios from 'axios';
import Constants from 'expo-constants';
import { useQuery } from '@tanstack/react-query';
import useUserStore from '../store/user';
import useUser from './useUser';

export default function useUserCreatedGroup() {
  const { data } = useUser();
  const { id } = data;

  return useQuery(['userCreatedGroup'], () =>
    axios.get(`${Constants?.expoConfig?.extra?.apiURL}/api/groups/${id}`).then((res) => res.data),
  );
}
