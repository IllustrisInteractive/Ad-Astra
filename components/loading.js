import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
const Loading = (props) => {
  return (
    <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
      <TailSpin color="#00BFFF" height={80} width={80} />
      <div className="text-gray-400">Loading your experience</div>
    </div>
  );
};

export default Loading;
