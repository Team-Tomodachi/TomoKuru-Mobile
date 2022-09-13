import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.fbApiKey,
  authDomain: Constants.expoConfig.extra.fbAuthDomain,
  projectId: Constants.expoConfig.extra.fbProjectId,
  storageBucket: Constants.expoConfig.extra.fbStorageBucket,
  messagingSenderId: Constants.expoConfig.extra.fbMessagingSenderId,
  appId: Constants.expoConfig.extra.fbAppId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
