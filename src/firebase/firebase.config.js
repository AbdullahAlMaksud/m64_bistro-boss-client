// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZer5FAI8Inwy14tGCTcU_729ojAAQcgw",
    authDomain: "bistroboss64.firebaseapp.com",
    projectId: "bistroboss64",
    storageBucket: "bistroboss64.appspot.com",
    messagingSenderId: "235100969127",
    appId: "1:235100969127:web:d608489c66f06045b2e382"

    // apiKey: import.meta.env.VITE_apiKey,
    // authDomain: import.meta.env.VITE_authDomain,
    // projectId: import.meta.env.VITE_projectId,
    // storageBucket: import.meta.env.VITE_storageBucket,
    // messagingSenderId: import.meta.env.VITE_messagingSenderId,
    // appId: import.meta.env.VITE_appId
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);