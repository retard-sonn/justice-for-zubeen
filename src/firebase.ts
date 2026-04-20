import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDw6tRIjvGTXDXJYWV-onGUtGE_8GcqbbQ",
  authDomain: "justice-for-zubeen-garg.firebaseapp.com",
  projectId: "justice-for-zubeen-garg",
  storageBucket: "justice-for-zubeen-garg.firebasestorage.app",
  messagingSenderId: "863586108811",
  appId: "1:863586108811:web:543a491f6b2eafbd865b8e",
  measurementId: "G-E2N61BFVGG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
