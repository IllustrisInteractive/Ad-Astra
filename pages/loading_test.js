import Loading from "../components/loading";
import { AnimatePresence } from "framer-motion";

const LoadingTest = (props) => {
  return (
    <AnimatePresence>
      <Loading duration={5000} />
    </AnimatePresence>
  );
};

export default LoadingTest;
