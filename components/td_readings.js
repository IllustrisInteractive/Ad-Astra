import React, { Component, useState } from "react";
import Image from "next/image";
import dataJSON from "../pages/data.json";

import MessengerCustomerChat from "react-messenger-customer-chat";
import { generateShareableFirebase } from "../modules/firebase";

const Readings = (props) => {
  const [shareableModal, setShareable] = useState(false);
  const [link, setLink] = useState("");
  let date = new Date();
  let symbol = props.userData.zodiac;
  let matches = [];
  matches = dataJSON.Matches[symbol].split(" ");
  let symbols = {
    aquarius: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FAQUARIUS.png?alt=media&token=510b589a-723e-41a4-bb9f-35aca3db5f55",
      name: "Aquarius",
    },
    aries: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FARIES.png?alt=media&token=2254f529-08ba-4bf6-b1c9-4eac6764dd85",
      name: "Aries",
    },
    cancer: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FCANCER.png?alt=media&token=8bae2f32-c79c-43f0-81c7-bf3961145106",
      name: "Cancer",
    },
    capricorn: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FCAPRICORN.png?alt=media&token=4bcdfca1-2b0e-41d1-88bd-a3ae4813d21c",
      name: "Capricorn",
    },
    gemini: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FGEMINI.png?alt=media&token=62c7c518-2986-49ea-bdce-fb36f93cb3e7",
      name: "Gemini",
    },
    leo: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FLEO.png?alt=media&token=c24b0198-af74-49d9-849e-e71738e2972d",
      name: "Leo",
    },
    libra: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FLIBRA.png?alt=media&token=7d47e1ce-2f01-4278-9077-18dc1d29edba",
      name: "Libra",
    },
    pisces: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FPISCES.png?alt=media&token=4d781c14-6c04-418b-a971-d4aaf8efc96f",
      name: "Pisces",
    },
    sagitarius: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FSAGITARIUS.png?alt=media&token=5dc4e72a-5fee-4fe1-861d-11d29c4d2adb",
      name: "Sagittarius",
    },
    scorpio: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FSCORPIO.png?alt=media&token=f3a16a25-2298-4cf0-ac9e-4798e696a142",
      name: "Scorpio",
    },
    taurus: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FTAURUS.png?alt=media&token=c5448ff1-a885-416f-850f-88d082f7b856",
      name: "Taurus",
    },
    virgo: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FVIRGO.png?alt=media&token=58af87cc-fe0b-4461-a599-3cc0ac534c58",
      name: "Virgo",
    },
  };

  function generateShareableLink() {
    console.log("Generating link for", props.userData);
    const doc = generateShareableFirebase(props.userData.id, {
      zodiac: props.userData.zodiac,
      fName: props.userData.fName,
      lName: props.userData.lName,
      date: getDateInFormat(true),
      summary:
        dataJSON.Reading[symbol][getToday()] != ""
          ? dataJSON.Reading[symbol][getToday()]
          : "No readings found for your zodiac sign today.",
      matches: matches,
    }).then((string) => {
      props.setCurtain(true);
      setShareable(!shareableModal);
      setLink(string);
    });
  }

  function closeModal() {
    props.setCurtain(false);
    setShareable(false);
  }

  const getToday = () => {
    let day = "";
    let year = date.getFullYear();
    switch (date.getDay()) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
    }
    return day;
  };

  const getDateInFormat = (type = false) => {
    let day = "";
    let month = "";
    let dayOfMonth = date.getDate();
    let year = date.getFullYear();
    switch (date.getDay()) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
    }

    switch (date.getMonth()) {
      case 0:
        month = "January";
        break;
      case 1:
        month = "February";
        break;
      case 2:
        month = "March";
        break;
      case 3:
        month = "April";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "June";
        break;
      case 6:
        month = "July";
      case 7:
        month = "August";
      case 8:
        month = "September";
      case 9:
        month = "October";
      case 10:
        month = "November";
      case 11:
        month = "December";
    }

    if (!type)
      return (
        <p className="text-white font-extralight">
          <b className="font-bold">{day}</b> |{" "}
          {`${month} ${dayOfMonth} ${year}`}
        </p>
      );
    else
      return {
        day: day,
        month: month,
        dayOfMonth: dayOfMonth,
        year: year,
      };
  };

  return (
    <div
      className="mx-16 lg:mx-24 2xl:mx-64 grid grid-cols-2 relative"
      style={{ minHeight: "600px" }}
    >
      {shareableModal && (
        <div className="h-full w-full absolute flex items-center justify-center z-20">
          <div
            className="bg-white p-5 rounded-lg relative"
            style={{ minWidth: "700px" }}
          >
            <div className="grid grid-cols-2 items-center mb-5">
              <div className="col-span-1">
                <h2 className="font-bold text-2xl font-number">
                  Here's your shareable link.
                </h2>
                <p>
                  Send this link to your friends to share your Ad Astra daily
                  summary.
                </p>
              </div>

              <div className="col-span-1 flex justify-end">
                <div
                  className="bg-red-600 text-white p-3 rounded-lg"
                  onClick={closeModal}
                >
                  Close
                </div>
              </div>
            </div>
            <div className="bg-gray-300 p-3 rounded-lg">{`https://ad-astra-one.vercel.app/view/${link}`}</div>
          </div>
        </div>
      )}
      <div className="col-span-1 flex flex-col items-center justify-center">
        <img
          src={symbols[symbol.toLowerCase()].link}
          style={{ width: "50vh", height: "auto" }}
        />
        <h2 className="text-white font-light text-3xl">{symbol}</h2>
      </div>
      <div className="col-span-1 flex flex-col h-full justify-center">
        <div className="flex flex-row relative">
          {getDateInFormat()} {/* date */}
          <a
            className="absolute right-0 font-number font-bold text-white"
            onClick={generateShareableLink}
          >
            Get shareable link
          </a>
        </div>

        <p className="mt-3 text-xl text-white font-light">
          {dataJSON.Reading[symbol][getToday()] != ""
            ? dataJSON.Reading[symbol][getToday()]
            : "No readings found for your zodiac sign today."}
        </p>
        <h4 className="mt-4 text-sm font-semibold mb-2 text-white">
          Your matches today
        </h4>
        <div className="grid grid-cols-3 space-x-3">
          <div className="col-span-1 flex flex-row bg-white rounded-lg p-4">
            <div className="flex items-center justify-center mr-3">
              <img src="/love.png" />
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm">Love</h5>
              <h4 className="text-md font-bold">{matches[0]}</h4>
            </div>
          </div>
          <div className="col-span-1 flex flex-row bg-white rounded-lg p-4">
            <div className="flex items-center justify-center mr-3">
              <img src="/friendship.png" />
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm">Friendship</h5>
              <h4 className="text-md font-bold">{matches[1]}</h4>
            </div>
          </div>
          <div className="col-span-1 flex flex-row bg-white rounded-lg p-4">
            <div className="flex items-center justify-center mr-3">
              <img src="/career.png" />
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm">Career</h5>
              <h4 className="text-md font-bold">{matches[2]}</h4>
            </div>
          </div>
        </div>
      </div>
      <MessengerCustomerChat pageId="102233909130277" appId="703682774401709" />
    </div>
  );
};

const UserButton = (props) => {
  const data = props.data;
  const [showDialog, setDialog] = useState(false);
  let username = `${data.fName} ${data.lName}`;

  console.log(`Data: ${data}`);
};

export default Readings;
