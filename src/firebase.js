import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  query,
  child,
  onValue,
  orderBy,
  limit,
  updateDoc,
  get,
  where,
  getDocs,
  getDoc,
  collectionGroup,
} from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCOnwlqucsLf5Tpnk8p3GfY6r1TiJDarHA",
  authDomain: "autogram-84dc1.firebaseapp.com",
  projectId: "autogram-84dc1",
  storageBucket: "autogram-84dc1.appspot.com",
  messagingSenderId: "909810213966",
  appId: "1:909810213966:web:0cfcaf55f5e07b1e8c0f1f",
  measurementId: "G-9LWR04K99D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {
  getAuth,
  get,
  getDoc,
  updateDoc,
  createUserWithEmailAndPassword,
  onValue,
  signInWithEmailAndPassword,
  child,
  onAuthStateChanged,
  signOut,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  db,
  doc,
  setDoc,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  where,
  getDocs,
  collectionGroup,
};
