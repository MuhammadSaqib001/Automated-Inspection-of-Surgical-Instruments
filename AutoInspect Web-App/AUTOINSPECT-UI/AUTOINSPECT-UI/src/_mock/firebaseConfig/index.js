import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import { getAnalytics } from "firebase/analytics";

function StartFirebase(){
    const firebaseConfig = {
        apiKey: "AIzaSyAovgrehAk9wSEBXq12t9f6U7oreWr4MdQ",
        authDomain: "autoinspect-cea1d.firebaseapp.com",
        databaseURL: "https://autoinspect-cea1d-default-rtdb.firebaseio.com",
        projectId: "autoinspect-cea1d",
        storageBucket: "autoinspect-cea1d.appspot.com",
        messagingSenderId: "741072514454",
        appId: "1:741072514454:web:953b078a2bea7d381c01b7",
        measurementId: "G-4DS28YPPZE"
      };
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);

      return getDatabase(app);
}

export default StartFirebase;