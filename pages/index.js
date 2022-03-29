import Head from "next/head";

import Navbar from "../components/navbar";

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
      <div className="h-screen w-screen relative">
        <Head>
          <title>AGAP - The Social Safety Network</title>
        </Head>
        <Navbar data={userData} />
        {/* <div className="flex grid grid-cols-10 justify-center mx-2 xl:mx-16 2xl:mx-64 gap-x-4">
          <div className="col-span-2 hidden lg:block">
            <Sidebar user={userData} />
          </div>
          <div className=" col-span-10 lg:col-span-5 overflow-auto no-scrollbar">
            <NewPostModal user={userData} />
            <PostFactory
              user={userData}
              className="flex bg-white flex-col mb-3 rounded shadow mt-3"
            />
          </div>
          <div className="col-span-3 hidden lg:block">
            <Reputation user={userData} />
          </div>
        </div> */}
        <MobileNavBar active={1} />
      </div>
    );
  }
}
