// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5eZHQ8WyLysC9YoOBienzWK9-THyYmVE",
  authDomain: "wba001-payments.firebaseapp.com",
  projectId: "wba001-payments",
  storageBucket: "wba001-payments.firebasestorage.app",
  messagingSenderId: "983667953051",
  appId: "1:983667953051:web:9c2c03f6f03b42f84c253e",
  measurementId: "G-MNR6W3Z3QL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
