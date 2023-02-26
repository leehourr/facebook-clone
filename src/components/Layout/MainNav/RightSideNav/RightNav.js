import React from "react";

const RightNav = () => {
  return (
    <div className="w-[20rem] bg-transparent h-full fixed top-[3.5rem] right-0 overflow-y-auto">
      <h1 className="ml-2 font-semibold mt-7 mb-5 text-[17px] text-[#65676B] ">
        Sponsored
      </h1>
      <div className="flex items-center cursor-pointer hover:bg-black/5 p-2 rounded-lg">
        <img
          className="w-[8rem] h-[7rem] rounded-lg outline-none bg-black/10"
          alt="img"
        />
        <div className="flex flex-col ml-3">
          <h1>LoremIpsum.com</h1>
          <h2 className="text-[#65676B] text-[14px] ">LoremIpsum.com</h2>
        </div>
      </div>
      <h1 className="ml-2 text-[17px] mt-6 mb-4 font-semibold">
        Your Pages and profiles
      </h1>
      <div className="w-full p-3 pl-4 hover:bg-black/5 rounded-lg flex items-center">
        <img className="bg-black/20 w-9 h-9 " alt="" />
        <p className="ml-3">Page name</p>
      </div>
      <div className="flex w-[90%] space-y-1 ml-3 flex-col justify-center">
        <div className="acc_option">
          <img className="page_option" alt="" />
          <p className="promotion_option">Switch into Page</p>
        </div>
        <div className="acc_option">
          <img className="page_option" alt="" />
          <p className="promotion_option">Create promotion</p>
        </div>
      </div>
    </div>
  );
};

export default RightNav;
