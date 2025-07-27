
'use client';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth, isFirebaseEnabled } from '../firebase';

export async function signUpUser(email, password) {
  if (!isFirebaseEnabled()) {
    console.warn('Firebase is not configured. Sign up is disabled.');
    return { result: null, error: { message: 'Firebase is not configured.'} };
  }

  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function signInUser(email, password) {
  if (!isFirebaseEnabled()) {
    console.warn('Firebase is not configured. Sign in is disabled.');
    return { result: null, error: { message: 'Firebase is not configured.'} };
  }
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function signOut() {
  if (!isFirebaseEnabled()) {
    console.warn('Firebase is not configured. Sign out is disabled.');
    return { result: null, error: null };
  }

  let result = null,
    error = null;
  try {
    result = await firebaseSignOut(auth);
  } catch (e) {
    error = e;
  }
  return { result, error };
}


export function onAuthStateChanged(callback: (user: User | null) => void) {
  if (!isFirebaseEnabled()) {
    // Return a no-op unsubscribe function
    return () => {};
  }
  return firebaseOnAuthStateChanged(auth, callback);
}
