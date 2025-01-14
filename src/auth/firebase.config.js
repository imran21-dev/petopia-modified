// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBI_6dFCyaJQdvApVds9RzXJ4eM258yoQ8",
  authDomain: "petopia-f7bab.firebaseapp.com",
  projectId: "petopia-f7bab",
  storageBucket: "petopia-f7bab.firebasestorage.app",
  messagingSenderId: "158162368400",
  appId: "1:158162368400:web:f0727d178f800c415a2515"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)