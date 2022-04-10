import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getLinkData } from "../../modules/firebase";
import Loading from "../../components/loading";

const LinkViewer = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const router = useRouter();
  const { link } = router.query;

  useEffect(() => {
    if (loading && router.isReady) {
      getLinkData(link).then((fetchedData) => {
        if (fetchedData === undefined) {
          router.push("/view/not-found");
        } else {
          setData(fetchedData);
          setLoading(false);
        }
      });
    }
  }, [router.isReady]);
  return (
    <AnimatePresence exitBeforeEnter>
      {loading && (
        <motion.div key={"loading"} exit={{ opacity: 0 }}>
          <Loading />
        </motion.div>
      )}
      {!loading && (
        <motion.div
          key={"content"}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          className="h-screen w-screen bg-gradient-to-r from-readings_l to-readings_r flex justify-center items-center"
        >
          <div className="mx-16 lg:mx-24 2xl:mx-64 flex flex-col space-y-5">
            <div className="flex flex-col text-white">
              <h3>Daily summary for</h3>
              <h1 className="font-bold text-4xl">{`${data.fName} ${data.lName}`}</h1>
            </div>
            <div className="flex flex-col pt-5 text-white">
              <h3 className="font-bold">Today's Reading</h3>
              <h1 className="text-lg font-light">{`${data.summary}`}</h1>
            </div>
            <div className="flex flex-col pt-5 text-white">
              <h3 className="font-bold">Matches</h3>
              <h1 className="text-lg font-light">
                <b className="font-bold">{`${data.fName}`}</b> might find love
                in a <b className="font-bold">{`${data.matches[0]}`}</b> today.
                New friendships may emerge from a{" "}
                <b className="font-bold">{`${data.matches[1]}`}</b> and career
                opportunities may blossom from a{" "}
                <b className="font-bold">{`${data.matches[2]}`}</b>.
              </h1>
            </div>
            <div className="flex flex-col pt-5 text-white w-full items-end">
              <h3 className="text-lg">
                - Made with 💖 by{" "}
                <a href="/" className="font-bold">
                  Ad Astra
                </a>
                .{" "}
                <a href="/signup" className="font-light hover:font-bold">
                  create an account now.
                </a>
              </h3>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LinkViewer;
