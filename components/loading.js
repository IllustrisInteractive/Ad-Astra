import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";
const Loading = (props) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
      <AnimatePresence exitBeforeEnter>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            key={"loading"}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col space-y-5 justify-center items-center"
          >
            <TailSpin color="#00BFFF" height={80} width={80} />
            <div className="text-gray-400">Loading your experience</div>
          </motion.div>
        )}
        {!isLoading && <div className="text-gray-400">Ready!</div>}
      </AnimatePresence>
    </div>
  );
};

export default Loading;
