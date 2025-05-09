import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./config";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

