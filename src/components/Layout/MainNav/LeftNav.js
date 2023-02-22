import React, { useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import { HomeActive, Menu } from "../../../svg";
import AllMenu from "./AllMenu";
import { modalActions } from "../../../store/modal-slice";
import { useDispatch } from "react-redux";
import useClickOutside from "../../../helpers/clickOutside";

const LeftNav = () => {
  // const modal = useSelector((state) => state.modal.currentModal);
  const [isHovering, setIsHovering] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menu = useRef(null);
  const mobileView = useMediaQuery({
    query: "(max-width: 1120px)",
  });
  const desktopView = useMediaQuery({
    query: "(min-width: 1120px)",
  });

  useClickOutside(menu, () => {
    setIsMenuOpen(false);
  });

  const mouseHover = () => {
    setIsHovering(true);
  };
  const mouseOut = () => {
    setIsHovering(false);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <>
      <nav
        className={`${
          isMenuOpen &&
          desktopView &&
          "w-[4rem] z-50 pl-2 flex items-center bg-white"
        }
        ${mobileView && "w-[4rem] bg-white"}
        ${
          !isMenuOpen &&
          desktopView &&
          "w-[290px] bg-transparent pl-2 items-start"
        } fixed flex flex-col items-center top-[3.5rem] h-full`}
      >
        <div
          className={` mt-[15px] mb-[10px] flex flex-col items-center ${
            !isMenuOpen && desktopView && "items-start w-full"
          } pb-[13px] border-b-[1px] border-b-black/20  justify-center  child-hover:bg-[#E4E6E9] child-hover: child:p-2 child:w-full child:mb-1 child:rounded-lg"`}
        >
          <NavLink
            to="/"
            onClick={closeMenu}
            //onClick={}
            // onMouseOver={mouseHover}
            // onMouseOut={mouseOut}
            className={({ isActive }) =>
              isActive && !isMenuOpen
                ? "before:h-[2.2rem] before:rounded-r-lg before:border-[2px] before:border-[#056ADB] before:absolute before:top-5 before:left-0 "
                : "xl:w-full"
            }
            end
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
            onClick={closeMenu}
            onMouseOver={mouseHover}
            onMouseOut={mouseOut}
            to="/asd"
            className={({ isActive }) =>
              isActive && !isMenuOpen
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
          onClick={closeMenu}
          to="/asd"
          className={({ isActive }) =>
            isActive && !isMenuOpen
              ? "before:h-[2.2rem] xl:w-full before:rounded-r-lg before:border-[2px] before:border-[#056ADB] before:absolute before:left-0 before:mt-3 "
              : "xl:w-full"
          }
        >
          <div className="xl:w-full xl:pl-2 hover:bg-[#E4E6E9] my-2 p-2 rounded-lg">
            <img src={"../../left/watch.png"} className="w-8" alt="" />
          </div>
        </NavLink>
        <NavLink
          onClick={closeMenu}
          to="/asd"
          className={({ isActive }) =>
            isActive && !isMenuOpen
              ? "before:h-[2.2rem] before:mt-1 xl:w-full before:rounded-r-lg before:border-[2px] before:border-[#056ADB] before:absolute before:left-0 "
              : "xl:w-full"
          }
        >
          <div className="xl:w-full hover:bg-[#E4E6E9] mb-2 p-2 rounded-lg">
            <img src={"../../left/marketplace.png"} className="w-8" alt="" />
          </div>
        </NavLink>
        <NavLink
          onClick={closeMenu}
          to="/asd"
          className={({ isActive }) =>
            isActive && !isMenuOpen
              ? "before:h-[2.2rem] before:mt-1 xl:w-full before:rounded-r-lg before:border-[2px] before:border-[#056ADB] before:absolute before:left-0 "
              : "xl:w-full"
          }
        >
          <div className="xl:w-full hover:bg-[#E4E6E9] mb-2 p-2 rounded-lg">
            <img src={"../../left/groups.png"} className="w-8" alt="" />
          </div>
        </NavLink>
        <NavLink
          onClick={closeMenu}
          to="/asd"
          className={({ isActive }) =>
            isActive && !isMenuOpen
              ? "before:h-[2.2rem] before:mt-1 xl:w-full before:rounded-r-lg before:border-[2px] before:border-[#056ADB] before:absolute before:left-0 "
              : "xl:w-full"
          }
        >
          <div className="xl:w-full hover:bg-[#E4E6E9] mb-2 p-2 rounded-lg">
            <img src={"../../left/gaming.png"} className="w-8" alt="" />
          </div>
        </NavLink>
        <div ref={menu}>
          <NavLink
            // to="/asd"
            onClick={toggleMenu}
            className={`
         ${
           isMenuOpen
             ? "before:h-[2.2rem] xl:w-full hover:bg-[#F2F2F2] p-2 pl-0 rounded-lg  before:rounded-r-lg before:border-[2px] before:border-[#056ADB] before:absolute before:left-0 "
             : "xl:w-full hover:bg-[#E4E6E9] p-2 pl-0 rounded-lg"
         }`}
          >
            <div
              //onClick={toggleMenu}
              className="w-8 ml-[0.4rem] bg-[#dbe1e8] p-2 rounded-full"
            >
              <Menu />
            </div>
          </NavLink>
          {isMenuOpen && <AllMenu />}
        </div>
      </nav>
    </>
  );
};

export default LeftNav;
