import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;
let auth: Auth;
let firebaseEnabled = false;

// Check if all required environment variables are present
if (firebaseConfig.apiKey) {
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }
    auth = getAuth(app);
    firebaseEnabled = true;
} else {
    console.warn("Firebase API key is missing. Firebase services will be disabled.");
    // Provide no-op or placeholder objects if Firebase is not configured
    app = {} as FirebaseApp;
    auth = {} as Auth;
}

export function isFirebaseEnabled() {
    return firebaseEnabled;
}

export { app, auth };
