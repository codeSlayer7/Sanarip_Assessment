/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8AH5nSrTsrq6ZtuJrSvGKyGWIRhR-pJc",
  authDomain: "assessment-test-3c8b8.firebaseapp.com",
  projectId: "assessment-test-3c8b8",
  storageBucket: "assessment-test-3c8b8.appspot.com",
  messagingSenderId: "1035732164759",
  appId: "1:1035732164759:web:702dae4ab2b781d4c0c9d2",
  measurementId: "G-7YMQK5877Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export const createUserDocument = async (user, additionalData) => {
  if (!user) return;
  console.log(user, "firebase compinetn ");
  const collectionUsers = collection(firestore, "users");
  const userRef = doc(firestore, "users", user.uid);
  const dbSnapshot = await getDoc(userRef);

  console.log(dbSnapshot, userRef, "snapshot");
  if (!dbSnapshot.exists()) {
    console.log(dbSnapshot.data(), "snapdata");
    const { email } = user;
    const { name, surname, job } = additionalData;

    try {
      await setDoc(doc(collectionUsers, user.uid), {
        email,
        job,
        name,
        surname,
        
      });
      const userRef = doc(firestore, "users", user.uid);
      const dbSnapshot = await getDoc(userRef);

      if (dbSnapshot.exists()) return dbSnapshot.data();
    } catch (error) {
      console.log("user create err", error);
    }
  }
};

export const getUserDocument = async ({ user }) => {
  if (!user) return;
  console.log(user, "get user");
  const collectionUsers = collection(firestore, "users");
  const userRef = doc(firestore, "users", user.uid);
  const dbSnapshot = await getDoc(userRef);

  if (dbSnapshot.exists()) {
    return dbSnapshot.data();
  } else {
    return "no document";
  }
};



export const updateUserDocument = async ( id, data ) => {
  const docRef = doc(firestore, "users", id);
  
  setDoc(docRef, data)
  .then(docRef => {
      console.log("Entire Document has been updated successfully");
  })
  .catch(error => {
      console.log(error);
  })
 
  const userRef = doc(firestore, "users", id);
  const dbSnapshot = await getDoc(userRef);
  console.log(dbSnapshot.data(), 'updated user');
return dbSnapshot.data()

};
