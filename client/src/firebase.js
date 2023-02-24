// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8-_l9bCcRHXsVRBi2PSz_JTuQLvowCC8",
  authDomain: "realstate-c61d8.firebaseapp.com",
  projectId: "realstate-c61d8",
  storageBucket: "realstate-c61d8.appspot.com",
  messagingSenderId: "123277567834",
  appId: "1:123277567834:web:5c26410f27cbe23c9ff563"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore()