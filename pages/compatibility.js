import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Head from "next/head";

import Navbar from "../components/navbar";
import Compatibility_Component from "../components/compatibility";

import { Redirect } from "react-router-dom";

import cookie from "js-cookie";

import { useEffect } from "react";
import { useRouter } from "next/router";

import { useRef, useState } from "react";
import {
  signup,
  login,
  logout,
  useAuth,
  retrieveUserData,
} from "../modules/firebase";

import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Compatibility() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState({
    fName: "John",
    lName: "Doe",
    email: "nil",
    id: "AGAPWEBAPP",
    date: "00/00/0000",
    zodiac: "Gemini",
  });

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      setCurrentUser(user);
      if (currentUser && loading) {
        loadData().then((data) => {
          setUserData(data);
          setLoading(false);
        });
      }
      // ...
    } else {
      window.location.replace("/login");

      // insert function
    }
  });

  useEffect(() => {}, []);

  async function loadData() {
    return await retrieveUserData(currentUser.uid);
  }

  if (loading) {
    return <>Loading...</>;
  } else {
    return (
      <div className="h-screen w-screen relative bg-gradient-to-r from-compat_l to-compat_r">
        <Head>
          <title>Ad Astra</title>
        </Head>
        <Navbar data={userData} />
        <Compatibility_Component userData={userData} />
      </div>
    );
  }
}
