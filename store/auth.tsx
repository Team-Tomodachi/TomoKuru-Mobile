import create from "zustand";

const useAuthStore = create(set => ({
  isUserSignedIn: false,
  signUserIn: () => set(state => ({ isUserSignedIn: true })),
  signUserOut: () => set(state => ({ isUserSignedIn: false })),
}));

export default useAuthStore;
