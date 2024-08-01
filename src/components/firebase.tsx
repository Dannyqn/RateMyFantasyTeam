// Import the necessary functions from Firebase SDK
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace this with your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDgH1Ks-8YTFZla3CcmhYlRLsqZGf-DKHc",
    authDomain: "ratemyfantasyteam-b80af.firebaseapp.com",
    projectId: "ratemyfantasyteam-b80af",
    storageBucket: "ratemyfantasyteam-b80af.appspot.com",
    messagingSenderId: "50033900435",
    appId: "1:50033900435:web:2bcdb610ed236d7ba80666",
    measurementId: "G-65KKBLGD1D"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the auth service
const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };