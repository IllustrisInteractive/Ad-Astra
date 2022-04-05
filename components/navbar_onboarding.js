import React, { Component } from "react";

import Image from "next/image";

export default class OnboardingNavBar extends Component {
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
        </div>
      </>
    );
  }
}
