import "tailwindcss/tailwind.css";
import "../styles/styles.css";
import { initializeApp } from "firebase/app";
import { AnimatePresence } from "framer-motion";
import { Head } from "next/document";

function MyApp({ Component, pageProps }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} />
    </AnimatePresence>
  );
}

export default MyApp;
