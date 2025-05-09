import type { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React from 'react'
import { db } from '../firebase';

const GetUser = async(user:User) => {
    const uid = user?.uid;
        const docRef = doc(db, "students", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return docSnap.data();
        } else {
            console.log("No such document!");
        }
        return null;
}

export default GetUser
