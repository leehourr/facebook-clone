import React from "react";

const FriendList = () => {
  return (
    <div className="bg-white w-full pb-4 pt-3 rounded-lg">
      <div className="flex items-center justify-between pr-2 mb-2">
        <h1 className="text-[20px] pl-2 font-bold">Friends</h1>
        <h2 className="text-[#23a4f4c7] cursor-pointer">See all friends</h2>
      </div>

      {/* images can be map here  */}
      <div className=" pl-2 grid grid-cols-3  gap-y-2 rounded-3xl  overflow-hidden w-full ">
        <img
          className="bg-black/20 w-[6.5rem] h-[6.5rem]"
          src="../../../stories/jay.jpg"
          alt=""
        />
        <img
          className="bg-black/20 w-[6.5rem] h-[6.5rem]"
          src="../../../stories/owen.jpg"
          alt=""
        />
        <img
          className="bg-black/20 object-cover w-[6.5rem] h-[6.5rem]"
          src="../../../stories/monster.jpg"
          alt=""
        />
        <img
          className="bg-black/20 w-[6.5rem] h-[6.5rem]"
          src="../../../stories/mia.jpg"
          alt=""
        />
        <img
          className="bg-black/20 w-[6.5rem] h-[6.5rem]"
          src="../../../stories/cb.jpg"
          alt=""
        />
        <img
          className="bg-black/20 w-[6.5rem] h-[6.5rem]"
          src="../../../stories/2b.jpg"
          alt=""
        />
        <img
          className="bg-black/20 object-top object-cover w-[6.5rem] h-[6.5rem]"
          src="../../../stories/joker.jpg"
          alt=""
        />
        <img
          className="bg-black/20  w-[6.5rem] h-[6.5rem]"
          src="../../../stories/cat.jpg"
          alt=""
        />
        <img
          className="bg-black/20 w-[6.5rem] h-[6.5rem]"
          src="../../../stories/cat.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default FriendList;
