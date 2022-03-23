import React, { Component } from "react";
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
import OnboardingNavBar from "../components/navbar_onboarding";

export default class SignOut extends Component {
  constructor() {
    super();
  }
  render() {
    logout();
    return (
      <div className="h-screen">
        <OnboardingNavBar />
        <div className="mx-8 xl:mx-16 2xl:mx-64 grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-none justify-items-center items-center lg:h-3/4">
          <div className="row-span-1 lg:col-span-1 justify-items-center items-center p-5">
            <h1 className="font-extrabold text-5xl mb-5">Till next time.</h1>
            <p className="text-lg">
              Be sure to log back in soon to stay informed with the latest
              happenings around your area.
            </p>
            <p className="mt-10 text-sm">
              Your account is subject to AGAP's{" "}
              <a href="./terms">Terms and Conditions</a> and{" "}
              <a href="./privacy">Privacy Policy</a>
            </p>
          </div>
          <div className="row-span-1 lg:col-span-1 grow-0 p-5 w-full">
            <div className="p-6 shadow-lg rounded-lg items-center justify-center flex">
              <a href="/login">
                <button className="bg-blue-400 p-3 rounded-lg shadow font-bold text-white">
                  Go back to log in page
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
