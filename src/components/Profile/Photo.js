import React from "react";

const Photo = () => {
  return (
    <div className="bg-white shadow-sm shadow-black/20 w-full pb-4 pt-3 rounded-lg">
      <div className="flex items-center justify-between pr-2 mb-2">
        <h1 className="text-[20px] pl-2 font-bold">Photos</h1>
        <h2 className="text-[#23a4f4c7] cursor-pointer">See all photos</h2>
      </div>

      <div className=" transition-all duration-100 w-[92%] h-[17.5rem] sm:h-[22rem] md:h-[25rem] imgBreakpoint:h-[29rem] xl:h-[23rem] mx-auto grid grid-cols-3  gap-1 rounded-xl  overflow-hidden  ">
        {image.map((i) => (
          <img
            className="bg-black/20 w-full h-full "
            src={i.src}
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default Photo;

const image = [
  { src: "../../../stories/yoru.jpg" },
  { src: "../../../stories/yoru.jpeg" },
  { src: "../../../stories/jett.jpg" },
  { src: "../../../stories/jett.jpg" },
  { src: "../../../stories/jett.jpg" },
  { src: "../../../stories/jett.jpg" },
  { src: "../../../stories/jett.jpg" },
  { src: "../../../stories/jett3.png" },
  { src: "../../../stories/jett.jpg" },
];
