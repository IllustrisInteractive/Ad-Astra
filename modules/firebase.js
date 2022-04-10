import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  document,
  addDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzC2bYSneIU_7KjZo_5oaX_XSzgInHRpA",
  authDomain: "ad-astra-3b593.firebaseapp.com",
  projectId: "ad-astra-3b593",
  storageBucket: "ad-astra-3b593.appspot.com",
  messagingSenderId: "787943428279",
  appId: "1:787943428279:web:2f36e357463a6ef52ffd32",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function signup(data) {
  const email = data["email"];
  const password = data["password"];

  return createUserWithEmailAndPassword(auth, email, password).then((user) => {
    push_signup(user, data);
  });
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

export async function pushComment(post, comment) {
  const db = getFirestore();
  const ref = doc(
    collection(db, `posts/location/${post.city_id}/${post.id}/comments`)
  );
  await setDoc(ref, {
    uid: comment.uid,
    message: comment.message,
    upvotes: 0,
    downvotes: 0,
  });

  return ref.id;
}

function zodiac(day, month) {
  // returns the zodiac sign according to day and month ( https://coursesweb.net/ )
  var zodiac = [
    "",
    "Capricorn",
    "Aquarius",
    "Pisces",
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
  ];
  var last_day = ["", 19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
  return day > last_day[month] ? zodiac[month * 1 + 1] : zodiac[month];
}

export async function generateShareableFirebase(uid, data) {
  const db = getFirestore();
  const ref = collection(db, "links");
  const docRef = await addDoc(ref, data);
  return docRef.id;
}

export async function getLinkData(link) {
  const db = getFirestore();
  const ref = doc(db, "links/", link);
  const docRef = await getDoc(ref);
  return docRef.data();
}

async function push_signup(user, data) {
  const db = getFirestore();
  const ref = collection(db, "users");

  const bMonth = data.date.getMonth() + 1;
  const bDay = data.date.getDate();

  await setDoc(doc(ref, user.user.uid), {
    id: user.user.uid,
    fName: data.fname,
    lName: data.lname,
    email: data.email,
    date: data.date,
    zodiac: zodiac(bDay, bMonth),
    picture: "",
  }).then(() => {
    window.location.replace("/");
  });
}

export async function packageThenPost(uid, entries) {
  const db = getFirestore();
  const ref = collection(db, `users/${uid}/journal`);

  await setDoc(doc(ref, "entries"), {
    entries: entries,
  });
}

export async function retrieveEntries(uid) {
  const db = getFirestore();
  const ref = doc(db, "users/", `${uid}/journal/entries`);
  const snapshot = await getDoc(ref);
  return snapshot.data();
}

export async function retrieveUserData(uid) {
  const db = getFirestore();
  const docref = doc(db, "users", uid);
  const querySnapshot = await getDoc(docref);
  let userData = querySnapshot.data();
  console.log(userData);
  if (userData.picture != "") {
    const storage = getStorage();
    const storageRef = ref(storage, `${uid}/${userData.picture}`);
    const url = await getDownloadURL(storageRef);
    userData["pictureURL"] = url;
    console.log("User data: ", userData);
    return userData;
  } else return userData;
}
