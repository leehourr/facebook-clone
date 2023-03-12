import React from "react";
import { useSelector } from "react-redux";
import { Plus } from "../../../svg";

const CreateStory = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className=" cursor-pointer hover:bg-black/5 group active:scale-95  w-[9rem] relative text-center shadow-sm shadow-black/20 h-full rounded-xl bg-white dark:bg-[#242526]">
      <img
        src={user.data?.picture}
        className="h-[9rem] 3.5xl:h-[11.5rem] w-full object-cover rounded-t-xl bg-black/20"
        alt="Profile pic"
      />
      <div className="absolute ring-4 ring-white dark:ring-[#242526] ring-offset-0 ring- outline-none bottom-[1.9rem] group-hover:ring-black/5 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-[#166ADA]">
        <Plus color="white" />
      </div>
    </div>
  );
};

export default CreateStory;
