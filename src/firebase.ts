// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC1HIui5i4-VO5gdwWFubn2VPR9dxPaP54",
  authDomain: "primo4586-website.firebaseapp.com",
  projectId: "primo4586-website",
  storageBucket: "primo4586-website.appspot.com", 
  messagingSenderId: "436334413540",
  appId: "1:436334413540:web:a38de5f1e77b0114e10ef1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

