import React, { Component } from "react";
import OnboardingNavBar from "../components/navbar_onboarding";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import bcrypt from "bcryptjs";
import DatePicker from "react-datepicker";
import Select from "react-select";

import { useRef, useState, useEffect } from "react";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { signup } from "../modules/firebase";
import Head from "next/head";

export default function Signup() {
  // Firebase
  const [loading, setLoading] = useState(false);

  const { control, register, handleSubmit } = useForm();
  const city = 1;
  const [city_id, setCity_id] = useState(0);

  const [email, setEmail] = useState(" ");

  const handleInput = (event) => {
    setEmail(event.target.value);
  };

  async function handleSignup(data) {
    setLoading(true);
    // try {
    await signup(data);
    // } catch {
    // alert("Error!");
    // }
    setLoading(false);

    console.log("Signup Successful");
  }

  const setCity = (value) => {
    city = value;
    setCity_id(value);
  };
  const upload = (data) => {
    console.log(data);
    handleSignup(data);
  };

  return (
    <div className="h-screen bg-gradient-to-r from-log_l via_log_m to-log_r">
      <Head>
        <title>Sign Up | Ad Astra</title>
      </Head>
      <OnboardingNavBar />
      <div className="mx-8 xl:mx-16 2xl:mx-64 grid grid-rows-2 lg:grid-cols-1 lg:grid-rows-none justify-items-center items-center lg:h-3/4">
        <div className="row-span-1 lg:col-span-1 grow-0 p-5">
          <div className="font-bold text-4xl text-white text-center">
            It's great to have you!
          </div>
          <div className="text-sm font-light text-white text-center">
            Fill up the sign up form to create an account now.
          </div>
          <div style={{ height: "60px" }} />
          <div className="p-6 shadow-lg rounded-lg bg-white">
            <form
              className="space-y-4"
              onSubmit={handleSubmit((data) => upload(data))}
            >
              <div className="grid grid-cols-2 space-x-4">
                <div className="col-span-1 space-y-2">
                  <label>First Name</label>
                  <input
                    className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fname"
                    type="first_name"
                    placeholder="John"
                    {...register("fname", { required: true })}
                  ></input>
                </div>
                <div className="col-span-1 space-y-2">
                  <label>Last Name</label>
                  <input
                    className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lname"
                    type="last_name"
                    placeholder="Doe"
                    {...register("lname", { required: true })}
                  ></input>
                </div>
              </div>{" "}
              {/* name div */}
              <div>
                <div>
                  <div className="space-y-2">
                    <label>Email</label>
                    <input
                      className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="johndoe@adastra.ph"
                      {...register("email", { required: true })}
                    ></input>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-2">
                  <label>Password</label>
                  <input
                    className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  ></input>
                </div>
              </div>
              <div className="space-y-2">
                <label>
                  Date of Birth
                  <br />
                </label>
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <DatePicker
                      className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholderText="Select date"
                      id="date"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                    />
                  )}
                />
              </div>
              <div>
                <div className="space-y-2"></div>
              </div>
              <div>
                <button
                  class="shadow bg-[#8A2387] hover:bg-[#9D50BB] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
                  type="submit"
                >
                  Sign up
                </button>
              </div>
              <div>
                <p className="text-sm text-gray-500 text-center">
                  Already have an account?{" "}
                  <a href="./login" className="hover:text-black">
                    Login instead.
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
