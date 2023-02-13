import React from "react";

const Button = ({ onClick, className, type, btnName }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={
        "border-none outline-none bg-[#1876f2]  rounded-[7px] font-[600] text-[14px] text-white flex items-center justify-center gap-[6px]" +
        " " +
        className
      }
    >
      {btnName}
    </button>
  );
};

export default Button;
