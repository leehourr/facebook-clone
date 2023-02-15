import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import { Friends, Gaming, HomeActive, Market, Menu, Watch } from "../../../svg";

const LeftNav = () => {
  const [isHovering, setIsHovering] = useState(false);
  const mobileView = useMediaQuery({
    query: "(max-width: 1120px)",
  });

  const mouseHover = () => {
    setIsHovering(true);
  };
  const mouseOut = () => {
    setIsHovering(false);
  };
  return (
    <nav className="absolute bg-white flex flex-col items-center top-[3.5rem] h-full w-[4rem] xl:w-[290px] xl:pl-2 xl:items-start xl:bg-transparent ">
      <div className="my-[15px] xl:w-full pb-[13px] border-b-[1px] border-b-black/20 flex flex-col items-center justify-center text-center  child-hover:bg-[#F2F2F2] child-hover: child:p-2 child:w-full child:mb-1 child:rounded-lg">
        <NavLink
          to="/"
          // onMouseOver={mouseHover}
          // onMouseOut={mouseOut}
          className={({ isActive }) =>
            isActive
              ? "before:h-[2.2rem] before:rounded-r-lg before:border-[2px] before:border-[#056ADB] before:absolute before:top-5 before:left-0 "
              : "xl:w-full"
          }
        >
          <div className="pl-[2px] mx-auto relative">
            <HomeActive />
            {/* <Home color="#000000" /> */}
            {mobileView && isHovering && (
              <span className="absolute rounded-lg w-16 text-white text-[0.9rem] opacity-70 shadow-md shadow-black bg-black p-1 top-0 left-12">
                Home
              </span>
            )}
          </div>
        </NavLink>
        <NavLink
          onMouseOver={mouseHover}
          onMouseOut={mouseOut}
          to="/asd"
          className={({ isActive }) =>
            isActive
              ? "before:h-[2.2rem] before:rounded-r-lg before:border-[2px] before:border-[#056ADB] before:absolute before:left-0 "
              : "xl:w-full"
          }
        >
          <div className="relative">
            <img src="" alt="" className="w-8 h-8 rounded-full" />
            {/* {mobileView && isHovering && (
              <span className="absolute rounded-lg w-20 text-white text-[0.9rem] opacity-70 shadow-md shadow-black bg-black p-1 top-0 left-12">
                Your profile
              </span>
            )} */}
          </div>
        </NavLink>
      </div>

      <NavLink
        to="/asd"
        className={({ isActive }) =>
          isActive
            ? "before:h-[2.2rem] xl:w-full before:rounded-r-lg before:border-[2px] before:border-[#056ADB] before:absolute before:left-0 before:mt-3 "
            : "xl:w-full"
        }
      >
        <div className="xl:w-full xl:pl-2 hover:bg-[#F2F2F2] my-2 p-2 rounded-lg">
          <Watch />
        </div>
      </NavLink>
      <NavLink
        to="/asd"
        className={({ isActive }) =>
          isActive
            ? "before:h-[2.2rem] before:mt-1 xl:w-full before:rounded-r-lg before:border-[2px] before:border-[#056ADB] before:absolute before:left-0 "
            : "xl:w-full"
        }
      >
        <div className="xl:w-full hover:bg-[#F2F2F2] mb-2 p-2 rounded-lg">
          <Market />
        </div>
      </NavLink>
      <NavLink
        to="/asd"
        className={({ isActive }) =>
          isActive
            ? "before:h-[2.2rem] before:mt-1 xl:w-full before:rounded-r-lg before:border-[2px] before:border-[#056ADB] before:absolute before:left-0 "
            : "xl:w-full"
        }
      >
        <div className="xl:w-full hover:bg-[#F2F2F2] mb-2 p-2 rounded-lg">
          <Friends />
        </div>
      </NavLink>
      <NavLink
        to="/asd"
        className={({ isActive }) =>
          isActive
            ? "before:h-[2.2rem] before:mt-1 xl:w-full before:rounded-r-lg before:border-[2px] before:border-[#056ADB] before:absolute before:left-0 "
            : "xl:w-full"
        }
      >
        <div className="xl:w-full hover:bg-[#F2F2F2] mb-2 p-2 rounded-lg">
          <Gaming />
        </div>
      </NavLink>
      <NavLink
        to="/asda"
        className={({ isActive }) =>
          isActive
            ? "before:h-[2.2rem] xl:w-full hover:bg-[#F2F2F2] p-2 pl-0 rounded-lg  before:rounded-r-lg before:border-[2px] before:border-[#056ADB] before:absolute before:left-0 "
            : "xl:w-fullw-full hover:bg-[#F2F2F2] p-2 pl-0 rounded-lg"
        }
      >
        <div className="w-8 ml-[0.4rem] bg-[#dbe1e8] p-2 rounded-full">
          <Menu />
        </div>
      </NavLink>
    </nav>
  );
};

export default LeftNav;
