
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from "firebase/firestore";

// It's recommended to use environment variables for your Firebase config.
// Create a .env.local file in the root of your project and add your keys there:
// NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
// ... and so on.
// Then you can use them like this:
// apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,

const firebaseConfig = {
  apiKey: "AIzaSyDWr7RugkmWYyPCFvV59ZR0LOABqTg_03Q",
  authDomain: "empire-hub-hbuhr.firebaseapp.com",
  projectId: "empire-hub-hbuhr",
  storageBucket: "empire-hub-hbuhr.appspot.com",
  messagingSenderId: "969277005587",
  appId: "1:969277005587:web:2a9674d72452e47099c4e6",
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

auth = getAuth(app);
db = getFirestore(app);

export { app, auth, db };
