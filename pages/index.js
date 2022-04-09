import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Head from "next/head";

import Navbar from "../components/navbar";
import Readings from "../components/td_readings";
import { motion, AnimatePresence } from "framer-motion";

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
import Loading from "../components/loading";

const Home = (props) => {
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

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {loading && (
          <motion.div key={"loading_tab"} exit={{ opacity: 0 }}>
            <Loading duration={2000} />
          </motion.div>
        )}

        {!loading && (
          <motion.div
            key={"loaded"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="h-screen w-screen relative bg-gradient-to-r from-readings_l to-readings_r">
              <Head>
                <title>Ad Astra</title>
              </Head>
              <Navbar data={userData} />

              <Readings userData={userData} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;
