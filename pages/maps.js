import Head from "next/head";
import Reputation from "../components/reputation";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import NewPostModal from "../components/newPostModal";
import Weather from "../components/weather";
import { Redirect } from "react-router-dom";

typeof window === "undefined";
import cookie from "js-cookie";

import { useEffect } from "react";
import { useRouter } from "next/router";

import { NextApiRequest, NextApiResponses } from "next";
import Post from "../components/post";

import { useRef, useState } from "react";
import {
  signup,
  login,
  logout,
  useAuth,
  retrieveUserData,
} from "../modules/firebase";
import PostFactory from "../components/PostFactory";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import MapSVG from "../components/mapSVG";
import MobileNavBar from "../components/mobile_navbar";

export default function Maps() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState({
    fName: "John",
    lName: "Doe",
    email: "nil",
    location: "nil",
    id: "AGAPWEBAPP",
    points: {
      post_points: 0,
      comment_points: 0,
    },
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
          console.log(userData);
          setLoading(false);
        });
      }
      // ...
    } else {
      window.location.replace("/login");
    }
  });

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
      <div className="relative">
        <Head>
          <title>AGAP - Live Map View</title>
        </Head>
        <Navbar data={userData} />
        <div className="flex grid-cols-10 justify-center mx-2 xl:mx-16 2xl:mx-64 gap-x-4">
          <div className="col-span-2 hidden lg:block">
            <Sidebar user={userData} />
          </div>
          <div className="col-span-10 lg:col-span-5 overflow-auto no-scrollbar">
            <MapSVG user={userData} />
          </div>
        </div>
        <MobileNavBar active={2} />
      </div>
    );
  }
}
