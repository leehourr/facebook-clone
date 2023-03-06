import React from "react";

const Photo = () => {
  return (
    <div className="bg-white w-full pb-4 pt-3 rounded-lg">
      <div className="flex items-center justify-between pr-2 mb-2">
        <h1 className="text-[20px] pl-2 font-bold">Photos</h1>
        <h2 className="text-[#23a4f4c7] cursor-pointer">See all photos</h2>
      </div>
      
      {/* images can be map here  */}
      <div className=" pl-2 grid grid-cols-3  gap-y-2 rounded-3xl  overflow-hidden w-full ">
        <img
          className="bg-black/20 w-[6.5rem] h-[6.5rem]"
          src="../../../stories/yoru.jpg"
          alt=""
        />
        <img
          className="bg-black/20 w-[6.5rem] h-[6.5rem]"
          src="../../../stories/yoru.jpeg"
          alt=""
        />
        <img
          className="bg-black/20 w-[6.5rem] h-[6.5rem]"
          src="../../../stories/jett.jpg"
          alt=""
        />
        <img
          className="bg-black/20 w-[6.5rem] h-[6.5rem]"
          src="../../../stories/jett3.png"
          alt=""
        />
        <img
          className="bg-black/20 w-[6.5rem] h-[6.5rem]"
          src="../../../stories/jett3.png"
          alt=""
        />
        <img
          className="bg-black/20 w-[6.5rem] h-[6.5rem]"
          src="../../../stories/jett3.png"
          alt=""
        />
        <img
          className="bg-black/20 w-[6.5rem] h-[6.5rem]"
          src="../../../stories/jett3.png"
          alt=""
        />
        <img
          className="bg-black/20 w-[6.5rem] h-[6.5rem]"
          src="../../../stories/jett3.png"
          alt=""
        />
        <img
          className="bg-black/20 w-[6.5rem] h-[6.5rem]"
          src="../../../stories/jett3.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Photo;
