import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDXxvmkvJlLP33BSi4upooK7tAVypPeiqQ",
  authDomain: "rechargenow-5993a.firebaseapp.com",
  projectId: "rechargenow-5993a",
  storageBucket: "rechargenow-5993a.appspot.com",
  messagingSenderId: "153121752067",
  appId: "1:153121752067:web:1f047ee15df1fa360f3a36",
  measurementId: "G-9274STQKZF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

