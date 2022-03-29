import Head from "next/head";


import { Redirect } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
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
  changeSettings,
} from "../modules/firebase";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import Image from "next/image";

const Settings = (props) => {
  const ref = useRef();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [city_id, setCity] = useState(0);
  const [changes, setChanges] = useState({
    fName: "",
    lName: "",
    picture: null,
    location: "",
  });
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
  const { control, register, handleSubmit } = useForm();
  const options = [
    { value: "1", label: "Caloocan", id: "caloocan" },
    { value: "2", label: "Malabon", id: "malabon" },
    { value: "3", label: "Navotas", id: "navotas" },
    { value: "4", label: "Valenzuela", id: "valenzuela" },
    { value: "5", label: "Quezon City", id: "qc" },
    { value: "6", label: "Marikina", id: "marikina" },
    { value: "7", label: "Pasig", id: "pasig" },
    { value: "8", label: "Taguig", id: "taguig" },
    { value: "9", label: "Makati", id: "makati" },
    { value: "10", label: "Manila", id: "manila" },
    { value: "11", label: "Mandaluyong", id: "mandaluyong" },
    { value: "12", label: "San Juan", id: "sanjuan" },
    { value: "13", label: "Pasay", id: "pasay" },
    { value: "14", label: "Paranaque", id: "paranaque" },
    { value: "15", label: "Las Pinas", id: "laspinas" },
    { value: "16", label: "Muntinlupa", id: "muntinlupa" },
  ];
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      setCurrentUser(user);
      if (currentUser && loading) {
        loadData().then((data) => {
          setUserData(data);
          console.log(data);
          setLoading(false);
        });
      }
      // ...
    } else {
      window.location.replace("/login");
    }
  });

  async function loadData() {
    return await retrieveUserData(currentUser.uid);
  }

  const changeFName = (e) => {
    let newChanges = { ...changes };
    newChanges.fName = e.target.value;
    setChanges(newChanges);
  };
  const changeLName = (e) => {
    let newChanges = { ...changes };
    newChanges.lName = e.target.value;
    setChanges(newChanges);
  };

  const changeLocation = (e) => {
    let newChanges = { ...changes };
    newChanges.location = options[e.value - 1].id;
    setChanges(newChanges);
    setCity(e.value);
  };

  function submitChanges() {
    changeSettings(
      userData,
      changes,
      changes.location != "" ? options[city_id - 1].label : ""
    );
    setChanges({
      fName: "",
      lName: "",
      picture: null,
      location: "",
    });
    document.getElementById("fNameChange").value = "";
    document.getElementById("lNameChange").value = "";
  }

  if (loading) {
    return <>Loading...</>;
  } else {
    return (
      <>
        <Head>
          <title>User Settings | AGAP</title>
        </Head>
        {hasChanges(changes) ? (
          <button
            className="fixed right-0 bottom-0 p-3 mr-5 mb-5 bg-blue-500 rounded-full shadow-xl hover:scale-150 scale-125 lg:scale-100 lg:hover:scale-125 active:bg-blue-700 active:shadow-inner z-50"
            onClick={submitChanges}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 13L9 17L19 7"
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        ) : (
          <></>
        )}
        <div className="w-full hidden lg:block mb-3 shadow py-3 bg-white">
          <nav className="flex grid grid-cols-10 gap-x-4 mx-8 xl:mx-16 2xl:mx-64 items-center">
            <a href="../" className="flex col-span-2 items-center">
              <Image src="/AGAP.png" width={40} height={40} />
              <span className="self-center text-4xl font-extrabold whitespace-nowrap dark:text-white ml-2">
                AD ASTRA
              </span>
            </a>
            <div className="col-span-5"></div>
            <div className="col-span-3 flow-root">
              <div className="hidden w-full md:block md:w-auto flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium items-center float-right">
                <a
                  href="../"
                  className="px-5 py-2 rounded-lg shadow bg-blue-400 text-white font-bold hover:shadow-inner hover:bg-white hover:text-black"
                >
                  Return to Feed
                </a>
              </div>
            </div>
          </nav>
        </div>
        <div className="w-full lg:hidden mb-3 shadow py-3 bg-blue-600">
          <nav className="gap-x-4 mx-8 xl:mx-16 2xl:mx-64 items-center">
            <a
              href="../"
              className="flex flex-row space-x-3 items-center font-bold text-white"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 13L6 10M6 10L9 7M6 10L14 10M1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p>Return to Feed</p>
            </a>
          </nav>
        </div>
        <div className="flex flex-col w-full my-10 justify-center items-center space-y-5">
          <div
            style={{ height: "200px", width: "200px" }}
            className="relative group"
          >
            <button
              className="absolute top-0 left-0 hidden group-hover:block h-full w-full bg-white z-50 rounded-full shadow-inner bg-gray-600 bg-opacity-75"
              onClick={() => ref.current.click()}
            >
              <input
                ref={ref}
                onChange={(e) => {
                  let newChanges = { ...changes };
                  newChanges.picture = e.target.files[0];
                  console.log(newChanges);
                  setChanges(newChanges);
                }}
                multiple={false}
                type="file"
                hidden
                accept="image/jpeg,image/png,image/gif/mp4"
              />
              <div className="h-full flex flex-col justify-center rounded-full">
                <div className="flex justify-center">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 16L8.58579 11.4142C9.36683 10.6332 10.6332 10.6332 11.4142 11.4142L16 16M14 14L15.5858 12.4142C16.3668 11.6332 17.6332 11.6332 18.4142 12.4142L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-center px-8 text-white">
                  Click to change your profile picture
                </p>
              </div>
            </button>

            {changes.picture == null ? (
              userData.pictureURL != undefined ? (
                <Image
                  width={200}
                  height={200}
                  src={userData.pictureURL}
                  className="rounded-full shadow-lg bg-gray-200 z-0"
                />
              ) : (
                <Image
                  width={200}
                  height={200}
                  src="/Profile.svg"
                  className="rounded-full shadow-lg bg-gray-200 z-0"
                />
              )
            ) : (
              <img
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                }}
                src={URL.createObjectURL(changes.picture)}
                className="rounded-full shadow-lg bg-gray-200 z-0"
              />
            )}
          </div>
          <div className="flex flex-col justify-start items-center space-y-1.5">
            <h1 className="font-bold text-xl lg:text-3xl">{`${userData.fName} ${userData.lName}`}</h1>
            <h3 className="text-lg lg:text-xl font-number">{userData.email}</h3>
          </div>
        </div>
        <div className="grid grid-cols-7 justify-center mx-2 xl:mx-16 2xl:mx-64 gap-x-4">
          <div className="col-span-2 hidden lg:block">
            <div className="p-5 rounded-lg shadow-lg bg-white">
              <h3 className="text-gray-400 font-light">General</h3>
              <a className="font-bold text-xl">Profile Information</a>
            </div>
          </div>
          <div className="col-span-10 lg:col-span-5 flex flex-col space-y-5 p-3">
            {userData.governmentID == undefined ? (
              <div className="p-5 rounded-lg shadow-md bg-yellow-500 text-white font-bold">
                <p>
                  You need to include a picture of a valid government ID to
                  fully verify your account.
                </p>
              </div>
            ) : (
              <></>
            )}

            <div className="p-5 rounded-lg shadow-md font-number text-semibold bg-white">
              <p className="font-number font-semibold">
                Profile Picture and Government ID
              </p>
              <p className="text-gray-400 text-sm">
                You change your profile picture by tapping your current profile
                picture above. The recommended resolution is{" "}
                <b>200x200 pixels</b> with a square aspect ratio. Uploading of
                Government IDs will be supported in the future.
              </p>
            </div>
            <div className="p-5 rounded-lg shadow-md space-y-3 flex flex-col bg-white">
              <p className="font-number font-semibold">Public Information</p>
              <div className="p-3 rounded-lg text-sm text-white bg-yellow-400">
                A single AGAP account should only be used by a single person.
                You should only change your name if you made a mistake upon
                registration. <b>Falsified names are a bannable offense.</b>
              </div>
              <label className="text-gray-400 text-sm">Name</label>
              <div className="grid grid-cols-2 w-full space-x-2">
                <input
                  id="fNameChange"
                  placeholder={userData.fName}
                  className="col-span-1 p-2 rounded shadow-inner"
                  onChange={changeFName}
                />
                <input
                  id="lNameChange"
                  placeholder={userData.lName}
                  className="col-span-1 p-2 rounded shadow-inner"
                  onChange={changeLName}
                />
              </div>
            </div>
            <div className="p-5 rounded-lg shadow-md font-number text-semibold space-y-1 bg-white">
              <p className="font-number font-semibold">Location</p>
              <div>
                <label className="text-xs text-gray-400">
                  The location you set here determines the posts you see on your
                  feed. Leaving this empty will keep your set location
                  unchanged.
                </label>
                <Controller
                  control={control}
                  defaultValue={0}
                  name="city_id"
                  render={({ onChange, value, name, ref }) => (
                    <Select
                      inputRef={ref}
                      classNamePrefix="addl-class"
                      options={options}
                      value={options.find((c) => c.value === value)}
                      onChange={changeLocation}
                    />
                  )}
                />
              </div>
            </div>
            <div className="p-5 rounded-lg shadow-md font-number text-semibold space-y-1 bg-white">
              <p className="font-number font-semibold">Account Termination</p>
              <div>
                <p className="text-xs text-gray-400">
                  If you wish to delete your account, you can do so here. Please
                  note that deleting your account will <b>not</b> delete any
                  comments or posts made in the past. If you wish to delete all
                  of your data, please contact support.
                </p>
                <div className="flex flex-row space-x-3">
                  <button className="bg-red-500 py-2 px-3 font-bold text-white text-sm rounded-lg mt-2 active:shadow-inner active:bg-red-700">
                    Delete my account
                  </button>
                  <a
                    className="bg-yellow-500 py-2 px-3 font-bold text-white text-sm rounded-lg mt-2 active:shadow-inner active:bg-yellow-700"
                    href="/signout"
                  >
                    Sign Out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

function hasChanges(changes) {
  let counter = 0;
  if (changes.fName.trim() != "") counter++;
  if (changes.lName.trim() != "") counter++;
  if (changes.location != "") counter++;
  if (changes.picture != null) counter++;
  return counter > 0 ? true : false;
}
export default Settings;
