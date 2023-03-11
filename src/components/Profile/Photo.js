import React from "react";
// import { useSelector } from "react-redux";

const Photo = ({ photos }) => {
  // console.log("photo", photos);
  return (
    <div className="bg-white shadow-sm shadow-black/20 w-full pb-4 pt-3 rounded-lg">
      <div className="flex items-center justify-between pr-2 mb-2">
        <h1 className="text-[20px] pl-2 font-bold">Photos</h1>
        <h2 className="text-[#1A6ED8] cursor-pointer">See all photos</h2>
      </div>

      <div
        className={`transition-all duration-100 w-[92%] ${
          photos.length > 9
            ? "h-[17.5rem] sm:h-[22rem] md:h-[25rem] imgBreakpoint:h-[29rem] xl:h-[23rem]"
            : photos.length === 1
            ? "h-[7rem] sm:h-[8.5rem] md:h-[10.5rem] imgBreakpoint:h-[10.5rem] xxl:h-[9rem]"
            : ""
        } mx-auto grid grid-cols-3 ${
          photos.length === 1
            ? "grid-rows-1"
            : photos.length === 2
            ? "grid-rows-2"
            : "grid-rows-3"
        }  gap-1 rounded-xl  overflow-hidden  `}
      >
        {photos.slice(0, 9).map((x, i) => (
          <img
            key={i}
            className="bg-black/20 w-full h-full "
            src={x.src}
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default Photo;
