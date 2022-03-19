// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { AuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5Io79NAi0oOJKnU_xApzfCbG7ZYpR2ss",
  authDomain: "my-first-project-9c7eb.firebaseapp.com",
  projectId: "my-first-project-9c7eb",
  storageBucket: "my-first-project-9c7eb.appspot.com",
  messagingSenderId: "607464725695",
  appId: "1:607464725695:web:81a07f04f2f28ae4f2fa0a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const GoogleProvider = new GoogleAuthProvider();
