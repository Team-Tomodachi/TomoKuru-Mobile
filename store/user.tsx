import create from "zustand";

interface UserInfo {
  name: string;
  id: string;
  email: string;
  interests: [string];
  setUserInfo: (name: string, id: string, email: string) => void;
}

const useUserStore = create<UserInfo>()(set => ({
  name: "",
  id: "",
  email: "",
  interests: [""],
  setUserInfo: (name, id, email) =>
    set(() => ({
      name: name,
      id: id,
      email: email,
    })),
}));

export default useUserStore;
