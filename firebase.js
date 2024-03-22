// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsRA8bO8MyhB-Jk9zmOwagvblq1-irY48",
  authDomain: "govdz-30f7f.firebaseapp.com",
  projectId: "govdz-30f7f",
  storageBucket: "govdz-30f7f.appspot.com",
  messagingSenderId: "764473570697",
  appId: "1:764473570697:web:4a0df5887cb58400c99d58",
  measurementId: "G-ZWBPDZRHX6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app, getReactNativePersistence(ReactNativeAsyncStorage));

// Exportez 'auth' pour l'utiliser dans d'autres parties de votre application
export { auth };