import React from "react";
import { Link } from "react-router-dom";

const AccountMenu = () => {
  return (
    <div className="shadow-[1px_1px_20px_5px_rgba(0,0,0,0.1)] w-[22.5rem] h-[29.5rem] rounded-lg bg-white pt-3">
      <div className="mb-4 shadow-[2px_1px_10px_3px_rgba(0,0,0,0.15)] rounded-xl w-[90%] h-[116px] mx-auto ">
        <div className="w-[92%] flex items-center mx-auto pt-4">
          <div className="bg-black/50 w-10 h-10 flex items-center justify-center rounded-full">
            p
          </div>
          <span className="font-semibold ml-2">name</span>
        </div>
        <div className="w-[92%] mt-4 mx-auto border-b-[1px] border-b-black/20"></div>
        <div className="w-[97%] flex items-center   justify-between pb-1 px-2 rounded-lg hover:bg-black/[0.05] h-[30%] mt-1 mx-auto">
          <span className=" text-blue-500">See all profiles</span>
          <span className="w-5 h-5 text-xs font-bold rounded-full flex items-center justify-center text-white bg-red-500">
            2
          </span>
        </div>
      </div>
      {settings.slice(0, 3).map((i) => (
        <div className="w-[94%] hover:bg-[#F2F2F2]  flex items-center pl-2 mx-auto h-[3.55rem] rounded-lg">
          <div className="bg-[#dcdcdc] w-9 h-9 rounded-full flex items-center justify-center">
            <i className={`${i.icon}`} />
          </div>
          <span className="pl-2">{i.name}</span>
          <i className="right_icon ml-auto" />
        </div>
      ))}
      {settings.slice(3, 5).map((i) => (
        <div className="w-[94%] hover:bg-[#F2F2F2]  flex items-center pl-2 mx-auto h-[3.55rem] rounded-lg">
          <div className="bg-[#dcdcdc] w-9 h-9 rounded-full flex items-center justify-center">
            <i className={`${i.icon}`} />
          </div>
          <span className="pl-2">{i.name}</span>
        </div>
      ))}
      <footer className="text-[13px] text-[#65676B] flex gap-x-3 flex-wrap child-after: child-hover:underline w-[88%] mx-auto">
        <Link to="/">Privacy</Link>
        <Link to="/">Term</Link>
        <Link to="/">Advertising</Link>
        <Link to="/">Ad Choices</Link>
        <Link to="/">Cookie</Link>
        <Link to="/">Meta © 2023</Link>
      </footer>
    </div>
  );
};

export default AccountMenu;

const settings = [
  {
    icon: "settings_filled_icon",
    name: "Setting & privacy",
  },
  {
    icon: "help_filled_icon",
    name: "Help & support",
  },
  {
    icon: "dark_filled_icon",
    name: "Display & accessibility",
  },
  {
    icon: "feed_filled_icon",
    name: "Give feedback",
  },
  {
    icon: "logout_filled_icon",
    name: "Log Out",
  },
];
