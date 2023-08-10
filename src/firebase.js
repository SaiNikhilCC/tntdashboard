import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-g7rhHfd04UrzgIBnOs3im6GsuMO4r0o",
  authDomain: "tnt-app-4b0e8.firebaseapp.com",
  projectId: "tnt-app-4b0e8",
  storageBucket: "tnt-app-4b0e8.appspot.com",
  messagingSenderId: "30980769580",
  appId: "1:30980769580:web:ec520919f9c478cac4ce89",
  measurementId: "G-PD842HR6FX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
