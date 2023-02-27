import React from "react";

const Sponsor = ({ img, name, link }) => {
  //cuz we might have multiples sponsor

  return (
    <div className="flex items-center cursor-pointer hover:bg-black/5 p-2 rounded-lg">
      <img
        className="w-[6.5rem] h-[6.5rem] 4xl:w-[8rem]  4xl:h-[7rem] rounded-lg outline-none bg-black/10"
        alt="img"
        src={img}
      />
      <div className="flex flex-col ml-3">
        <h1>{name}</h1>
        <h2 className="text-[#65676B] text-[14px] ">{link}</h2>
      </div>
    </div>
  );
};

export default Sponsor;
