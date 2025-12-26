import React from "react";
import Menubar from "./components/Menubar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserSyncHandler from "./components/UserSyncHandler";
import Result from "./pages/Result";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

const App = () => {
  return (
    <>
      <UserSyncHandler />
      <Menubar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/result"
          element={
            <>
              <SignedIn>
                <Result />
              </SignedIn>

              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
