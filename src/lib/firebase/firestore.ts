
'use client';

import { doc, setDoc, getDoc, serverTimestamp, type DocumentData } from "firebase/firestore";
import { db, isFirebaseEnabled } from '../firebase';

export interface UserProfile extends DocumentData {
    uid: string;
    email: string;
    venture: string;
    createdAt: any;
    subscriptionStatus?: string;
}

export async function createUserProfile(uid: string, data: Omit<UserProfile, 'uid' | 'createdAt' | 'subscriptionStatus'>) {
    if (!isFirebaseEnabled()) {
        console.warn("Firebase is not configured. Cannot create user profile.");
        return;
    }
    try {
        await setDoc(doc(db, "users", uid), {
            uid,
            ...data,
            createdAt: serverTimestamp(),
            subscriptionStatus: "free",
        });
    } catch (error) {
        console.error("Error creating user profile: ", error);
    }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    if (!isFirebaseEnabled()) {
        console.warn("Firebase is not configured. Cannot get user profile.");
        return null;
    }
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as UserProfile;
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting user profile: ", error);
        return null;
    }
}
