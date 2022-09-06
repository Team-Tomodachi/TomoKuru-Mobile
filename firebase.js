import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants.manifest.extra.fbApiKey,
  authDomain: Constants.manifest.extra.fbAuthDomain,
  projectId: Constants.manifest.extra.fbProjectId,
  storageBucket: Constants.manifest.extra.fbStorageBucket,
  messagingSenderId: Constants.manifest.extra.fbMessagingSenderId,
  appId: Constants.manifest.extra.fbAppId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
