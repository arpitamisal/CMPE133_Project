import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAErcXfOvKx386tqKS8JlE6FNHBlXj3gm0",
  authDomain: "recipefinder-e7416.firebaseapp.com",
  projectId: "recipefinder-e7416",
  storageBucket: "recipefinder-e7416.appspot.com",
  messagingSenderId: "204567142620",
  appId: "1:204567142620:web:04433407d724cc1c7c9419",
  measurementId: "G-ZX0Y1KE6FW"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);