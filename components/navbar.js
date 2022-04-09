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
            <Image src="/Ad-Astra-Logo.png" width={150} height={75} />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white ml-2">
                ad astra
              </span>
            </a>
          </div>
          <div className="grid grid-cols-4 col-span-1 flex items-center space-x-5 justify-items-end">
            <a className="col-span-1 text-white" href="/">
              Today's Readings
            </a>
            <a className="col-span-1 text-white" href="/compatibility">
              Compatibility
            </a>
            <a className="col-span-1 text-white" href="/journal">
              My Journal
            </a>
            <UserButton data={this.props.data} />
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
      </button>
      {showDialog ? (
        <div className="absolute bg-white p-3 rounded-lg shadow space-y-2 flex flex-col z-50">
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
