import OnboardingNavBar from "../components/navbar_onboarding";

export default function Home() {
  return (
    <>
      <OnboardingNavBar />
      <div className="mx-2 xl:mx-16 2xl:mx-64 gap-x-4 flex flex-col h-1/3">
        <h1 className="font-bold text-5xl">This page is under construction.</h1>
        <p>
          If you were redirected here then it was either our fault or you typed
          something you shouldn't have. Click <a href="../">here</a> to go back
          to safety.
        </p>
      </div>
    </>
  );
}
