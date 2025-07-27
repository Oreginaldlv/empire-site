import { db } from "../firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export const createUserProfile = async (uid, email, venture) => {
  await setDoc(doc(db, "users", uid), {
    uid,
    email,
    venture,
    createdAt: serverTimestamp(),
    subscriptionStatus: "free",
  });
};

export const getUserProfile = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};
