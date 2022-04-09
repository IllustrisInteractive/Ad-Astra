import "tailwindcss/tailwind.css";
import "../styles/styles.css";
import { initializeApp } from "firebase/app";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }) {
  return (
    <AnimatePresence>
      <Component {...pageProps} />
    </AnimatePresence>
  );
}

export default MyApp;
