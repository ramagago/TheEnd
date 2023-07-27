import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUGVtATaW9nBH2QFXzSkkJZlbr4TgdGqM",
  authDomain: "the-end-df9fb.firebaseapp.com",
  projectId: "the-end-df9fb",
  storageBucket: "the-end-df9fb.appspot.com",
  messagingSenderId: "197121690800",
  appId: "1:197121690800:web:85c5cd8ac8515572dc3f75",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { storage, auth, db };
