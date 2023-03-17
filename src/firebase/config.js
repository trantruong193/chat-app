// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDdch_K9OzJyECwcyw4fv8MFac9oXsJdLQ",
    authDomain: "chat-app-fe682.firebaseapp.com",
    projectId: "chat-app-fe682",
    storageBucket: "chat-app-fe682.appspot.com",
    messagingSenderId: "508345851448",
    appId: "1:508345851448:web:6a41ccb44c4c58bedf10cd",
    measurementId: "G-GLM6NVX2HV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore();

