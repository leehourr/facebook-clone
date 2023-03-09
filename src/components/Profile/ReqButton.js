import React from "react";

const ReqButton = ({ onClick, img, name }) => {
  return (
    <>
      <div
        onClick={onClick}
        className="bg-[#1A6ED8] px-5 whitespace-nowrap flex items-center justify-center gap-[0.3rem] cursor-pointer rounded-lg text-white w-1/2 py-[0.45rem] text-center"
      >
        {img}
        <span className="text-[17px]  font-medium ">{name}</span>
      </div>
    </>
  );
};

export default ReqButton;
