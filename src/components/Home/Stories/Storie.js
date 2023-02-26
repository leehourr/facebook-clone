import React from "react";
import { Plus } from "../../../svg";

const Storie = () => {
  return (
    <div className="w-full h-full flex items-center space-x-[0.6rem]">
      <CreateStory />
      <FriendStories />
      <FriendStories />
      <FriendStories />
      <FriendStories />
    </div>
  );
};

export default Storie;

const CreateStory = () => {
  return (
    <div className="cursor-pointer hover:bg-black/5 group active:scale-95  w-[8.1rem] relative text-center shadow-sm shadow-black/10 h-full rounded-xl bg-white">
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

const FriendStories = () => {
  return (
    <div className="cursor-pointer group overflow-hidden hover:bg-black/5 group active:scale-95  w-[8.1rem] relative text-center shadow-sm shadow-black/10 h-full rounded-xl bg-white">
      <img
        src="../../../images/default_pic.png"
        className="h-full w-full group-hover:scale-110 bg-cover bg-center transition-all duration-150 object-cover rounded-t-xl bg-black/20"
        alt="Profile pic"
      />
    </div>
  );
};
