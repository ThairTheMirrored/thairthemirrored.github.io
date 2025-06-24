
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDPFecnqUPHWktCWBDJGW5nJ47XHrNeZto",
  authDomain: "brimos-64ecf.firebaseapp.com",
  projectId: "brimos-64ecf",
  storageBucket: "brimos-64ecf.firebasestorage.app",
  messagingSenderId: "834201536239",
  appId: "1:834201536239:web:8d03d9c0447fc77a87bd1a",
  measurementId: "G-PJ78HSH093"
};

// Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ========================
// Post Logic (Grove)
// ========================
export async function submitProject(data) {
  return await addDoc(collection(db, "projects"), {
    ...data,
    timestamp: serverTimestamp()
  });
}

export async function getProjects() {
  const q = query(collection(db, "projects"), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// ========================
// Forum Logic (optional)
// ========================
export async function addPost(data) {
  return await addDoc(collection(db, "posts"), {
    ...data,
    timestamp: serverTimestamp()
  });
}

export async function getPosts() {
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
