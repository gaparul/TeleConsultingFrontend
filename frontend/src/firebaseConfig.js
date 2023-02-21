  // Import the functions you need from the SDKs you need
  import firebase from 'firebase';
  import { initializeApp } from "firebase/app";
  import { getAnalytics } from "firebase/analytics";

  // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZRWjbSPhZdF3qGxW76EfFGoWOLBFSfr0",
    authDomain: "teleconsultingapplication.firebaseapp.com",
    projectId: "teleconsultingapplication",
    storageBucket: "teleconsultingapplication.appspot.com",
    messagingSenderId: "548560029296",
    appId: "1:548560029296:web:e868c5d9f4143f166e56b5",
    measurementId: "G-160GEW3RZM"
  };
  
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = firebase.auth()
  const analytics = getAnalytics(app);

  export {auth, firebase};