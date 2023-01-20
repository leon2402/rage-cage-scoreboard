import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
};


// init firebase
initializeApp(firebaseConfig)

// init firestore service
const db = getFirestore()
export default db