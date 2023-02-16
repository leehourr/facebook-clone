import React from "react";
import { Search } from "../../../svg";
// import { menu, create } from "./menuData";
import { menu } from "./menuData";

const AllMenu = () => {
  return (
    <div className="absolute left-[4rem] h-screen top-[3.626rem] w-[38rem] bg-[#F7F8FA]">
      <h1 className="text-[1.5rem] mt-[1rem]  mb-[20px] ml-[17px] font-bold">
        Menu
      </h1>
      <div className="flex w-full h-full overflow-y-scroll scrollBar">
        <div className="bg-white h-[100vw] shadow-sm shadow-black/40 w-[22.5rem] mx-[17px] rounded-lg">
          <span className="w-full inline-block mt-[12px] ml-[17px] font-[600]">
            Recent
          </span>
          <div className="flex mt-[8px]  mx-[10px]">
            {headerMenu.map((i) => (
              <div
                key={i.txt}
                className="hover:bg-[#F2F2F2] w-full py-[7px] text-center rounded-lg"
              >
                <img
                  src={`../../left/${i.img}.png`}
                  className="mx-auto"
                  alt=""
                />
                <span className="text-[13px] mx-auto">{i.txt}</span>
              </div>
            ))}
          </div>
          <div className="relative w-full mx-auto text-center mt-[15px]">
            <div className="absolute top-3 left-6">
              <Search color="#65676b" />
            </div>
            <input
              className="w-[90%] outline-none bg-[#F6F8F9] pl-8 rounded-3xl py-[0.4rem] pb-3 mx-auto"
              type="text"
              placeholder="Search menu"
            />
          </div>
          <div className="w-full h-full ml-[17px]">
            {menu.map((i) => (
              <div
                key={i.title}
                className="w-[90%] border-b-[1px] border-b-black/20 pb-8"
              >
                <span className="w-full inline-block mt-[12px] font-[600]">
                  {i.title}
                </span>
                {i.items.map((x) => (
                  <div
                    key={x.name}
                    className="flex mt-3 items-start gap-[15px]"
                  >
                    <img
                      className="mt-1"
                      src={`../../left/${x.icon}.png`}
                      alt=""
                    />
                    <div className="w-full">
                      <h2 className="text-[15px]">{x.name}</h2>
                      <p className="text-[13px] text-black/60">
                        {x.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="fixed shadow-sm shadow-black/40 left-[28.5rem] bg-white w-[200px] h-[494px] rounded-lg ">
          asd
        </div>
      </div>
    </div>
  );
};

const headerMenu = [
  {
    img: "watch",
    txt: "Watch",
  },
  {
    img: "gaming",
    txt: "Gaming",
  },
  {
    img: "groups",
    txt: "Groups",
  },
  {
    img: "marketplace",
    txt: "Marketpla...",
  },
];

export default AllMenu;
