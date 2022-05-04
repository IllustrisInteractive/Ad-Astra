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

import Moment from "moment";

export default function Signup() {
  // Firebase
  const [loading, setLoading] = useState(false);

  const { control, register, handleSubmit } = useForm();
  const city = 1;
  const [city_id, setCity_id] = useState(0);

  const [email, setEmail] = useState(" ");
  const [errorState, setError] = useState("");

  const initialValues = {
    email: "",
    password: "",
    fname: "",
    lname: "",
    date: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const lastDateOfYear = `12/31/${new Date().getFullYear()}`;

  let fbError = "";

  let initial = false;

  const errors = {};

  const handleInput = (event) => {
    setEmail(event.target.value);
  };

  async function handleSignup(data) {
    setLoading(true);

    if (Object.keys(formErrors).length == 0 && !data.fname == false && !data.fname == false) {
      try {
        await signup(data);
      } catch (e) {
        setErrorToState(e.code);
        // alert(e);
      }
    }

    setLoading(false);
  }

  async function tempSignup(data) {
    setLoading(true);
    try {
      await signup(data);
    } catch (e) {
      setErrorToState(e.code);
      // alert(e);
    }
    setLoading(false);
  }

  const setCity = (value) => {
    city = value;
    setCity_id(value);
  };
  const upload = (data) => {
    setLoading(true);
    setFormErrors(checkData(formValues));
    setIsSubmit(true);

    try {
      if (Object.keys(formErrors).length == 0) {
        handleSignup(formValues);
      }
    } catch (e) {
      setErrorToState(e.code);
    }
  };

  const setErrorToState = (code) => {

    let sample = ''

    if (code == "auth/invalid-email") {
      // setError("Wrong email format.");
      // alert("Wrong email format.");
      errors.email = "Wrong email format.";
    } else if (code == "auth/email-already-in-use") {
      // setError("Email already taken.");
      // alert("Email already taken.");
      errors.email = "Email already taken.";
    } else {
      setError(code);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  function changeDate(date) {
    setFormValues({ ...formValues, date: date });
  }

  const checkData = (values) => {

    // console.log(`CHECKDATA: ${!values.fname}`);

    errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.fname) {
      errors.fname = "First name is required";
    }
    if (!values.lname) {
      errors.lname = "Last name is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters.";
    } else if (values.password.length > 32) {
      errors.password = "Password cannot exceed more than 32 characters";
    } 

    if (!values.date) {
      errors.date = "Date of birth is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } 

    return errors;
  };

  function formatDate(date) {
    let uDate = new Date(date);

    let uMonth = uDate.getMonth() + 1;
    let uDay = uDate.getDate();
    let uYear = uDate.getFullYear();

    if (isNaN(uMonth)) {
      return "";
    } else {
      return `${uMonth}/${uDay}/${uYear}`;
    }
  }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  return (
    <div className="h-max bg-gradient-to-r from-log_l via_log_m to-log_r">
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
          <div className="p-6 shadow-lg mb-56 rounded-lg bg-white">
            {/* {errorState != "" && (
              <div className="bg-red-600 text-white font-bold text-center p-2 rounded mb-3">
                {errorState}
              </div>
            )} */}
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
                    name="fname"
                    value={formValues.fname}
                    onChange={handleChange}
                    // {...register("fname", { required: true })}
                  ></input>
                  <p className="text-red-600">{formErrors.fname}</p>
                </div>
                <div className="col-span-1 space-y-2">
                  <label>Last Name</label>
                  <input
                    className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lname"
                    type="last_name"
                    placeholder="Doe"
                    name="lname"
                    value={formValues.lname}
                    onChange={handleChange}
                    // {...register("lname", { required: true })}
                  ></input>
                  <p className="text-red-600">{formErrors.lname}</p>
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
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      // {...register("email", { required: true })}
                    ></input>
                    <p className="text-red-600">{formErrors.email}</p>
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
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    // {...register("password", { required: true })}
                  ></input>
                  <p className="text-red-600">{formErrors.password}</p>
                </div>
              </div>
              <div className="space-y-2">
                <label>
                  Date of Birth
                  <br />
                </label>
                <Controller
                  control={control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <DatePicker
                      className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholderText="Select date"
                      id="date"
                      name="date"
                      minDate={new Date("02-01-1950")}
                      maxDate={new Date("05-05-2022")}
                      // onChange={(date) => field.onChange(date)}
                      onChange={changeDate}
                      value={formatDate(formValues.date)}
                      selected={field.value}
                    />
                  )}
                />
              </div>
              <p className="text-red-600">{formErrors.date}</p>
              <div>
                <div className="space-y-2"></div>
              </div>
              <div>
                <button
                  class="shadow bg-[#8A2387] hover:bg-[#9D50BB] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
                  type="submit"
                  onClick={checkData}
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
