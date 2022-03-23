import Head from "next/head";
import Reputation from "../components/reputation";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import NewPostModal from "../components/newPostModal";
import Weather from "../components/weather";
import { Redirect } from "react-router-dom";

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
import MobileNavBar from "../components/mobile_navbar";

// Checks if there's a cookie in the browser, if there's none redirect to login page
function checkSID() {
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

// For testing
function addSID() {
  cookie.set("SID", "ABCD", { expires: 1 / 24 });
}

// For testing
function removeSID() {
  cookie.remove("SID");
}

export default function About() {
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
          setLoading(false);
        });
      }
      // ...
    } else {
     
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
          <title>About | AGAP</title>
        </Head>
        <Navbar data={userData} />
        

    {/* Section 1 */}

    <div class="container items-center max-w-6xl mx-auto xl:px-5 px-2 py-32 md:px-0">
    <div class="flex flex-wrap items-center sm:-mx-3">
      <div class="w-full md:w-1/2 md:px-3">
        <div class="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
          <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
            <span class="block xl:inline text-[#308C8F]">AGAP keeps you up with what's going on in the Metro,</span>
            <span class="block text-[#10B4DA] xl:inline">right here and right now.</span>
          </h1>
          <div class="relative flex flex-col sm:flex-row sm:space-x-4">
            <a href="/" class="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-[#308C8F] rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto">
              Go To AGAP Home
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2">
        <div class="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
            <img src="https://firebasestorage.googleapis.com/v0/b/agap-3fe00.appspot.com/o/About%20Us%2F5.jpg?alt=media&token=6c169f27-9bcc-4c88-914a-787249cc4f45"></img>
          </div>
      </div>
    </div>
  </div>


    {/* Section 2 */}

    <div  class="w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24">


    <div class="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">

        <div class="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10">
            <img src="https://firebasestorage.googleapis.com/v0/b/agap-3fe00.appspot.com/o/About%20Us%2FSecurity.png?alt=media&token=be7523ae-ffa7-4b8d-874d-d1a613f30c5a" class="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20 "></img>
        </div>

        <div class="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
            <h2 class="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                About
            </h2>
            <p class="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-3xl">
                Making metro more mindful.
            </p>

        </div>
    </div>
    <div class="box-border flex flex-col items-center content-center px-8 mx-auto mt-2 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-16">

        <div class="box-border w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-32">
            <p class="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-10 lg:text-lg">
            Through AGAP, we look forward to giving real-time and reliable information, particularly addressing relevant incidents such as crime, accidents, missing persons, or disasters inside the National Capital Region (NCR).
            </p>

        </div>

        <div class="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2">
            <img src="https://firebasestorage.googleapis.com/v0/b/agap-3fe00.appspot.com/o/About%20Us%2Ftechnology.png?alt=media&token=0c721202-a9c4-4875-b555-73a4a13a388b" class="pl-4 sm:pr-10 xl:pl-10 lg:pr-32"></img>
        </div>
    </div>

    </div>


    {/* Section 3 */}

    <div class="w-full py-12 bg-white lg:py-24">

    <div class="max-w-6xl px-12 mx-auto text-center">
        <div class="space-y-12 md:text-center">
            <div class="max-w-3xl mb-20 space-y-5 sm:mx-auto sm:space-y-4">
                <h2 class="relative text-4xl font-extrabold tracking-tight sm:text-5xl">Our Awesome Team</h2>
                <p class="text-xl text-gray-500">We take pride in the people we work with. This is because we all collectively help each other become more awesome every day.</p>
            </div>
        </div>

        <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div class="w-full border border-gray-200 rounded-lg shadow-sm">

                <div class="flex flex-col items-center justify-center p-10">
                    <img class="w-32 h-32 mb-6 rounded-full" src="https://firebasestorage.googleapis.com/v0/b/agap-3fe00.appspot.com/o/About%20Us%2Fmember_antonio.png?alt=media&token=f7f7e43f-3c32-4774-ab64-159f33f9a969"></img>
                    <h2 class="text-lg font-medium">ANTONIO, Karmin Ida Mae C.</h2>
                    <p class="font-medium text-blue-500">Frontend Developer</p>
                    </div>

                <div class="flex border-t border-gray-200 divide-x divide-gray-200">
                    <a href="https://www.twitter.com" target="_blank" class="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                    </a>
                    <a href="https://www.github.com" target="_blank" class="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" class="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                    </a>
                </div>
            </div>

            <div class="w-full border border-gray-200 rounded-lg shadow-sm">

                <div class="flex flex-col items-center justify-center p-10">
                    <img class="w-32 h-32 mb-6 rounded-full" src="https://firebasestorage.googleapis.com/v0/b/agap-3fe00.appspot.com/o/About%20Us%2Fmember_jm.png?alt=media&token=eb680c16-ce08-4b59-97d1-354068ae380a"></img>
                    <h2 class="text-lg font-medium">DELA VEGA, John Emmanuel J.</h2>
                    <p class="font-medium text-blue-500">Frontend Software Engineer</p>    
                  </div>

                <div class="flex border-t border-gray-200 divide-x divide-gray-200">
                    <a href="https://www.twitter.com" target="_blank" class="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                    </a>
                    <a href="https://www.github.com" target="_blank" class="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" class="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                    </a>
                </div>
            </div>

            <div class="w-full border border-gray-200 rounded-lg shadow-sm">

                <div class="flex flex-col items-center justify-center p-10">
                    <img class="w-32 h-32 mb-6 rounded-full" src="https://firebasestorage.googleapis.com/v0/b/agap-3fe00.appspot.com/o/About%20Us%2Fmember_jc.png?alt=media&token=7b9f51c4-8b6c-4417-8048-44f7117ca3f8"></img>
                    <h2 class="text-lg font-medium">DIAMANTE, John Christian S.</h2>
                    <p class="font-medium text-blue-500">Backend Software Engineer</p>
                  </div>

                <div class="flex border-t border-gray-200 divide-x divide-gray-200">
                    <a href="https://www.twitter.com" target="_blank" class="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                    </a>
                    <a href="https://www.github.com" target="_blank" class="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" class="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                    </a>
                </div>
            </div>

            <div class="w-full border border-gray-200 rounded-lg shadow-sm">

                <div class="flex flex-col items-center justify-center p-10">
                    <img class="w-32 h-32 mb-6 rounded-full" src="https://firebasestorage.googleapis.com/v0/b/agap-3fe00.appspot.com/o/About%20Us%2Fmember_espejo.png?alt=media&token=52bcf390-6a7a-4e2f-b025-e51b00602ea6"></img>
                    <h2 class="text-lg font-medium">ESPEJO, Tia Julienne</h2>
                    <p class="font-medium text-blue-500">Backend Developer (Database)</p>
                    </div>

                <div class="flex border-t border-gray-200 divide-x divide-gray-200">
                    <a href="https://www.twitter.com" target="_blank" class="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                    </a>
                    <a href="https://www.github.com" target="_blank" class="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" class="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                    </a>
                </div>
            </div>

            <div class="w-full border border-gray-200 rounded-lg shadow-sm">

                <div class="flex flex-col items-center justify-center p-10">
                    <img class="w-32 h-32 mb-6 rounded-full" src="https://firebasestorage.googleapis.com/v0/b/agap-3fe00.appspot.com/o/About%20Us%2Fmember_miguel.png?alt=media&token=33eb870f-6166-44e5-8f51-c7f15dfbc63c"></img>
                    <h2 class="text-lg font-medium">MIGUEL, Maria Isabella Angela G.</h2>
                    <p class="font-medium text-blue-500">Frontend Developer</p>
                  </div>

                <div class="flex border-t border-gray-200 divide-x divide-gray-200">
                    <a href="https://www.twitter.com" target="_blank" class="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                    </a>
                    <a href="https://www.github.com" target="_blank" class="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" class="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                    </a>
                </div>
            </div>

            <div class="w-full border border-gray-200 rounded-lg shadow-sm">

                <div class="flex flex-col items-center justify-center p-10">
                    <img class="w-32 h-32 mb-6 rounded-full" src="https://firebasestorage.googleapis.com/v0/b/agap-3fe00.appspot.com/o/About%20Us%2Fmember_zaguirre.png?alt=media&token=59c592c4-6681-4448-a3c9-afcc1cb6b15c"></img>
                    <h2 class="text-lg font-medium">ZAGUIRRE, Stephanie A.</h2>
                    <p class="font-medium text-blue-500">Backend Developer (Networking)</p>
                  </div>

                <div class="flex border-t border-gray-200 divide-x divide-gray-200">
                    <a href="https://www.twitter.com" target="_blank" class="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                    </a>
                    <a href="https://www.github.com" target="_blank" class="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" class="flex-1 block p-5 text-center text-gray-300 transition duration-200 ease-out hover:bg-gray-100 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                    </a>
                </div>
            </div>

        </div>

    </div>

    </div>

      </div>
    );
  }
}
