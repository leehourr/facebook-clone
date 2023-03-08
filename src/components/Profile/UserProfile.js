import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ArrowDown, Dots } from "../../svg";
import FriendList from "./FriendList";
import Intro from "./Intro";
import Photo from "./Photo";
// import Post from "./Post";
import StickyBox from "react-sticky-box";
import CreatePost from "../Home/Posts/CreatePost";
import Feed from "../Home/Feeds/Feed";
import { useSelector } from "react-redux";
import { useScrollTo } from "../../Hooks/ScrollTo";

const UserProfile = () => {
  const { name } = useParams();
  // const top = useRef();
  const { user, profile } = useSelector((state) => ({ ...state }));
  const [feedContent, setFeedContent] = useState([]);
  // console.log("feedData", feedData);
  useEffect(() => {
    setFeedContent([...profile.userPost]);
  }, [profile]);

  // const refToTop = useRef < HTMLInputElement > null;
  // console.log("profile", name);
  useScrollTo(0, 0);
  // useEffect(() => {
  //   refToTop.current && refToTop.current.scrollIntoView();
  // });
  return (
    <>
      <header
        id={`${name}`}
        className="bg-white scroll-smooth shadow-sm shadow-black/20 h-[25.6rem] mobile:h-[32.3rem] lg:h-[36.2rem]  xl:h-[40.8rem] relative w-[86%] transition-all duration-100 flex flex-col   mobile:w-[96%] xxl:w-full"
      >
        <div className="relative w-full rounded-b-lg transition-all duration-150 bg-black/30 top-0 h-[8.5rem] max-w-[77rem] mx-auto  mobile:h-[15rem] lg:h-[23rem] xl:h-[28rem]">
          <img className="w-full" alt="" />
          <div className="absolute z-10 cursor-pointer p-2 px-3 rounded-lg right-11 xl:right-8 bottom-3 flex items-center gap-2 justify-center bg-white">
            <i className="camera_filled_icon"></i>
            <span className="font-semibold hidden lg2:block">
              Add cover photo
            </span>
          </div>

          <div className="w-full absolute -bottom-[16.3rem] lg:-bottom-[12rem] transition-all duration-100 mx-auto max-w-[77rem] flex flex-col">
            <div className="w-full pb-5 mb-3 border-b-[1px] border-b-black/20 flex flex-col lg2:flex-row items-center lg2:items-end justify-center lg2:justify-between lg2:pr-10 xl:pr-8">
              <div className=" cursor-pointer w-[97%] lg2:w-[50%] flex flex-col lg2:flex-row items-center lg2:items-end justify-center gap-1 lg2:gap-2 ">
                <div className="relative w-[9.4rem] h-[9.4rem] rounded-full ring-4 ring-white bg-black/40 ">
                  <img
                    className="w-full rounded-full"
                    src={user.picture}
                    alt=""
                  />
                  <div className="cursor-pointer absolute flex items-center justify-center right-1 bottom-2 bg-[#D8DADF] w-9 h-9 rounded-full ">
                    <i className="camera_filled_icon"></i>
                  </div>
                </div>

                <div className="flex flex-col items-center lg:items-start justify-center">
                  <h1 className="text-[32px] font-bold">{`${user.first_name} ${user.last_name}`}</h1>
                  <span className="text-[18px] font-bold text-black/50">
                    202 friends
                  </span>
                </div>
              </div>
              <div className="w-[96%]  mobile:w-[16.5rem]  mt-3 flex items-center justify-center gap-2">
                <div className="bg-[#1A6ED8] cursor-pointer rounded-lg text-white w-1/2 py-[0.45rem] text-center">
                  <span className="text-[17px]  font-medium ">
                    + Add to story
                  </span>
                </div>
                <div className="w-1/2 bg-black/10 cursor-pointer flex items-center  justify-center gap-1 rounded-lg text-center py-[0.45rem]">
                  <i className="edit_icon"></i>
                  <span className="text-[17px]">Edit profile</span>
                </div>
              </div>
            </div>

            <div className="w-[96%] mx-auto max-w-[77rem] flex items-center justify-between xl:pr-1 gap-3">
              <div className="w-fit flex  items-center font-semibold text-black/60">
                <div className="b-black/50 h-full flex items-start">
                  <NavLink to="post" className="pf_menus">
                    Posts
                  </NavLink>
                  <NavLink to="about" className="pf_menus">
                    About
                  </NavLink>
                  <NavLink to="about" className="pf_menus hidden mobile2:block">
                    Friends
                  </NavLink>
                  <NavLink to="about" className="pf_menus hidden sm:block">
                    Photos
                  </NavLink>
                  <NavLink
                    to="about"
                    className="pf_menus hidden hideVideo:block"
                  >
                    Videos
                  </NavLink>
                  <NavLink
                    to="about"
                    className="pf_menus w-[6rem] hidden md:block whitespace-nowrap px-3"
                  >
                    Check-ins
                  </NavLink>
                </div>
                <div className="w-[5rem] mr-full z-20 hover:bg-black/10 cursor-pointer py-2 px-3 rounded-lg flex items-center">
                  <button className="w-full">More</button>
                  <div className="pt-1">
                    <ArrowDown color={"rgb(0 0 0 / 0.6)"} />
                  </div>
                </div>
              </div>
              <div className="p-2 cursor-pointer w-[3rem] px-[0.8rem] bg-black/5 rounded-lg">
                <Dots />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="w-[86%] md2:w-[70%] xl:w-[80%] transition-all duration-100 md2:mx-auto flex flex-col xl:flex-row gap-3 mobile:w-[96%]  xxl:max-w-[77rem] mb-10 xxl:mx-auto">
        <div className="xl:w-[40%]">
          <StickyBox offsetTop={70} offsetBottom={40}>
            <div className="profile_section">
              <Intro />
            </div>
            <div className="profile_section">
              <Photo />
            </div>
            <div className="profile_section">
              <FriendList />
            </div>
          </StickyBox>
        </div>
        <div className="flex-grow xl:w-[60%] mx-3 xl:mt-3 xl:mx-auto">
          <CreatePost />
          <Feed feedData={feedContent} profile />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
