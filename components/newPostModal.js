import React, { Component } from "react";
import UploadFile from "../pages/api/UploadFile";
import PostAuxiliary from "./PostAuxillary";
import { uploadPost } from "../modules/firebase";

const NewPostModal = (props) => {
  const [showModal, setShowModal] = React.useState(false);
  const [type, setType] = React.useState("none");
  const [active, setActive] = React.useState(0);
  const inputFile = React.useRef(null);
  const [files, setFiles] = React.useState(null);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [reward, setReward] = React.useState(0);
  const [caption, setCaption] = React.useState("");

  function changeCategory(string, index) {
    if (index === active) {
      setActive(0);
      setType("none");
    } else {
      setType(string);
      setActive(index);
    }
  }

  function resetComponent() {
    setShowModal(false);
    setType("none");
    setActive(0);
    setFiles(null);
  }

  function add_post() {}

  function bundleData() {
    console.log(props);
    const dataToExport = {
      user: props.user,
      caption: document.getElementById("caption-editable-div").innerText,
      category: type,
      auxiliary: {
        media: null,
        name: name,
        location: location,
        description: description,
        reward: reward,
      },
    };
    console.log(dataToExport);
    resetComponent();

    if (files != null) {
      dataToExport.auxiliary.media = files.name;
    }
    uploadPost(dataToExport, props.user, files);
    /*
    POST JSON FORMAT
    
    post {
      user: User (derived from userData prop. Pass as is.),
      caption: string,
      category: "crime"/"accident"/"missing"/"hazard",
      auxillary: {
        (This will depend on the category. LEGEND: C - Crime, A - Accident, M - Missing, H - Hazard)
        (element name: Appears in)
        name: CM,
        location: CAMH,
        description: M,
        reward: M
      }
    }
    */
  }

  function setSelectedFile(file) {
    setFiles(file);
  }

  function stagePost() {}

  return (
    <>
      <div
        className="w-full bg-gray-300 py-5 px-3 rounded-lg flex flex-row shadow-inner items-center"
        type="button"
        onClick={() => setShowModal(true)}
        style={{
          cursor: "pointer",
        }}
      >
        <svg
          className="mr-3"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.8325 8.17463L10.109 13.9592L3.59944 9.88767C2.66675 9.30414 2.86077 7.88744 3.91572 7.57893L19.3712 3.05277C20.3373 2.76963 21.2326 3.67283 20.9456 4.642L16.3731 20.0868C16.0598 21.1432 14.6512 21.332 14.0732 20.3953L10.106 13.9602"
            stroke="#130F26"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <a className="text-gray-500 text-lg">
          What's going on, {`${props.user.fName}`}?
        </a>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none fixed inset-0 bg-gray-700 bg-opacity-70">
            <div className="m-2 w-full lg:w-1/2 bg-white rounded-md p-5 shadow flex flex-col">
              <div className=" items-center justify-center w-full flex text-2xl font-bold grow-0 mb-5">
                <h1>Create Post</h1>
              </div>
              <div className="">
                <div>
                  <p className="text-sm font-semibold mb-2">{`${props.user.fName} ${props.user.lName}`}</p>
                </div>

                <p
                  className="break-all focus:outline-none display:inline-block mb-2"
                  contentEditable="true"
                  data-text="Tell everyone what's going on."
                  id="caption-editable-div"
                ></p>
                <PostAuxiliary
                  type={type}
                  ref={inputFile}
                  setSelectedFile={setSelectedFile}
                  file={files}
                  setName={setName}
                  setDescription={setDescription}
                  setLocation={setLocation}
                  setReward={setReward}
                />
                <div className="mb-5">
                  <p className="text-xs">Currently posting a report in</p>
                  <p className="text-sm font-bold">
                    {props.user.city}, Philippines
                  </p>
                </div>
                <div className=" py-3 px-5 items-center grid grid-flow-col grid-cols-4 rounded-lg border-2 border-gray-300 gap-x-3 mb-3">
                  <button
                    className={
                      active === 1
                        ? "col-span-1 bg-gray-600 text-white rounded-2xl px-3 py-1 font-bold"
                        : "col-span-1 bg-gray-300 rounded-2xl px-3 py-1 font-bold"
                    }
                    onClick={() => changeCategory("crime", 1)}
                  >
                    Crime
                  </button>
                  <button
                    className={
                      active === 2
                        ? "col-span-1 bg-gray-600 text-white rounded-2xl px-3 py-1 font-bold"
                        : "col-span-1 bg-gray-300 rounded-2xl px-3 py-1 font-bold"
                    }
                    onClick={() => changeCategory("accident", 2)}
                  >
                    Accident
                  </button>
                  <button
                    className={
                      active === 3
                        ? "col-span-1 bg-gray-600 text-white rounded-2xl px-3 py-1 font-bold"
                        : "col-span-1 bg-gray-300 rounded-2xl px-3 py-1 font-bold"
                    }
                    onClick={() => changeCategory("missing", 3)}
                  >
                    Missing
                  </button>
                  <button
                    className={
                      active === 4
                        ? "col-span-1 bg-gray-600 text-white rounded-2xl px-3 py-1 font-bold"
                        : "col-span-1 bg-gray-300 rounded-2xl px-3 py-1 font-bold"
                    }
                    onClick={() => changeCategory("hazard", 4)}
                  >
                    Hazard
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => resetComponent()}
                >
                  Discard
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={bundleData}
                >
                  POST
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default NewPostModal;
