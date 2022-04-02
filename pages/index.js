
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Head from "next/head";

import Navbar from "../components/navbar";
import Readings from "../components/td_readings";

import { Redirect } from "react-router-dom";

import cookie from "js-cookie";

import { useEffect } from "react";
import { useRouter } from "next/router";

import { NextApiRequest, NextApiResponses } from "next";


import { useRef, useState } from "react";
import {
  signup,
  login,
  logout,
  useAuth,
  retrieveUserData,
} from "../modules/firebase";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import MobileNavBar from "../components/mobile_navbar";

// Checks if there's a cookie in the browser, if there's none redirect to login page
function checkCookie() {
  const user = getAuth();
  const router = useRouter();

  if (user == undefined) {
    useEffect(() => {
      setTimeout(() => {
        router.push("/login");
      }, 500);
    }, []);
  }
}


export default function Home() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState({
    fName: "John",
    lName: "Doe",
    email: "nil",
    id: "AGAPWEBAPP",
    date: '00/00/0000',
    zodiac: 'Gemini'
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

  // const Map= dynamic(() => import("../components/map"),{
  //   loading: () => "Loading...",
  //   ssr: false
  // });

  const emailRef = useRef();
  const passwordRef = useRef();

  const post = {
    // John Doe
    owner: 0, //will change to owner_id. owner_id == user_id to fetch user data.
    user_type: 0,
    location: "Pelepens",
    content: {
      type: "text",
      caption: "This is a test.",
      date: "Now",
      content_link: "",
    },
  };
  useEffect(() => {}, []);

  async function loadData() {
    return await retrieveUserData(currentUser.uid);
  }

  if (loading) {
    return <>Loading...</>;
  } else {
    return (
      <div className="h-screen w-screen relative bg-[#9D50BB]">
        <Head>
          <title>Ad Astra - The Social Safety Network</title>
        </Head>
        <Navbar data={userData} />

        <Router>
            <Routes>
                <Route path="/" element={<Readings />} />
                {/* <Route path="/Dalgo-Card" element={} />
                <Route path="/NFT-Gallery" element={} />
                <Route path="*" element={} /> */}
            </Routes>
        </Router>

        
        <MobileNavBar active={1} />
      </div>
    );
  }
}
