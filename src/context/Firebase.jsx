import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyCf0KJV7mE5ae1lylTe6JZ11PHlrSHzJ1s",
  authDomain: "soil-store-a4ab2.firebaseapp.com",
  projectId: "soil-store-a4ab2",
  storageBucket: "soil-store-a4ab2.appspot.com",
  messagingSenderId: "524704420009",
  appId: "1:524704420009:web:2dd5959249b86603e559b8",
  measurementId: "G-REB2QPNR9D",
};

export const useFirebase = () => useContext(FirebaseContext);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signinUserWithEmailAndPass = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  const signOut = () => {
    return firebaseAuth.signOut();
  };

  const handleCreateNewListing = async (
    name,
    description,
    distributor,
    contact,
    price,
    cover
  ) => {
    const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
    const uploadResult = await uploadBytes(imageRef, cover);
    return await addDoc(collection(firestore, "products"), {
      name,
      description,
      distributor,
      contact,
      price,
      imageURL: uploadResult.ref.fullPath,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  const listAllProducts = () => {
    return getDocs(collection(firestore, "products"));
  };

  const getProductById = async (id) => {
    const docRef = doc(firestore, "products", id);
    const result = await getDoc(docRef);
    return result;
  };

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signinWithGoogle,
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPass,
        handleCreateNewListing,
        listAllProducts,
        getImageURL,
        getProductById,
        isLoggedIn,
        signOut,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
