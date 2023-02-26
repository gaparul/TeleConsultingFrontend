
// import firebase from 'firebase';
import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";

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
  export const auth = getAuth(app);

  export default app;