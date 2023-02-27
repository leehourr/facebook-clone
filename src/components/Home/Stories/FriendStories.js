import React from "react";

const FriendStories = ({ profile, image, name }) => {
  return (
    <div className=" cursor-pointer group overflow-hidden hover:bg-black/5 group active:scale-95  w-[8.1rem] relative text-center shadow-sm shadow-black/10 h-full rounded-xl bg-white">
      <img
        className="absolute top-4 left-4 ring-4 ring-[#166ADA] z-20 w-9 h-9 rounded-full bg-black/20"
        alt=""
        src={profile}
      />
      <img
        src={image}
        className="h-full z-10 w-full hover:scale-110 bg-cover bg-center transition-all duration-150 object-cover rounded-t-xl bg-black/20"
        alt="Profile pic"
      />
      <span className="absolute text-left font-semibold text-white z-20 bottom-[0.4rem] text-[14px] left-3 mr-3">
        {name}
      </span>
    </div>
  );
};

export default FriendStories;
