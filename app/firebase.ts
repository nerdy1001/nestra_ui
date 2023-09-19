// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEwHh_lUjjKpDIEotPTvRgFFNhhNiEaKs",
  authDomain: "nestra-cc437.firebaseapp.com",
  databaseURL: "https://nestra-cc437-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nestra-cc437",
  storageBucket: "nestra-cc437.appspot.com",
  messagingSenderId: "225845118365",
  appId: "1:225845118365:web:8e2da91bfd635a43025b74",
  measurementId: "G-PWTM76NZHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth()
export const storage = getStorage(app)
