import React from "react";

const Button = ({ onClick, className, type, btnName }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={
        " border-none outline-none flex  items-center justify-center bg-[#1876f2] rounded-[7px]  text-white " +
        className
      }
    >
     <p className="m-0">{btnName}</p>
    </button>
  );
};

export default Button;
