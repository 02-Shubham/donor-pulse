// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, push, onValue } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBxfpeooIP_TFT2-5aUQASaSYGE37Xmo4",
  authDomain: "blood-donation-a3bea.firebaseapp.com",
  databaseUrl:"https://blood-donation-a3bea-default-rtdb.firebaseio.com",
  projectId: "blood-donation-a3bea",
  storageBucket: "blood-donation-a3bea.firebasestorage.app",
  messagingSenderId: "255951219520",
  appId: "1:255951219520:web:0a99bd97dafe850aa728a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const database = getDatabase(app);
export default app;
export { database, ref, push,onValue };