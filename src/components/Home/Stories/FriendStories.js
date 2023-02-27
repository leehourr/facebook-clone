import React from "react";

const FriendStories = () => {
  return (
    <div className=" cursor-pointer group overflow-hidden hover:bg-black/5 group active:scale-95  w-[8.1rem] relative text-center shadow-sm shadow-black/10 h-full rounded-xl bg-white">
      <img
        className="absolute top-3 left-3 ring-4 ring-white z-20 w-9 h-9 rounded-full bg-black/20"
        alt=""
      />
      <img
        src="../../../images/default_pic.png"
        className="h-full z-10 w-full hover:scale-110 bg-cover bg-center transition-all duration-150 object-cover rounded-t-xl bg-black/20"
        alt="Profile pic"
      />
      <span className="absolute z-20 bottom-[0.4rem] text-[14px] left-3">
        Name
      </span>
    </div>
  );
};

export default FriendStories;
