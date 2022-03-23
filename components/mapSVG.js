import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  document,
  addDoc,
  getFirestore,
} from "firebase/firestore";
import PostFactory from "./PostFactory";

const MapSVG = (props) => {
  const [modal, setModal] = useState(false);
  const [length, setLength] = useState({});
  const [ready, setReady] = useState(false);
  const [displaylocation, setLocation] = useState("");
  function displayModal(location) {
    if (modal) setModal(false);
    else if (location != displaylocation) setModal(true);
    else setModal(!modal);
    setLocation(location);
  }
  useEffect(() => {
    retrieveLength().then((returnedKV) => {
      setLength(returnedKV);
      setReady(true);
    });
  }, []);

  const options = {
    manila: "Manila",
    qc: "Quezon City",
    caloocan: "Caloocan",
    laspinas: "Las Pinas",
    makati: "Makati",
    malabon: "Malabon",
    mandaluyong: "Mandaluyong",
    marikina: "Marikina",
    muntinlupa: "Muntinlupa",
    navotas: "Navotas",
    paranaque: "Paranaque",
    pasay: "Pasay",
    pasig: "Pasig",
    sanjuan: "San Juan",
    taguig: "Taguig",
    valenzuela: "Valenzuela",
  };
  return (
    <>
      {ready ? (
        <div className="p-3 bg-gray-400 rounded-lg shadow-inner relative">
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 276.05 487.65"
            height="90vh"
            width="auto"
            className="cursor-pointer"
          >
            <defs></defs>
            <path
              id="manila"
              class="cls-1"
              d="M106.1,176.3l-2.2,11.2,35.8,24.6,7.8,10.1L135.2,239l-23.5,20.1-30.2,1.1L56.9,218.8,46.8,194.2l-2.2-17.9,33.6-1.1L95,173l11.1,3.3Z"
              transform="translate(-7.32 -9.13)"
              fill={numberToColor(length["manila"])}
              onClick={(e) => displayModal(e.target.id)}
            />
            <path
              id="qc"
              class="cls-1"
              d="M283,19.6l-12.3,19L264,43.1l-1.1,15.7,11.2,9-17.9,34.7-5.6,31.3-14.5,5.6-12.3,16.8h-9l3.4,10.1L207,187.6l4.5,11.2,13.4,13.4-5.6,2.2-3.4,13.4-13.4-3.4L188,228.9V216.6l-2.2-6.7h-6.7l-2.2-3.4-20.1-1.1-11.2-4.5L140,212.1l-35.8-24.6,2.2-11.2V166.2l9-16.8,16.8-20.1,14.5-14.5,1.1-7.8-13.4-3.4V95.8l1.1-15.7,28-20.1,17.9-2.2,26.9-1.1L218,51l5.6-10.1,11.2-3.4,4.5-11.2,7.8-1.1,6.7-9L283,19.6Z"
              transform="translate(-7.32 -9.13)"
              fill={numberToColor(length["qc"])}
              onClick={(e) => displayModal(e.target.id)}
            />
            <path
              id="caloocan"
              class="cls-1"
              d="M106.1,176.3,95,172.9l-16.8,2.2-9-10.1,2.2-5.6,1.1-11.2L82.6,146l22.4-1.1,10.1-7.8-4.5-5.6,6.7-10.1,9-1.1,6.7-5.6h13.4l-14.5,14.5-16.8,20.1-9,16.8v10.2Zm133.2-150-4.5,11.2-11.2,3.4L218,51l-10,5.6-26.9,1.1-17.9,2.2L135.2,80l-1.1,15.7-4.5-3.4H124l-6.7-6.7,1.1-12.3,6.7-1.1,1.1-12.3-1.1-6.7L115.1,42l25.7-11.2L152,12.9l20.1-3.4,58.2,17.9,9-1.1Z"
              transform="translate(-7.32 -9.13)"
              fill={numberToColor(length["caloocan"])}
              onClick={(e) => displayModal(e.target.id)}
            />
            <path
              id="laspinas"
              data-name="las pinas"
              class="cls-1"
              d="M143.1,402.3,142,415.7l-12.3,14.5-2.2,15.7-5.6,5.6-2.2-5.6-28-47L77.2,388.8l-3.4-33.6L59.3,333.9l11.2-7.8,3.4-4.5,16.8,19,11.2,5.6L103,354l12.3,9,2.2,14.5,12.3,9,4.5,10.1,8.8,5.7Z"
              transform="translate(-7.32 -9.13)"
              fill={numberToColor(length["laspinas"])}
              onClick={(e) => displayModal(e.target.id)}
            />
            <path
              id="makati"
              class="cls-1"
              d="M178.9,251.2l17.9,9,1.1,11.2-4.5,5.6,1.1,10.1-3.4,4.5h-5.6l-2.2-14.5,5.6-10.1-9-6.7-4.5,4.5-10.1-1.1-1.1,5.6,6.7,6.7-1.1,7.8L153,290.5,142,296l-11.2-3.4-4.5-9-1.1-11.2L115.1,269l-3.4-10.1,23.5-20.1,12.3,6.7,9,7.8,22.4-2.1Z"
              transform="translate(-7.32 -9.13)"
              fill={numberToColor(length["makati"])}
              onClick={(e) => displayModal(e.target.id)}
            />
            <path
              id="malabon"
              class="cls-1"
              d="M51.3,102.4l11.2,4.5,11.2,22.4,9,1.1,15.7,6.7,12.3-5.6,4.5,5.6-10.1,7.8L82.7,146l-10.1,2.2-1.1,11.2L69.3,165l-4.5-7.8H58l-4.5-12.3L41.2,122.5l-9-7.8L22.1,103.5l6.7-5.6,23.5,16.8Z"
              transform="translate(-7.32 -9.13)"
              fill={numberToColor(length["malabon"])}
              onClick={(e) => displayModal(e.target.id)}
            />
            <path
              id="mandaluyong"
              class="cls-1"
              d="M187.8,216.6v12.3l1.1,3.4-4.5,11.2-5.6,7.8-22.4,2.2-9-7.8L135.1,239l12.3-16.8,9,4.5,14.5-3.4,6.7-7.8Z"
              transform="translate(-7.32 -9.13)"
              fill={numberToColor(length["mandaluyong"])}
              onClick={(e) => displayModal(e.target.id)}
            />
            <path
              id="marikina"
              class="cls-1"
              d="M241.5,198.7l-5.6-3.4-19-4.5-5.6,7.8-4.5-11.2L218,166.1,214.6,156h9l12.3-16.8,14.5-5.6,28,9,2.2,11.2L275,179.5l-19-3.4-10.1,7.8-4.4,14.8Z"
              transform="translate(-7.32 -9.13)"
              fill={numberToColor(length["marikina"])}
              onClick={(e) => displayModal(e.target.id)}
            />
            <path
              id="muntinlupa"
              class="cls-1"
              d="M260.6,383.3l10.1,78.3-88.4,4.5-6.7,6.7-10.1-1.1-15.7,9-12.3,11.2-15.7,4.5,3.4-33.6-3.4-11.2,5.6-5.6,2.2-15.7,12.3-14.5,1.1-13.4L169.9,389V370l9-6.7,10.1,1.1Z"
              transform="translate(-7.32 -9.13)"
              fill={numberToColor(length["muntinlupa"])}
              onClick={(e) => displayModal(e.target.id)}
            />
            <path
              id="navotas"
              class="cls-1"
              d="M28.9,98l-6.7,5.6,10.1,11.2,9,7.8L53.6,145l4.5,12.3h6.7l4.5,7.8,9,10.1-33.6,1.1L39,144.9l-7.8-16.8L7.7,96.8l6.7-9L28.9,98Z"
              transform="translate(-7.32 -9.13)"
              fill={numberToColor(length["navotas"])}
              onClick={(e) => displayModal(e.target.id)}
            />
            <path
              id="paranaque"
              class="cls-1"
              d="M156.5,319.5l14.5,6.7-1.1,43.6v19L143,402.2l-9-5.6-4.5-10.1-12.3-9L115,363l-12.3-9-1.1-7.8-11.2-5.6-16.8-19,9-11.2L87.1,288l24.6,2.2L110.6,307l3.4,10.1,15.7-2.2,12.3,6.7,14.5-2.1Z"
              transform="translate(-7.32 -9.13)"
              fill={numberToColor(length["paranaque"])}
              onClick={(e) => displayModal(e.target.id)}
            />
            <path
              id="pasay"
              class="cls-1"
              d="M142,296l14.5,23.5L142,321.7,129.7,315,114,317.2l-3.4-10.1,1.1-16.8-24.6-2.2-5.6-28,30.2-1.1,3.4,10.1,10.1,3.4,1.1,11.2,4.5,9Z"
              transform="translate(-7.32 -9.13)"
              fill={numberToColor(length["pasay"])}
              onClick={(e) => displayModal(e.target.id)}
            />
            <path
              id="pasig"
              class="cls-1"
              d="M241.5,198.7l9,16.8L248.3,239l-5.6,11.2,5.6,10.1-6.7,10.1,7.8,28-17.9-19H214.7l-3.4-2.2-1.1-5.6-5.6-2.2-6.7,2.2-1.1-11.2-17.9-9,5.6-7.8,4.5-11.2-1.1-3.4,14.5-4.5,13.4,3.4,3.4-13.4,5.6-2.2-13.4-13.4,5.6-7.8,19,4.5,5.5,3.1Z"
              transform="translate(-7.32 -9.13)"
              fill={numberToColor(length["pasig"])}
              onClick={(e) => displayModal(e.target.id)}
            />
            <path
              id="sanjuan"
              data-name="san juan"
              class="cls-1"
              d="M187.8,216.6l-10.1-1.1-6.7,7.8-14.5,3.4-9-4.5-7.8-10.1,5.6-11.2,11.2,4.5,20.1,1.1,2.2,3.4h6.7l2.3,6.7Z"
              transform="translate(-7.32 -9.13)"
              fill={numberToColor(length["sanjuan"])}
              onClick={(e) => displayModal(e.target.id)}
            />
            <path
              id="taguig"
              class="cls-1"
              d="M194.5,287.1l7.8-1.1,3.4-6.7,5.6-2.2,3.4,2.2h16.8l17.9,19,11.2,85-71.6-19-10.1-1.1-9,6.7,1.1-43.6-14.5-6.7L142,296l11.2-5.6,16.8-6.7,1.1-7.8-6.7-6.7,1.1-5.6,10.1,1.1,4.5-4.5,9,6.7L183.5,277l2.2,14.5h5.6l3.2-4.4Z"
              transform="translate(-7.32 -9.13)"
              fill={numberToColor(length["taguig"])}
              onClick={(e) => displayModal(e.target.id)}
            />
            <path
              id="valenzuela"
              class="cls-1"
              d="M134.1,95.7v7.8l13.4,3.4-1.1,7.8H133l-6.7,5.6-9,1.1-6.7,10.1-12.3,5.6-15.7-6.7-9-1.1L62.4,106.9l-11.2-4.5-24.6-38H51.2L67,81.2,92.7,71.1l10.1-23.5L115.1,42l10.1,11.2,1.1,6.7-1.1,12.3-6.7,1.1-1.1,12.3,6.7,6.7h5.6l4.4,3.4Z"
              transform="translate(-7.32 -9.13)"
              fill={numberToColor(length["valenzuela"])}
              onClick={(e) => displayModal(e.target.id)}
            />
          </svg>
          {modal ? (
            <div
              className="bg-white p-3 rounded-lg shadow-lg absolute lg:left-0 bottom-0 w-full overflow-y-auto no-scrollbar"
              style={{ maxHeight: "70%" }}
            >
              <div className="hidden w-full relative " />
              <p className="text-gray-400 pointer-events-none">
                Reports in {options[displaylocation]}
              </p>
              <a
                className="absolute right-0 top-0 mr-5 mt-4 cursor-pointer"
                onClick={() => {
                  setLocation("");
                  setModal(false);
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 18L18 6M6 6L18 18"
                    stroke="#111827"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
              <PostFactory
                user={null}
                location={displaylocation}
                className="flex bg-white flex-col mb-3 rounded shadow mt-3"
                mini={true}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <>Loading</>
      )}
    </>
  );
};

export default MapSVG;

async function retrieveLength() {
  const db = getFirestore();
  const locations = [
    "caloocan",
    "laspinas",
    "makati",
    "malabon",
    "mandaluyong",
    "manila",
    "marikina",
    "muntinlupa",
    "navotas",
    "paranaque",
    "pasay",
    "pasig",
    "qc",
    "sanjuan",
    "taguig",
    "valenzuela",
  ];
  let lengthList = [];

  let returnedKV = {};

  for (let i = 0; i < locations.length; i++) {
    const ref = doc(db, `posts/location/${locations[i]}`, "0");
    const querySnapshot = await getDoc(ref);
    let data = querySnapshot.data();
    returnedKV[locations[i]] = data.length;
  }
  return returnedKV;
}

function numberToColor(number) {
  if (number < 1) return "gray";
  if (number < 6) return "green";
  if (number < 11) return "yellow";
  if (number < 21) return "red";
}
