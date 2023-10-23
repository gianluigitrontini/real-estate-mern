import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-mern-aa856.firebaseapp.com",
  projectId: "real-estate-mern-aa856",
  storageBucket: "real-estate-mern-aa856.appspot.com",
  messagingSenderId: "97743703269",
  appId: "1:97743703269:web:e45814466eec4f6ec5980c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
