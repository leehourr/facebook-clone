import React from "react";
import { NavLink } from "react-router-dom";
import { ArrowDown, Dots } from "../../svg";
import FriendList from "./FriendList";
import Intro from "./Intro";
import Photo from "./Photo";

const UserProfile = () => {
  return (
    <div className="w-[86%] mb-10">
      <header className="bg-white h-[26.6rem]">
        <div className="relative w-full bg-black/30 top-0 h-[8.5rem]">
          <img className="w-full" alt="" />
          <div className="absolute z-10 cursor-pointer p-2 px-3 rounded-lg right-11 bottom-3 flex items-center justify-center bg-white">
            <i className="camera_filled_icon"></i>
          </div>
        </div>

        <div className="w-full -translate-y-[4.4rem] flex flex-col items-center justify-center">
          <div className="relative ring-4 ring-white w-36 h-36 bg-black/40  rounded-full">
            <img className="w-full rounded-lg" alt="" />
            <div className="cursor-pointer absolute flex items-center justify-center right-1 bottom-2 bg-[#D8DADF] w-9 h-9 rounded-full ">
              <i className="camera_filled_icon"></i>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-[32px] font-bold">Lee Hour</h1>
            <span className="text-[18px] font-bold text-black/50">
              202 friends
            </span>
          </div>
          <div className="w-[96%] border-b-[1px] border-b-black/20 pb-5 mt-3 flex items-center justify-center gap-2">
            <div className="bg-[#1A6ED8] rounded-lg text-white w-1/2 py-[0.45rem] text-center">
              <span className="text-[17px] font-medium ">+ Add to story</span>
            </div>
            <div className="w-1/2 bg-black/10 flex items-center  justify-center gap-1 rounded-lg text-center py-[0.45rem]">
              <i className="edit_icon"></i>
              <span className="text-[17px]">Edit profile</span>
            </div>
          </div>
          <div className="w-[96%] mt-3 flex items-center justify-between">
            <div className="w-[55%] ml-3 font-semibold text-black/60   flex items-center">
              <NavLink to="post" className="w-1/3">
                Posts
              </NavLink>
              <NavLink to="about" className="w-1/3">
                About
              </NavLink>
              <div className="w-1/3 flex items-center">
                <button className="w-full">More</button>
                <div className="pt-1">
                  <ArrowDown color={"rgb(0 0 0 / 0.6)"} />
                </div>
              </div>
            </div>
            <div className="p-2 cursor-pointer px-[0.8rem] bg-black/5 rounded-lg">
              <Dots />
            </div>
          </div>
        </div>
      </header>
      <div className="profile_section">
        <Intro />
      </div>
      <div className="profile_section">
        <Photo />
      </div>
      <div className="profile_section">
        <FriendList />
      </div>
    </div>
  );
};

export default UserProfile;
