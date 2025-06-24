
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPFecnqUPHWktCWBDJGW5nJ47XHrNeZto",
  authDomain: "brimos-64ecf.firebaseapp.com",
  projectId: "brimos-64ecf",
  storageBucket: "brimos-64ecf.firebasestorage.app",
  messagingSenderId: "834201536239",
  appId: "1:834201536239:web:8d03d9c0447fc77a87bd1a",
  measurementId: "G-PJ78HSH093"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ========== LOGIN METHODS ==========

export function googleLogin() {
  return signInWithPopup(auth, provider);
}

export function emailLogin(email) {
  const actionCodeSettings = {
    url: window.location.href,
    handleCodeInApp: true
  };
  return sendSignInLinkToEmail(auth, email, actionCodeSettings).then(() => {
    window.localStorage.setItem('emailForSignIn', email);
  });
}

export function completeEmailLogin() {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    const email = window.localStorage.getItem('emailForSignIn');
    return signInWithEmailLink(auth, email, window.location.href);
  }
}

export function logout() {
  return signOut(auth);
}

export function onAuth(callback) {
  onAuthStateChanged(auth, callback);
}
