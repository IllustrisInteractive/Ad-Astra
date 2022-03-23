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
import UploadFile from "../pages/api/UploadFile";
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
  appId: "1:787943428279:web:2f36e357463a6ef52ffd32"
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

async function push_signup(user, data) {
  const db = getFirestore();
  const ref = collection(db, "users");
  await setDoc(doc(ref, user.user.uid), {
    id: user.user.uid,
    fName: data.fname,
    lName: data.lname,
    email: data.email,
    date: data.date,
    picture: "",
  }).then(() => {
    window.location.replace("/");
  });
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


async function uploadProfilePicture(file, uid) {
  const storage = getStorage();
  const storageRef = ref(storage, `${uid.trim()}/${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);
}

export async function changeSettings(user, changes, city) {
  console.log("Change settings data: ", changes);
  let newFName = "";
  let newLName = "";
  let newPicture = null;
  if (changes.fName != "") newFName = changes.fName;
  if (changes.lName != "") newFName = changes.lName;
  if (changes.picture != null) {
    await uploadProfilePicture(changes.picture, user.id).then(() => {
      console.log("Finished uploading");
    });
    newPicture = changes.picture;
  }
  let newUserData = {
    fName: newFName != "" ? newFName : user.fName,
    lName: newLName != "" ? newLName : user.lName,
    email: user.email,
    id: user.id.trim(),
  };
  const db = getFirestore();
  const ref = collection(db, "users");
  await updateDoc(doc(ref, user.id.trim()), newUserData);
}
