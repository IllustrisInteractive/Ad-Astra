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
  const [error, setError] = useState(0);

  /* ERROR CODES
  0 - Initial state, no error.
  1 - Incorrect password.
  2 - User does not exist.
  3 - Unknown error.
  
  */

  const { register, handleSubmit } = useForm();
  const upload = (data) => {
    handleLogin(data);
  };

  function checkCookie() {
    const router = useRouter();

    console.log(cookie.get("firstTime"));

    if (cookie.get("firstTime") === undefined) {
      addFirstTimeCookie();

      useEffect(() => {
        setTimeout(() => {
          router.push("/onboarding");
        }, 500);
      }, []);
    }
  }

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
      setLoading(false);
      console.log("Login Successful!");
      addCookie(data["email"]);

      window.location.replace("/");
    } catch (e) {
      if (e.code === "auth/wrong-password") setError(1);
      else if (e.code === "auth/user-not-found") setError(2);
      else setError(3);
    }
  }

  return (
    <>
      <div className="h-screen bg-gradient-to-r from-log_l via_log_m to-log_r">
        <Head>
          <title>Log In | Ad Astra</title>
        </Head>
        <OnboardingNavBar />
        <div className="h-4/6 flex flex-col items-center justify-center">
          <div className="font-bold text-4xl text-white">Welcome back!</div>
          <div className="text-sm font-light text-white">
            Log into your account to continue.
          </div>
          <div style={{ height: "60px" }} />
          <div className="p-6 shadow-lg rounded-lg bg-white">
            {error > 0 ? (
              <div className="bg-red-600 p-3 text-white rounded text-center font-bold mb-3 text-sm">
                <p>
                  {error == 1
                    ? "Wrong password entered."
                    : error == 2
                    ? "No account exists for this email."
                    : "Unknown error occured."}
                </p>
              </div>
            ) : (
              <></>
            )}
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
                  class="shadow bg-[#8A2387] hover:bg-[#9D50BB] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
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
    </>
  );
}
