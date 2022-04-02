import React, { Component, useState } from "react";



function Readings() {

    let aquarius = "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FAQUARIUS.png?alt=media&token=510b589a-723e-41a4-bb9f-35aca3db5f55";
    let aries = "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FARIES.png?alt=media&token=2254f529-08ba-4bf6-b1c9-4eac6764dd85";
    let cancer = "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FCANCER.png?alt=media&token=8bae2f32-c79c-43f0-81c7-bf3961145106";
    let capricorn = "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FCAPRICORN.png?alt=media&token=4bcdfca1-2b0e-41d1-88bd-a3ae4813d21c";
    let gemini = "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FGEMINI.png?alt=media&token=62c7c518-2986-49ea-bdce-fb36f93cb3e7";
    let leo = "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FLEO.png?alt=media&token=c24b0198-af74-49d9-849e-e71738e2972d";
    let libra = "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FLIBRA.png?alt=media&token=7d47e1ce-2f01-4278-9077-18dc1d29edba";
    let pisces = "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FPISCES.png?alt=media&token=4d781c14-6c04-418b-a971-d4aaf8efc96f";
    let sagitarius = "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FSAGITARIUS.png?alt=media&token=5dc4e72a-5fee-4fe1-861d-11d29c4d2adb";
    let scorpio = "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FSCORPIO.png?alt=media&token=f3a16a25-2298-4cf0-ac9e-4798e696a142";
    let taurus = "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FTAURUS.png?alt=media&token=c5448ff1-a885-416f-850f-88d082f7b856";
    let virgo = "https://firebasestorage.googleapis.com/v0/b/ad-astra-3b593.appspot.com/o/Zodiac_Signs%2FVIRGO.png?alt=media&token=58af87cc-fe0b-4461-a599-3cc0ac534c58";

    return (
      <>
        <div class="py-20 bg-[#9D50BB]">
        <div class="container items-center max-w-6xl px-10 mx-auto sm:px-20 md:px-32 lg:px-16">
            <div class="flex flex-wrap items-center -mx-6">


            {/* Column 1 Image */}

            <div class="w-full px-3 mb-12 lg:w-1/2 order-0 lg:order-1 lg:mb-0">
                <img class="mx-auto sm:max-w-sm lg:max-w-full" src={gemini}></img>
            </div>
            

            {/* Column 2 */}
            
            <div class="order-1 w-full px-3 lg:w-1/2 lg:order-0">
                <div class="w-full lg:max-w-md">
                <h2 class="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl font-heading">Saturday | March 19, 2022</h2>
                <p class="mb-4 font-medium tracking-tight text-gray-400 xl:mb-6">Someone who lives far away, someone you haven't heard from for a long time, could give you a surprise phone call today. You'll be delighted and probably stay on the phone too long. You might need to run a few errands, but the weather could keep you indoors. Don't worry about it, Virgo. You'll still have time to take care of other pressing matters. You should be feeling especially artistic right now. Be creative!</p>
                <ul>
                    <li class="flex items-center py-2 space-x-4 xl:py-3">
                    <svg class="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
                    <span class="font-medium text-gray-500">Faster Processing and Delivery</span>
                    </li>
                    <li class="flex items-center py-2 space-x-4 xl:py-3">
                    <svg class="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                    <span class="font-medium text-gray-500">Out of the Box Tracking and Monitoring</span>
                    </li>
                    <li class="flex items-center py-2 space-x-4 xl:py-3">
                    <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                    <span class="font-medium text-gray-500">100% Protection and Security for Your App</span>
                    </li>
                </ul>
                </div>
            </div>
            
            </div>
        </div>
        </div>

      </>
    );
  }

  const UserButton = (props) => {
    const data = props.data;
    const [showDialog, setDialog] = useState(false);
    let username = `${data.fName} ${data.lName}`;

    console.log(`Data: ${data}`);

  };
  

export default Readings;