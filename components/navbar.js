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
        <div className="w-full hidden lg:block mb-3 shadow py-3">
          <nav className="flex grid grid-cols-10 gap-x-4 mx-8 xl:mx-16 2xl:mx-64 items-center">
            <a href="/" className="flex col-span-2 items-center">
              <Image src="/AGAP.png" width={40} height={40} />
              <span className="self-center text-4xl font-extrabold whitespace-nowrap dark:text-white ml-2">
                AD ASTRA
              </span>
            </a>
            <div className="col-span-5"></div>
            <div className="col-span-3 flow-root">
              <div className="hidden w-full md:block md:w-auto flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium items-center float-right overflow:visible">
                <UserButton data={this.props.data} />
              </div>
            </div>
          </nav>
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
