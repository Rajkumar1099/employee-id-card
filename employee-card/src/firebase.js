
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optiona

const firebaseConfig = {
  apiKey: "AIzaSyDwKn_V1gGuc_ltLmugoqzqqYm6kFzBC_s",
  authDomain: "nfctestcards.firebaseapp.com",
  databaseURL: "https://nfctestcards-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nfctestcards",
  storageBucket: "nfctestcards.appspot.com",
  messagingSenderId: "832822075431",
  appId: "1:832822075431:web:7b067b41d778350d1aee02"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);
const auth=getAuth(app);
export {database ,  auth, storage}

