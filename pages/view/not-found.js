const NotFound = (props) => {
  return (
    <div className="h-screen w-screen bg-gradient-to-r from-compat_l to-compat_r flex items-center justify-start">
      <div className="mx-16 lg:mx-24 2xl:mx-64 flex flex-col text-white">
        <h3>Oh no, something broke.</h3>
        <h1 className="font-extrabold text-8xl font-number">ERROR 404</h1>
        <p className="font-light text-xl">
          Looks like the shareable link you got was broken. Try to ask for
          another one.
        </p>
        <a href="/" className="text-lg mt-10 hover:font-bold">
          {"< Return to safety"}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
