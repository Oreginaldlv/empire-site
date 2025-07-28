import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWr7RugkmWYyPCFvV59ZR0LOABqTg_03Q",
  authDomain: "empire-hub-hbuhr.firebaseapp.com",
  projectId: "empire-hub-hbuhr",
  storageBucket: "empire-hub-hbuhr.appspot.com",
  messagingSenderId: "969277005587",
  appId: "1:969277005587:web:2a9674d72452e47099c4e6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
