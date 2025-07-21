import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCRAdSXg0iMUfArMggIponeWl9ENyPpTw",
  authDomain: "my-project-27a1e.firebaseapp.com",
  databaseURL:"https://my-project-27a1e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-project-27a1e",
  storageBucket: "my-project-27a1e.firebasestorage.app",
  messagingSenderId: "896137775120",
  appId: "1:896137775120:web:e124093ea3684e41306295",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
