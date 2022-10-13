// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTh2LlCXK9K-8uLu030hIqJPEgS9cKSO4",
  authDomain: "luxywine-1b242.firebaseapp.com",
  projectId: "luxywine-1b242",
  storageBucket: "luxywine-1b242.appspot.com",
  messagingSenderId: "625529114715",
  appId: "1:625529114715:web:f0f8881b93be7b0128af7e",
  measurementId: "G-HM7ZBS3MTQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
