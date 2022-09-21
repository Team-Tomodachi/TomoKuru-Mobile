import axios from "axios";
import Constants from "expo-constants";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "../store/user";

export default function useUser() {
  const { email } = useUserStore();

  return useQuery(["userInfo"], () =>
    axios
      .get(`${Constants?.expoConfig?.extra?.apiURL}/api/users/${email}`)
      .then(res => res.data),
  );
}
