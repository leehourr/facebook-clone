import React from "react";
import { Plus } from "../../../svg";

const CreateStory = () => {
  return (
    <div className=" cursor-pointer hover:bg-black/5 group active:scale-95  w-[8.1rem] relative text-center shadow-sm shadow-black/10 h-full rounded-xl bg-white">
      <img
        src="../../../images/default_pic.png"
        className="h-[11.5rem] w-full object-cover rounded-t-xl bg-black/20"
        alt="Profile pic"
      />
      <div className="absolute ring-4 ring-white ring-offset-0 ring- outline-none bottom-[1.9rem] group-hover:ring-black/5 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-[#166ADA]">
        <Plus color="white" />
      </div>
    </div>
  );
};

export default CreateStory;
