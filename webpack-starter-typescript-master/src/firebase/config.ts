import firebase, { initializeApp } from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB_AiK8dnUgAoxqzKGGs0yoJJeEMKywP0I",
  authDomain: "sql-demos-cba39.firebaseapp.com",
  projectId: "sql-demos-cba39",
  storageBucket: "sql-demos-cba39.appspot.com",
  messagingSenderId: "767636273365",
  appId: "1:767636273365:web:9b517376eaed2252918a5c",
  measurementId: "G-1NEF6D9N9M"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log("Firebase configurado");

export default firebase.firestore(); //aqui estamos importando la base de datos