// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxINdzDvWljPu3Q-RSToveImt-TAatvUI",
  authDomain: "e-buy-2073d.firebaseapp.com",
  projectId: "e-buy-2073d",
  storageBucket: "e-buy-2073d.appspot.com",
  messagingSenderId: "829878814899",
  appId: "1:829878814899:web:5f3a20bb6e0cd0907448c6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;