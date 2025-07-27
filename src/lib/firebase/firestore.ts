
import { db } from "../firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export const createUserProfile = async (uid: string, data: any) => {
  await setDoc(doc(db, "users", uid), {
    ...data,
    uid,
    createdAt: serverTimestamp(),
    subscriptionStatus: "free",
  });
};

export const getUserProfile = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};
