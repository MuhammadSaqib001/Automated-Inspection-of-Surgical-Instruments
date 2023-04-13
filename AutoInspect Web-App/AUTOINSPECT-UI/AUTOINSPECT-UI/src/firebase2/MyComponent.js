import { getStorage } from "firebase/storage";
import { getDatabase } from 'firebase/database';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // apiKey: "AIzaSyAovgrehAk9wSEBXq12t9f6U7oreWr4MdQ",
  // authDomain: "autoinspect-cea1d.firebaseapp.com",
  // databaseURL: "https://autoinspect-cea1d-default-rtdb.firebaseio.com",
  // projectId: "autoinspect-cea1d",
  // storageBucket: "autoinspect-cea1d.appspot.com",
  // messagingSenderId: "741072514454",
  // appId: "1:741072514454:web:953b078a2bea7d381c01b7",
  // measurementId: "G-4DS28YPPZE"
  // apiKey: "AIzaSyAxpHwf6bFW1cgRjzGF0HJQH1w-YmK85eo",
  // authDomain: "auto-inspect.firebaseapp.com",
  // projectId: "auto-inspect",
  // storageBucket: "auto-inspect.appspot.com",
  // messagingSenderId: "90555169396",
  // appId: "1:90555169396:web:a55c105cf80acf20b12f21",
  // measurementId: "G-XZW79SKDFX"

  // azka's firebase
  
  apiKey: "AIzaSyDnRd3OZXx1AMSbVuuw1vBxyJi9dNNCEEA",
  authDomain: "autoinspect-e1842.firebaseapp.com",
  projectId: "autoinspect-e1842",
  storageBucket: "autoinspect-e1842.appspot.com",
  messagingSenderId: "74614921610",
  appId: "1:74614921610:web:da173a5520f1faf054d073"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getDatabase(app);
export const dbfireStore = getFirestore(app);
