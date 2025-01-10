import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCc6VE1SbtDKSz6ij9GxCO7qpdQnYO3HwY",
  authDomain: "task1-7e713.firebaseapp.com",
  projectId: "task1-7e713",
  storageBucket: "task1-7e713.firebasestorage.app",
  messagingSenderId: "661872857156",
  appId: "1:661872857156:web:c045737e9b5e9ccabe2c11",
  measurementId: "G-VKLYW98Y8Y",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
