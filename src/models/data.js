// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkaFVNDjU127n7rcc3Yxrp3JWpE20utJk",
  authDomain: "api-rest-node-js-data-2d869.firebaseapp.com",
  projectId: "api-rest-node-js-data-2d869",
  storageBucket: "api-rest-node-js-data-2d869.firebasestorage.app",
  messagingSenderId: "549741932001",
  appId: "1:549741932001:web:f09c3a80417f6a1715f6a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// Export the initialized Firestore database
export default {db};
