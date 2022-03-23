import React, { Component } from "react";
import OnboardingNavBar from "../components/navbar_onboarding";
import { useForm } from "react-hook-form";
import axios from "axios";
import bcrypt from "bcryptjs";

import cookie from "js-cookie";

import { useRef, useState } from "react";

import { login, useAuth } from "../modules/firebase";
import Head from "next/head";

import { useEffect } from "react";
import { useRouter } from "next/router";


function addCookie(val) {
  cookie.set("SID", val, { expires: 1 / 24 });
}

export default function Login() {
  // Firebase Login
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();
  const upload = (data) => {
    handleLogin(data);
  };

  // For testing
  function addFirstTimeCookie() {
    cookie.set("firstTime", "1", { expires: 1 / 24 });
  }
  
  // For testing
  function removeCookie() {
    cookie.remove("firstTime");
  }
  

  async function handleLogin(data) {
    setLoading(true);
    try {
      await login(data["email"], data["password"]);
    } catch {
      alert("Error!");
    }
    setLoading(false);

    console.log("Login Successful!");

    addCookie(data["email"]);

    window.location.replace("/");
  }


  return (
    <>
    <div className="h-screen">
      <Head>
        <title>Log In | AGAP</title>
      </Head>
      <OnboardingNavBar />
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md items-center lg:h-3/4">
        <div className="row-span-1 lg:col-span-1 grow-0 p-5 w-full">
          <div className="p-6 shadow-lg rounded-lg bg-white">
            <form
              className="space-y-4"
              onSubmit={handleSubmit((data) => upload(data))}
            >
              {/* name div */}
              <div>
                <div>
                  <div className="space-y-2">
                    <label>Email</label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="johndoe@agap.ph"
                      {...register("email", { required: true })}
                    ></input>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-2">
                  <label>Password</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  class="shadow bg-blue-400 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
                  type="submit"
                >
                  Login
                </button>
              </div>
              <div>
                <p className="text-sm text-gray-500 text-center">
                  Need an account?{" "}
                  <a href="/signup" className="hover:text-black">
                    Sign up now.
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
