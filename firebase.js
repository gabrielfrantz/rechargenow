import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDXxvmkvJlLP33BSi4upooK7tAVypPeiqQ",
  authDomain: "rechargenow-5993a.firebaseapp.com",
  projectId: "rechargenow-5993a",
  storageBucket: "rechargenow-5993a.appspot.com",
  messagingSenderId: "153121752067",
  appId: "1:153121752067:web:1f047ee15df1fa360f3a36",
  measurementId: "G-9274STQKZF"
};

const initialize = initializeApp(firebaseConfig);
await initialize;
const analytics = getAnalytics(initialize);
const app = getApp(initialize);
const auth = getAuth(initialize);
const storage = getStorage(initialize);
const firestore = getFirestore(initialize);
const database = getDatabase(initialize);

