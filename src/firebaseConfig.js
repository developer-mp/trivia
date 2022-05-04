import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRZNmTNSUyQjBGEPj_JtnBxTRT51863lo",
  authDomain: "trivia-15748.firebaseapp.com",
  projectId: "trivia-15748",
  storageBucket: "trivia-15748.appspot.com",
  messagingSenderId: "909905670169",
  appId: "1:909905670169:web:63c21ebb6b21f541503a88",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
