import React, { Component, useState, useEffect } from "react";
import Image from "next/image";
import dataJSON from "../pages/data.json";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import MessengerCustomerChat from 'react-messenger-customer-chat';

import {
  signup,
  login,
  logout,
  useAuth,
  retrieveUserData,
} from "../modules/firebase";

const Compatibility_Component = (props) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState({
    fName: "John",
    lName: "Doe",
    email: "nil",
    id: "AGAPWEBAPP",
    date: "00/00/0000",
    zodiac: "Gemini",
  });

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      setCurrentUser(user);
      if (currentUser && loading) {
        loadData().then((data) => {
          setUserData(data);
          setLoading(false);
        });
      }
      // ...
    } else {
      window.location.replace("/login");

      // insert function
    }
  });

  useEffect(() => {}, []);

  async function loadData() {
    return await retrieveUserData(currentUser.uid);
  }

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

  let symbols_black = {
    aquarius: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FAQUARIUS.png?alt=media&token=fdb3d83f-8913-49be-a8f8-12dcbb2f2005",
      name: "Aquarius",
    },
    aries: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FARIES.png?alt=media&token=151195ec-d409-4476-80e3-7f82aef9e4d4",
      name: "Aries",
    },
    cancer: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FCANCER.png?alt=media&token=d9d206dd-51da-4dfe-b6f7-0c6187fcdbb3",
      name: "Cancer",
    },
    capricorn: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FCAPRICORN.png?alt=media&token=b0ec4529-4832-4c46-b45f-9f98e770366d",
      name: "Capricorn",
    },
    gemini: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FGEMINI.png?alt=media&token=970cdf1c-bb73-4336-8435-3b94cd820479",
      name: "Gemini",
    },
    leo: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FLEO.png?alt=media&token=1ad40fe2-3b4b-4e4e-9bcd-68210bb97b02",
      name: "Leo",
    },
    libra: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FLIBRA.png?alt=media&token=c2d45f58-61d9-4347-b729-c7592ed0fcdb",
      name: "Libra",
    },
    pisces: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FPISCES.png?alt=media&token=d14a22f8-7daf-4f74-a655-0d9ee952a3a8",
      name: "Pisces",
    },
    sagitarius: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FSAGITARIUS.png?alt=media&token=c6b18faa-e614-4a9a-a68d-78dd88a648b3",
      name: "Sagittarius",
    },
    scorpio: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FSCORPIO.png?alt=media&token=907848c5-06ba-47e7-b7b8-00c2d59cdd8d",
      name: "Scorpio",
    },
    taurus: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FTAURUS.png?alt=media&token=ddcaee12-692f-42f3-8ad3-726ee143b371",
      name: "Taurus",
    },
    virgo: {
      link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FVIRGO.png?alt=media&token=b2222a7c-20fa-4f91-8bd6-7d25a898bb24",
      name: "Virgo",
    },
  };

  let z_symbols = [
    {
      sign: "Aquarius",
      most_compatible: [
        {
          Name: "Aries",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FARIES.png?alt=media&token=151195ec-d409-4476-80e3-7f82aef9e4d4",
        },
      ],

      least_compatible: [
        {
          Name: "Taurus",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FTAURUS.png?alt=media&token=ddcaee12-692f-42f3-8ad3-726ee143b371",
        },

        {
          Name: "Scorpio",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FSCORPIO.png?alt=media&token=907848c5-06ba-47e7-b7b8-00c2d59cdd8d",
        },

        {
          Name: "Leo",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FLEO.png?alt=media&token=1ad40fe2-3b4b-4e4e-9bcd-68210bb97b02",
        },
      ],
    },

    {
      sign: "Pisces",
      most_compatible: [
        {
          Name: "Scorpio",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FSCORPIO.png?alt=media&token=907848c5-06ba-47e7-b7b8-00c2d59cdd8d",
        },
      ],
      least_compatible: [
        {
          Name: "Gemini",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FGEMINI.png?alt=media&token=970cdf1c-bb73-4336-8435-3b94cd820479",
        },

        {
          Name: "Sagittarius",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FSAGITARIUS.png?alt=media&token=c6b18faa-e614-4a9a-a68d-78dd88a648b3",
        },

        {
          Name: "Virgo",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FVIRGO.png?alt=media&token=b2222a7c-20fa-4f91-8bd6-7d25a898bb24",
        },
      ],
    },

    {
      sign: "Aries",
      most_compatible: [
        {
          Name: "Aquarius",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FAQUARIUS.png?alt=media&token=fdb3d83f-8913-49be-a8f8-12dcbb2f2005",
        },
      ],

      least_compatible: [
        {
          Name: "Cancer",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FCANCER.png?alt=media&token=d9d206dd-51da-4dfe-b6f7-0c6187fcdbb3",
        },

        {
          Name: "Capricorn",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FCAPRICORN.png?alt=media&token=b0ec4529-4832-4c46-b45f-9f98e770366d",
        },

        {
          Name: "Libra",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FLIBRA.png?alt=media&token=c2d45f58-61d9-4347-b729-c7592ed0fcdb",
        },
      ],
    },

    {
      sign: "Taurus",
      most_compatible: [
        {
          Name: "Capricorn",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FCAPRICORN.png?alt=media&token=b0ec4529-4832-4c46-b45f-9f98e770366d",
        },
      ],
      least_compatible: [
        {
          Name: "Leo",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FLEO.png?alt=media&token=1ad40fe2-3b4b-4e4e-9bcd-68210bb97b02",
        },

        {
          Name: "Aquarius",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FAQUARIUS.png?alt=media&token=fdb3d83f-8913-49be-a8f8-12dcbb2f2005",
        },

        {
          Name: "Scorpio",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FSCORPIO.png?alt=media&token=907848c5-06ba-47e7-b7b8-00c2d59cdd8d",
        },
      ],
    },

    {
      sign: "Gemini",
      most_compatible: [
        {
          Name: "Sagittarius",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FSAGITARIUS.png?alt=media&token=c6b18faa-e614-4a9a-a68d-78dd88a648b3",
        },
      ],

      least_compatible: [
        {
          Name: "Virgo",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FVIRGO.png?alt=media&token=b2222a7c-20fa-4f91-8bd6-7d25a898bb24",
        },

        {
          Name: "Pisces",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FPISCES.png?alt=media&token=d14a22f8-7daf-4f74-a655-0d9ee952a3a8",
        },

        {
          Name: "Sagittarius",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FSAGITARIUS.png?alt=media&token=c6b18faa-e614-4a9a-a68d-78dd88a648b3",
        },
      ],
    },

    {
      sign: "Cancer",
      most_compatible: [
        {
          Name: "Libra",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FLIBRA.png?alt=media&token=c2d45f58-61d9-4347-b729-c7592ed0fcdb",
        },
      ],
      least_compatible: [
        {
          Name: "Aries",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FARIES.png?alt=media&token=151195ec-d409-4476-80e3-7f82aef9e4d4",
        },

        {
          Name: "Libra",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FLIBRA.png?alt=media&token=c2d45f58-61d9-4347-b729-c7592ed0fcdb",
        },

        {
          Name: "Capricorn",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FCAPRICORN.png?alt=media&token=b0ec4529-4832-4c46-b45f-9f98e770366d",
        },
      ],
    },

    {
      sign: "Leo",
      most_compatible: [
        {
          Name: "Virgo",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FVIRGO.png?alt=media&token=b2222a7c-20fa-4f91-8bd6-7d25a898bb24",
        },
      ],

      least_compatible: [
        {
          Name: "Taurus",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FTAURUS.png?alt=media&token=ddcaee12-692f-42f3-8ad3-726ee143b371",
        },

        {
          Name: "Scorpio",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FSCORPIO.png?alt=media&token=907848c5-06ba-47e7-b7b8-00c2d59cdd8d",
        },
      ],
    },

    {
      sign: "Virgo",
      most_compatible: [
        {
          Name: "Leo",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FLEO.png?alt=media&token=1ad40fe2-3b4b-4e4e-9bcd-68210bb97b02",
        },
      ],

      least_compatible: [
        {
          Name: "Gemini",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FGEMINI.png?alt=media&token=970cdf1c-bb73-4336-8435-3b94cd820479",
        },

        {
          Name: "Sagittarius",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FSAGITARIUS.png?alt=media&token=c6b18faa-e614-4a9a-a68d-78dd88a648b3",
        },

        {
          Name: "Pisces",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FPISCES.png?alt=media&token=d14a22f8-7daf-4f74-a655-0d9ee952a3a8",
        },
      ],
    },

    {
      sign: "Libra",
      most_compatible: [
        {
          Name: "Cancer",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FCANCER.png?alt=media&token=d9d206dd-51da-4dfe-b6f7-0c6187fcdbb3",
        },
      ],
      least_compatible: [
        {
          Name: "Aries",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FARIES.png?alt=media&token=151195ec-d409-4476-80e3-7f82aef9e4d4",
        },
      ],
    },
    {
      sign: "Scorpio",
      most_compatible: [
        {
          Name: "Pisces",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FPISCES.png?alt=media&token=d14a22f8-7daf-4f74-a655-0d9ee952a3a8",
        },
      ],

      least_compatible: [
        {
          Name: "Leo",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FLEO.png?alt=media&token=1ad40fe2-3b4b-4e4e-9bcd-68210bb97b02",
        },

        {
          Name: "Aquarius",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FAQUARIUS.png?alt=media&token=fdb3d83f-8913-49be-a8f8-12dcbb2f2005",
        },
        {
          Name: "Taurus",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FTAURUS.png?alt=media&token=ddcaee12-692f-42f3-8ad3-726ee143b371",
        },
      ],
    },
    {
      sign: "Sagittarius",
      most_compatible: [
        {
          Name: "Gemini",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FGEMINI.png?alt=media&token=970cdf1c-bb73-4336-8435-3b94cd820479",
        },
      ],

      least_compatible: [
        {
          Name: "Virgo",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FVIRGO.png?alt=media&token=b2222a7c-20fa-4f91-8bd6-7d25a898bb24",
        },

        {
          Name: "Pisces",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FPISCES.png?alt=media&token=d14a22f8-7daf-4f74-a655-0d9ee952a3a8",
        },
      ],
    },
    {
      sign: "Capricorn",
      most_compatible: [
        {
          Name: "Taurus",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FTAURUS.png?alt=media&token=ddcaee12-692f-42f3-8ad3-726ee143b371",
        },
      ],

      least_compatible: [
        {
          Name: "Aries",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FARIES.png?alt=media&token=151195ec-d409-4476-80e3-7f82aef9e4d4",
        },

        {
          Name: "Libra",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FLIBRA.png?alt=media&token=c2d45f58-61d9-4347-b729-c7592ed0fcdb",
        },

        {
          Name: "Cancer",
          Link: "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs_Black%2FCANCER.png?alt=media&token=d9d206dd-51da-4dfe-b6f7-0c6187fcdbb3",
        },
      ],
    },
  ];

  let signFind = z_symbols.find((sign) => sign.sign === symbol);

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

  const getMostCompatible = () => {
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

    let signFind = z_symbols.find((sign) => sign.sign === symbol);

    return (
      <div>
        <h3 className="font-bold text-white text-lg">Most Compatible</h3>

        <p className="mb-3 text-white font-light">
          Surround yourself with these people.
        </p>
        <div className="grid grid-cols-3 space-x-3 mb-5">
          {signFind.most_compatible.map((m_compatible) => {
            return (
              <div className="col-span-1 flex flex-col bg-white rounded-lg p-3 items-center">
                <div className="flex items-center justify-center">
                  <img src={m_compatible.Link} style={{ height: "50px" }} />
                </div>
                <h4 className="text-md font-bold">{m_compatible.Name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const getLeastCompatible = () => {
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

    return (
      <div>
        <h3 className="font-bold text-white text-lg">Least Compatible</h3>

        <p className="mb-3 text-white font-light">
          They may not be the best match for your traits.
        </p>
        <div className="grid grid-cols-3 space-x-3">
          {signFind.least_compatible.map((m_compatible) => {
            return (
              <div className="col-span-1 flex flex-col bg-white rounded-lg p-3 items-center">
                <div className="flex items-center justify-center">
                  <img src={m_compatible.Link} style={{ height: "50px" }} />
                </div>
                <h4 className="text-md font-bold">{m_compatible.Name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const testing = () => {
    console.log("titengmalake");
    console.log(userData.zodiac); // get zodiac

    //   continue here
  };

  return (
    <div className="mx-16 lg:mx-24 2xl:mx-64 grid grid-cols-2">
      {testing()}

      <div className="col-span-1 flex flex-col items-center justify-center">
        <img
          src={symbols[symbol.toLowerCase()].link}
          style={{ width: "50vh", height: "auto" }}
        />
        <h2 className="text-white font-light text-3xl">{symbol}</h2>
      </div>

      <div
        className="col-span-1 flex flex-col h-full justify-center"
        style={{ minHeight: "600px" }}
      >
        {getMostCompatible()} {/* date */}
        {getLeastCompatible()} {/* date */}
      </div>

      <MessengerCustomerChat
        pageId="102233909130277"
        appId="703682774401709"
    />
    </div>
  );
};

const UserButton = (props) => {
  const data = props.data;
  const [showDialog, setDialog] = useState(false);
  let username = `${data.fName} ${data.lName}`;

  console.log(`Data: ${data}`);
};

export default Compatibility_Component;
