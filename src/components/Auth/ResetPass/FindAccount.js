import React from "react";
import { Link } from "react-router-dom";

const FindAccount = () => {
  return (
    <div className="w-[31.3rem] py-3 rounded-lg shadow-md shadow-black/10 bg-white">
      <div className="text-[#162643] pb-4 pl-4 border-b-[1px] border-b-black/10 text-[21px] font-semibold">
        Find your account
      </div>
      <div className="text-[17px] pl-4 border-b-[1px]  border-b-black/10 pb-5">
        <span className="block mx-auto my-3 ">
          Please enter your email or mobile number to search for your account.
        </span>
        <input
          className="border-[1px] outline-none p-3 pl-4 rounded-lg border-black/20 w-[95%] mx-auto"
          type="text"
          placeholder="Email or mobile number"
        />
      </div>
      <div className="flex items-center justify-end mt-3 mr-5 space-x-2">
        <Link
          to="/"
          className="rounded-lg p-2 px-4 font-bold bg-black/10 text-black/60"
        >
          Cancel
        </Link>
        <button className="font-bold text-white bg-[#1A6ED8] rounded-lg p-2 px-4">
          Search
        </button>
      </div>
    </div>
  );
};

export default FindAccount;
