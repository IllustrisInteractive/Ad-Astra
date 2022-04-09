import Head from "next/head";

import Navbar from "../components/navbar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import ContentEditable from "react-contenteditable";

import MessengerCustomerChat from 'react-messenger-customer-chat';
import { TailSpin } from "react-loader-spinner";

import { useRef, useState } from "react";
import {
  signup,
  login,
  logout,
  useAuth,
  retrieveUserData,
  packageThenPost,
  retrieveEntries,
} from "../modules/firebase";

import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Journal() {
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

  const MINUTE_MS = 6000;

  async function loadData() {
    return await retrieveUserData(currentUser.uid);
  }

  if (loading) {
    return <>Loading...</>;
  } else {
    return (
      <div className="h-screen w-screen relative bg-gradient-to-r from-journal_l to-journal_r">
        <Head>
          <title>My Journal | Ad Astra</title>
        </Head>

        <Navbar data={userData} />
        <JournalUI userData={userData} />
      </div>
    );
  }
}

const JournalUI = (props) => {
  const userData = props.userData;
  Date.prototype.today = function () {
    return (
      (this.getDate() < 10 ? "0" : "") +
      this.getDate() +
      "/" +
      (this.getMonth() + 1 < 10 ? "0" : "") +
      (this.getMonth() + 1) +
      "/" +
      this.getFullYear()
    );
  };

  // For the time now
  Date.prototype.timeNow = function () {
    return (
      (this.getHours() < 10 ? "0" : "") +
      this.getHours() +
      ":" +
      (this.getMinutes() < 10 ? "0" : "") +
      this.getMinutes() +
      ":" +
      (this.getSeconds() < 10 ? "0" : "") +
      this.getSeconds()
    );
  };
  const d = new Date();
  const [ui_data, setUI] = useState({
    entries: [],
    ready: false,
    active: -1,
    typing: false,
    hasChanges: false,
  });

  const contentText = useRef("");
  const titleText = useRef("");

  const handleChange = (evt) => {
    let wordCount = evt.target.value.split(" ");
    contentText.current = evt.target.value;
    let ui_data_copy = structuredClone(ui_data);
    ui_data_copy.entries.find(
      (entry) => entry.id == ui_data_copy.active
    ).elements.content = evt.target.value;
    ui_data_copy.entries.find(
      (entry) => entry.id == ui_data_copy.active
    ).words = evt.target.value != "" ? wordCount.length : 0;
    ui_data_copy.hasChanges = true;
    setUI(ui_data_copy);
  };

  const handleBlur = () => {};

  const saveToFirebase = (id) => {
    if (
      ui_data.entries.find((entry) => entry.id == ui_data.active)
        .remote_saved ||
      ui_data.entries.find((entry) => entry.id == ui_data.active).title != ""
    ) {
      console.log(
        `Saved "${
          ui_data.entries.find((entry) => entry.id == ui_data.active).title
        }" to Remote`
      );
    } else if (
      ui_data.entries.find((entry) => entry.id == ui_data.active).title == ""
    ) {
      console.log(
        `Cannot save ${ui_data.active} because title is not yet set. ERROR 1.`
      );
    }

    packageThenPost(userData.id, ui_data.entries);

    let newDate = new Date();
    let datetime = newDate.today() + " at " + newDate.timeNow();
    let ui_data_copy = structuredClone(ui_data);
    ui_data_copy.entries.find(
      (entry) => entry.id == ui_data.active
    ).last_saved = datetime;
    ui_data_copy.hasChanges = false;
    setUI(ui_data_copy);
    console.log(ui_data);
  };

  const addEntry = () => {
    let ui_data_copy = structuredClone(ui_data);
    let entryToAdd = {
      id: d.getTime(),
      title: "",
      remote_saved: false,
      words: 0,
      last_saved: "",
      elements: {
        content: "",
      },
    };
    ui_data_copy.entries.unshift(entryToAdd);
    ui_data_copy.active = entryToAdd.id;
    console.log(ui_data_copy);
    setUI(ui_data_copy);
  };

  const changeActive = (e) => {
    console.log("ID: ", e.target.id);
    let query = ui_data.entries.find((entry) => entry.id == e.target.id);
    titleText.current = query.title;
    contentText.current = query.elements.content;
    let ui_data_copy = structuredClone(ui_data);
    ui_data_copy.active = e.target.id;
    setUI(ui_data_copy);
  };

  const handleTitleChange = (evt) => {
    titleText.current = evt.target.value;
    let ui_data_copy = structuredClone(ui_data);
    ui_data_copy.entries.find(
      (entry) => entry.id == ui_data_copy.active
    ).title = evt.target.value;
    ui_data_copy.hasChanges = true;
    setUI(ui_data_copy);
  };

  const handleTitleBlur = () => {};

  const EntryButtons = (props) => {
    let buttons = [];
    for (let i = 0; i < ui_data.entries.length; i++) {
      buttons.push(
        <div className="p-3 bg-white shadow relative rounded" key={i}>
          <div
            className="absolute"
            id={ui_data.entries[i].id}
            style={{ width: "100%", height: "100%" }}
            onClick={changeActive}
          />
          <h3 className="font-bold text-xl">
            {ui_data.entries[i].title == ""
              ? "New Entry"
              : ui_data.entries[i].title}
          </h3>
          <h5 className="font-light text-sm">
            {!ui_data.entries[i].title == ""
              ? `${ui_data.entries[i].words} word` +
                (ui_data.entries[i].words > 1 ? "s" : "")
              : "Change the title to save this"}
          </h5>
        </div>
      );
    }

    return buttons;
  };

  useEffect(() => {
    if (ui_data.hasChanges) {
      const delayDebounceFn = setTimeout(() => {
        console.log(
          "Detected change to local save. Attempting to save to remote."
        );
        saveToFirebase(ui_data.active);
      }, 3000);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [ui_data.entries]);

  useEffect(async () => {
    //retrieve data from firebase here then set as entries with setEntries
    if (!ui_data.ready) {
      let entriesToAdd = await retrieveEntries(userData.id);
      if (entriesToAdd) {
        setUI({
          entries: entriesToAdd.entries,
          ready: true,
          active: entriesToAdd.entries[0].id,
        });
      } else {
        setUI({
          entries: [],
          ready: true,
          active: -1,
        });
      }
    }
  }, []);
  return (
    <div className="h-3/4">
      <div className="grid grid-cols-7 gap-x-2 mx-16 lg:mx-24 2xl:mx-64 h-full items-center">
        {ui_data.ready ? (
          <>
            <div className="col-span-2 p-3">
              <div className="flex flex-col items-center justify-center mb-3">
                <a onClick={addEntry}>Add new Entry</a>
              </div>
              <div className="flex flex-col space-y-2">
                {ui_data.entries.length > 0 ? <EntryButtons /> : ""}
              </div>
            </div>
            <div
              className="col-span-5 p-5 rounded bg-white"
              style={{ maxHeight: "600px", height: "600px" }}
            >
              {ui_data.active < 0 ? (
                <></>
              ) : (
                <>
                  <ContentEditable
                    className="text-2xl font-bold"
                    html={titleText.current}
                    onBlur={handleTitleBlur}
                    onChange={handleTitleChange}
                    placeholder={"Click here to edit the title"}
                  />
                  <p className="text-sm text-gray-400 mb-5">
                    {ui_data.entries.find((entry) => entry.id == ui_data.active)
                      .remote_saved ||
                    ui_data.entries.find((entry) => entry.id == ui_data.active)
                      .title != ""
                      ? `Last saved on ${
                          ui_data.entries.find(
                            (entry) => entry.id == ui_data.active
                          ).last_saved
                        }.`
                      : "Not yet saved."}
                  </p>
                  <ContentEditable
                    html={contentText.current}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={"Click here to start writing to your journal"}
                  />
                </>
              )}

        <MessengerCustomerChat
                pageId="102233909130277"
                appId="703682774401709"
            />
            </div>
          </>
        ) : (
          <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
          <TailSpin color="#00BFFF" height={80} width={80} />
          <div className="text-gray-400">Loading your experience</div>
        </div>
        )}
      </div>
    </div>
  );
};
