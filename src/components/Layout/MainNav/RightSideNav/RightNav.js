import React from "react";
import ContactLists from "./ContactLists";
import Sponsor from "./Sponsor";

const RightNav = () => {
  return (
    <div className="hidden lg2:block lg2:w-[18rem] xxl:w-[24rem] bg-transparent h-full fixed top-[3.5rem] right-0 overflow-y-auto scrollbar-thin scrollbar-track-neutral-800 scrollbar-corner-rounded-2xl scrollbar-w-3 scrollbar-thumb-rounded-2xl">
      <h1 className="ml-2 tracking-wide font-semibold mt-7 mb-5 text-[17px] text-[#65676B] ">
        Sponsored
      </h1>
      <Sponsor name="LoremIpsum" link="LoremIpsum.com" />
      <h1 className="ml-2 tracking-wide text-[17px] mt-6 mb-2 font-semibold">
        Your Pages and profiles
      </h1>
      <div className="w-full p-3 pl-4 hover:bg-black/5 rounded-lg flex items-center">
        <img className="bg-black/20 w-9 h-9 " alt="" />
        <p className="ml-3">Page name</p>
      </div>
      <div className="flex w-full space-y-1 ml-3 flex-col justify-center">
        <AccOption title="Switch into Page" />
        <AccOption title="Create promotion" />
      </div>
      <ContactLists />
    </div>
  );
};

export default RightNav;

const AccOption = ({ img, title }) => {
  return (
    <div className="acc_option">
      <img className="page_option" src={img} alt="" />
      <p className="promotion_option">{title}</p>
    </div>
  );
};
