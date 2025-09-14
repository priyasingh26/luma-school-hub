import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// This is where you will paste your config object from the Firebase console.
const firebaseConfig = {
  apiKey: "AIzaSyCWt8n5dgx587E3fO8YGFskE5GaBhy7AjA",
  authDomain: "mis-admin-f6b7a.firebaseapp.com",
  projectId: "mis-admin-f6b7a",
  storageBucket: "mis-admin-f6b7a.firebasestorage.app",
  messagingSenderId: "358002421971",
  appId: "1:358002421971:web:b65875d032de9da8f5e426",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);