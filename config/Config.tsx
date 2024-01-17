import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYMNn2v2FSYPH0VO_k75DK_Nco1YiQzeg",
  authDomain: "app-taller1.firebaseapp.com",
  databaseURL: "https://app-taller1-default-rtdb.firebaseio.com",
  projectId: "app-taller1",
  storageBucket: "app-taller1.appspot.com",
  messagingSenderId: "884196235709",
  appId: "1:884196235709:web:cacd26600c648bb9119ad4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)
export const storage = getStorage(app)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
