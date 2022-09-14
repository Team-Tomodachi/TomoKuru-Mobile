import create from "zustand";

interface AuthState {
  isUserSignedIn: boolean;
  signUserIn: () => void;
  signUserOut: () => void;
}

const useAuthStore = create<AuthState>()(set => ({
  isUserSignedIn: false,
  signUserIn: () => set(() => ({ isUserSignedIn: true })),
  signUserOut: () => set(() => ({ isUserSignedIn: false })),
}));

export default useAuthStore;
