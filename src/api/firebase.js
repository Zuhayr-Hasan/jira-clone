import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth"; // Import getReactNativePersistence
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeZpCUwJaUnK3I-fmpmkHleEUhPJ5vOZA",
  authDomain: "projectadmins-a3ba3.firebaseapp.com",
  projectId: "projectadmins-a3ba3",
  storageBucket: "projectadmins-a3ba3.appspot.com",
  messagingSenderId: "159851418574",
  appId: "1:159851418574:web:8b635de56b05d14c09d19f",
  measurementId: "G-XM5N5HBD5K",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app, {
  persistence: getReactNativePersistence(),
});
export const googleProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
