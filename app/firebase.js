// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYVOUVTKQcgfLawLnnJSr8X6SNdZWDjVA",
    authDomain: "teraki-todo-app-8137c.firebaseapp.com",
    projectId: "teraki-todo-app-8137c",
    storageBucket: "teraki-todo-app-8137c.appspot.com",
    messagingSenderId: "509961856806",
    appId: "1:509961856806:web:19c7ae12713192752803e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();  