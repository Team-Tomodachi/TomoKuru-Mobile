import create from "zustand";

const useAuthStore = create(set => ({
  isUserSignedIn: false,
  userId: "",
  userInfo: {},
  signUserIn: () => set(state => ({ isUserSignedIn: true })),
  setUserId: (id: string) => set(state => ({ userId: id })),
  signUserOut: () => set(state => ({ isUserSignedIn: false })),
  setUserInfo: (user: object) => set(state => ({ userInfo: user })),
}));

export default useAuthStore;
