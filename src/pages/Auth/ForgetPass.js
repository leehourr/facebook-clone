import React from "react";
import { Link } from "react-router-dom";
import ChangePass from "../../components/Auth/ResetPass";
import Footer from "../../components/Ui/Footer";

const ForgetPass = () => {
  return (
    <div className="w-full h-screen bg-white">
      <header className="w-full h-14 bg-white flex items-center justify-between">
        <img className="w-36" src="../../icons/facebook.svg" alt="" />
        <Link
          to="/"
          className="bg-[#1A6ED8] text-[17px] font-semibold p-2 px-3 rounded-lg text-white mr-24"
        >
          Log in
        </Link>
      </header>
      <div className="py-[5rem] bg-[#F0F2F5] flex items-center justify-center">
        <ChangePass />
      </div>
      <footer className="w-full h-[30.83rem] pt-40 bg-white">
        <Footer />
      </footer>
    </div>
  );
};

export default ForgetPass;
