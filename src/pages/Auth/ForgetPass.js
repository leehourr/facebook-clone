import React from "react";
import { Link } from "react-router-dom";
import ResetPassword from "../../components/Auth/ResetPassword";
import Button from "../../components/Ui/Button";
import Footer from "../../components/Ui/Footer";

const ForgetPass = () => {
  return (
    <div className="w-full h-screen ">
      <header className="w-full h-14 bg-white flex items-center justify-between">
        <img className="w-36" src="../../icons/facebook.svg" alt="" />
        <Link
          to="/"
          className="bg-[#1A6ED8] text-[17px] font-semibold p-2 px-3 rounded-lg text-white mr-24"
        >
          Log in
        </Link>
      </header>
      <div className="h-[33.3rem] flex items-center justify-center">
        <ResetPassword />
      </div>
      <footer className="h-[38.2%] w-full p-[1.5rem] bg-white">
        <Footer />
      </footer>
    </div>
  );
};

export default ForgetPass;
