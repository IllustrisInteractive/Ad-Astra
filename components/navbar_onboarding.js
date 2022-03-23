import React, { Component } from "react";

import Image from "next/image";

export default class OnboardingNavBar extends Component {
  render() {
    return (
      <div className="w-full hidden lg:block mb-3 shadow py-3">
        <nav className="flex grid grid-cols-10 gap-x-4 mx-8 xl:mx-16 2xl:mx-64 items-center">
          <a href="../" className="flex col-span-2 items-center">
            <Image src="/AGAP.png" width={40} height={40} />
            <span className="self-center text-4xl font-extrabold whitespace-nowrap dark:text-white ml-2">
              AD ASTRA
            </span>
          </a>
          <div className="col-span-5"></div>
          <div className="col-span-3 flow-root">
            <div className="hidden w-full md:block md:w-auto flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium items-center float-right"></div>
          </div>
        </nav>
      </div>
    );
  }
}
