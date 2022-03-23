import React, { Component } from "react";

export default class Weather extends Component {
  render() {
    return (
      <>
        <div className="p-5 bg-gradient-to-r from-cyan-300 to-cyan-700 h-auto rounded-md shadow invisible lg:visible mb-2">
          <div className="flex items-center space-x-4">
            <div className="col-span-1">
              <div className="weather-image">
                <svg
                  className="h-12 w-12 text-orange-500"
                  viewBox="0 0 24 24"
                  fill="orange"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap ="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <circle cx="12" cy="12" r="5" />{" "}
                  <line x1="12" y1="1" x2="12" y2="3" />{" "}
                  <line x1="12" y1="21" x2="12" y2="23" />{" "}
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />{" "}
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />{" "}
                  <line x1="1" y1="12" x2="3" y2="12" />{" "}
                  <line x1="21" y1="12" x2="23" y2="12" />{" "}
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />{" "}
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              </div>
            </div>
            <br />
            <div className="col-span-1">
              <div class="weather-description mb-3">
                <p className="text-xs font-bold text-white">Enjoy the sun. </p>
              </div>
              <div className="temp-value">
                <p className="text-2xl font-extrabold text-orange-500">29°C</p>
              </div>
              <div className="location">
                <p className="text-lg font-bold text-white">
                  Metro Manila, Philippines
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
