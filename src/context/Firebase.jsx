import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
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
// const analytics = getAnalytics(app);
const firebaseAuth = getAuth(firebaseApp);
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

  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signinWithGoogle,
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPass,
        isLoggedIn,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
