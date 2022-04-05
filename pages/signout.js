import React, { Component, useEffect } from "react";

import { useRef, useState } from "react";
import {
  signup,
  login,
  logout,
  useAuth,
  retrieveUserData,
} from "../modules/firebase";
import OnboardingNavBar from "../components/navbar_onboarding";

export const SignOut = (props) => {
  useEffect(() => {
    window.location.replace("/login");
  }, []);
  return <></>;
};

export default SignOut;
