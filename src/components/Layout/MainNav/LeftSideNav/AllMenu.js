import React from "react";
import { Search } from "../../../../svg";
// import { menu, create } from "./menuData";
import { menu, create } from "./menuData";

const AllMenu = () => {
  return (
    <div className="fixed  select-none left-[4rem] h-full top-[3.626rem] w-[38rem] bg-[#F7F8FA]">
      <h1 className="text-[1.5rem] mt-[1rem]  mb-[20px] ml-[17px] font-bold">
        Menu
      </h1>
      <div className="grid grid-cols-[1.7fr,1fr] w-full h-[92vh] overflow-x-hidden overflow-y-scroll scrollbar-thin">
        <div className="bg-white h-full mb-16 shadow-sm shadow-black/40 w-[22.5rem] mx-[17px] rounded-lg">
          <span className="w-full inline-block mt-[12px] ml-[17px] font-[600]">
            Recent
          </span>
          <div className="flex mt-[8px]  mx-[10px]">
            {headerMenu.map((i) => (
              <div
                key={i.txt}
                className="hover:bg-[#F2F2F2] cursor-pointer w-full py-[7px] text-center rounded-lg"
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
          {menu.map((i) => (
            <div
              key={i.title}
              className="w-[95%] border-b-[1px] ml-[8px] border-b-black/20 pb-8"
            >
              <span className="w-full inline-block mt-[12px] font-[600]">
                {i.title}
              </span>
              {i.items.map((x) => (
                <div
                  key={x.name}
                  className="flex w-full cursor-pointer hover:bg-[#F2F2F2]  mt-3 px-[0.4rem] py-1 rounded-lg items-start gap-[15px]"
                >
                  <img
                    className="mt-1"
                    src={`../../left/${x.icon}.png`}
                    alt=""
                  />
                  <div className="w-full">
                    <h2 className="text-[15px]">{x.name}</h2>
                    <p className="text-[13px] text-black/60">{x.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="fixed shadow-sm shadow-black/40 left-[28.5rem] bg-white w-[200px] h-[500px] rounded-lg ">
          <span className="w-full inline-block mt-[12px] ml-[17px] font-[600]">
            Create
          </span>
          <div className="flex mt-[13px] flex-col items-center">
            {create.slice(0, 3).map((i) => {
              return (
                <div
                  key={i.name}
                  className="cursor-pointer flex items-center justify-start w-[90%] gap-2 py-2 pl-[0.5rem] rounded-xl hover:bg-[#F2F2F2] "
                >
                  <div className=" bg-[#dcdcdc] flex items-center justify-center w-9 h-9 rounded-full ">
                    <i className={`${i.icon}`} />
                  </div>
                  <span>{i.name}</span>
                </div>
              );
            })}
            <div className="border-b-[1px] border-b-black/20 w-[85%] my-2"></div>
            {create.slice(4, -1).map((i) => {
              return (
                <div
                  key={i.name}
                  className="cursor-pointer flex items-center justify-start w-[90%] gap-2 py-2 pl-[0.5rem] rounded-xl hover:bg-[#F2F2F2] "
                >
                  <div className=" bg-[#dcdcdc] flex items-center justify-center w-9 h-9 rounded-full ">
                    <i className={`${i.icon}`} />
                  </div>
                  <span>{i.name}</span>
                </div>
              );
            })}
          </div>
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
