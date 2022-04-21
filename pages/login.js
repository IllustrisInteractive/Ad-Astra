import React, { Component } from "react";
import OnboardingNavBar from "../components/navbar_onboarding";
import { useForm } from "react-hook-form";
import axios from "axios";
import bcrypt from "bcryptjs";
import Router from "next/router";

import cookie from "js-cookie";

import { useRef, useState } from "react";

import { TailSpin } from "react-loader-spinner";

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

  const initialValues = { email: "", password: ""};
  const [ formValues, setFormValues ] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  /* ERROR CODES
  0 - Initial state, no error.
  1 - Incorrect password.
  2 - User does not exist.
  3 - Unknown error.
  
  */

  const { register, handleSubmit } = useForm();
  const upload = (data) => {

    setLoading(true);
    setFormErrors(checkData(formValues));
    setIsSubmit(true);

    handleLogin(data);
  };

  async function handleLogin(data) {
    setLoading(true);

    // console.log('hello')
    // console.log(formValues.password)
    
    try {
      await login(formValues.email, formValues.password);
      setLoading(false);
      Router.push("/");
    } catch (e) {

      if (e.code === "auth/wrong-password") setError(1);
      else if (e.code === "auth/user-not-found") setError(2);
      else setError(3);
    }
  }

  const checkData = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password < 8) {
      errors.password = "Password must be more than 8 characters.";
    } else if (values.password > 32) {
      errors.password = "Password cannot exceed more than 32 characters";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format.";
    }

    return errors;

  };


  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

  };

  useEffect(() => {
    console.log(formErrors);
    if(Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors])

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
                    : "Please fill up all the fields."}
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
                      name="email"
                      value= { formValues.email }
                      onChange = { handleChange }
                      // {...register("email", { required: true })}
                    ></input>
                    <p className="text-red-600" >{ formErrors.email }</p>
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
                    value= { formValues.password }
                    name="password"
                    onChange = { handleChange }
                    // {...register("password", { required: true })}
                  ></input>
                  <p className="text-red-600" >{ formErrors.password }</p>
                </div>
              </div>
              <div>
                <button
                  className="shadow bg-[#8A2387] hover:bg-[#9D50BB] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
                  type="submit" onClick={ checkData }
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
