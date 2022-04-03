import "tailwindcss/tailwind.css";
import "../styles/styles.css";
import { initializeApp } from "firebase/app";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
