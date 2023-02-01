// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAjuNwC5U1B_q0cKwXMFiVdrF2zjnB3Izg',
  authDomain: 'boardgamevault-ffd5f.firebaseapp.com',
  databaseURL: 'https://boardgamevault-ffd5f-default-rtdb.firebaseio.com',
  projectId: 'boardgamevault-ffd5f',
  storageBucket: 'boardgamevault-ffd5f.appspot.com',
  messagingSenderId: '267545553839',
  appId: '1:267545553839:web:2a1b751ed26880c6621d5a',
  measurementId: 'G-J6SMGE5L07',
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
