import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "marave-portfolio.firebaseapp.com",
  projectId: "marave-portfolio",
  storageBucket: "marave-portfolio.appspot.com",
  messagingSenderId: "393831752307",
  appId: "1:393831752307:web:b44065bf78256eb0628006",
};

const app = initializeApp(firebaseConfig);
const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);

const timeStamp = Timestamp;

const auth = getAuth(app);

export { auth, projectStorage, projectFirestore, timeStamp };
