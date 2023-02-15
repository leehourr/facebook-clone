import React from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Friends, Gaming, HomeActive, Market, Menu, Watch } from "../../../svg";

const LeftNav = () => {
  useEffect(() => {
    console.log("asdf");
  }, []);
  return (
    <nav className="absolute bg-white flex flex-col items-center top-[3.5rem] h-full w-[4rem] xl:w-[290px] xl:pl-2 xl:items-start xl:bg-transparent ">
      <div className="my-[15px] xl:w-full pb-[13px] border-b-[1px] border-b-black/20 flex flex-col items-center justify-center text-center  child-hover:bg-[#dee6f4] child:p-2 child:w-full child:mb-1 child:rounded-lg">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "before:h-[2.2rem] before:rounded-r-lg before:border-[2px] before:border-[#056ADB] before:absolute before:left-0 "
              : "xl:w-full"
          }
        >
          <div className=" pl-[2px] mx-auto">
            <HomeActive />
            {/* <Home color="#000000" /> */}
          </div>
        </NavLink>
        <NavLink
          to="/asd"
          className={({ isActive }) =>
            isActive
              ? "before:h-[2.2rem] before:rounded-r-lg before:border-[2px] before:border-[#056ADB] before:absolute before:left-0 "
              : "xl:w-full"
          }
        >
          <img src="" alt="" className="w-8 h-8 rounded-full" />
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
        <div className="xl:w-full xl:pl-2 hover:bg-[#d6dde5] my-2 p-2 rounded-lg">
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
        <div className="xl:w-full hover:bg-[#d6dde5] mb-2 p-2 rounded-lg">
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
        <div className="xl:w-full hover:bg-[#d6dde5] mb-2 p-2 rounded-lg">
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
        <div className="xl:w-full hover:bg-[#d6dde5] mb-2 p-2 rounded-lg">
          <Gaming />
        </div>
      </NavLink>
      <NavLink
        to="/asda"
        className={({ isActive }) =>
          isActive
            ? "before:h-[2.2rem] xl:w-full hover:bg-[#d6dde5] p-2 pl-0 rounded-lg  before:rounded-r-lg before:border-[2px] before:border-[#056ADB] before:absolute before:left-0 "
            : "w-full hover:bg-[#d6dde5] p-2 pl-0 rounded-lg"
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
