import React, { Component, useState } from "react";
import defaultUser from "../assets/Profile.svg";
import Image from "next/image";

export default class Navbar extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <>
        <div className="grid grid-cols-2 py-5 mx-16 lg:mx-24 2xl:mx-64 items-center">
          <div className="col-span-1">
            <a href="/" className="flex col-span-1 items-center">
              <Image src="/AGAP.png" width={40} height={40} />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white ml-2">
                ad astra
              </span>
            </a>
          </div>
          <div className="grid grid-cols-4 col-span-1 flex items-center space-x-5">
            <a className="col-span-1 text-white" href="/">
              Today's Readings
            </a>
            <a className="col-span-1 text-white" href="/Compatibility">
              Compatibility
            </a>
            <a className="col-span-1 text-white" href="/journal">
              My Journal
            </a>
          </div>
        </div>
        <div className="relative hidden">Anchor</div>
      </>
    );
  }
}

const UserButton = (props) => {
  const data = props.data;
  const [showDialog, setDialog] = useState(false);
  let username = `${data.fName} ${data.lName}`;
  return (
    <div>
      <button
        className="px-5 py-2 bg-gray-200 rounded-3xl text-md hover:bg-gray-400 flex flex-row items-center"
        onClick={() => setDialog(!showDialog)}
      >
        {props.data.picture == "" ? (
          <img src={defaultUser} />
        ) : (
          <Image
            className="rounded-full"
            src={props.data.pictureURL}
            width={25}
            height={25}
          />
        )}
        <p className="mr-16 ml-3">{username}</p>
        <svg
          width="11"
          height="7"
          viewBox="0 0 11 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <path
            d="M9.875 1.3125L5.5 5.6875L1.125 1.3125"
            stroke="#130F26"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {showDialog ? (
        <div className="absolute bg-white p-3 rounded-lg shadow space-y-2 flex flex-col z-50">
          <button
            className="text-lg font-bold p-2 text-left"
            onClick={() => window.location.replace("/settings")}
          >
            Settings
          </button>
          <button
            className="text-lg font-bold p-2 text-left"
            onClick={() => window.location.replace("/signout")}
          >
            Log out
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
