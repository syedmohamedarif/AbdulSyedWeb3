// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtZaGoXOHBk4homlAdXIDrS6om3T8F0dw",
  authDomain: "appointmentdata-c72d6.firebaseapp.com",
  projectId: "appointmentdata-c72d6",
  storageBucket: "appointmentdata-c72d6.firebasestorage.app",
  messagingSenderId: "162220937733",
  appId: "1:162220937733:web:98f83774e6ee92a277826c",
  measurementId: "G-MR2GDLJFQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
