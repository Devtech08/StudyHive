
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  "projectId": "scholarsage-67bnd",
  "appId": "1:501150445012:web:724ec1d4a3b7c1f29dba41",
  "storageBucket": "scholarsage-67bnd.firebasestorage.app",
  "apiKey": "AIzaSyC_QDlpOIBZtjsKe6EQUNRAngA14TgrdBA",
  "authDomain": "scholarsage-67bnd.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "501150445012"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
