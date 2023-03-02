import React from "react";
import { Link } from "react-router-dom";

const InvalidLink = () => {
  return (
    <div className="w-[31.3rem] py-3 rounded-lg shadow-md shadow-black/10 bg-white">
      <div className="text-[#162643] pb-4 pl-4 border-b-[1px] border-b-black/10 text-[21px] font-semibold">
        Invalid link
      </div>
      <div className="text-[17px] pl-4 border-b-[1px] flex items-center  border-b-black/10 pb-5">
        <div className="w-[90%] ">
          <p className="mt-3">The link you use is invalid please try again </p>
        </div>
      </div>
      <div className="flex items-center justify-end mt-3 mr-5 space-x-2">
        <Link
          to="/recover/findaccount"
          className="font-bold text-white bg-[#1A6ED8] rounded-lg p-2 px-4"
        >
          Try again
        </Link>
        <Link
          to="/"
          className="rounded-lg p-2 px-4 font-bold bg-black/10 text-black/60"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default InvalidLink;
