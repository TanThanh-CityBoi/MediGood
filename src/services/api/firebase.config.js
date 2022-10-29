// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdPLBade1sFhX3QwnWqz2b9DeOIgHMcGo",
  authDomain: "nha-thuoc-cong-dong.firebaseapp.com",
  projectId: "nha-thuoc-cong-dong",
  storageBucket: "nha-thuoc-cong-dong.appspot.com",
  messagingSenderId: "53373914567",
  appId: "1:53373914567:web:0ad680b0f961d4e5e35de2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
