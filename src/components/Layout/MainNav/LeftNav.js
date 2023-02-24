import React, { useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import { HomeActive, Menu } from "../../../svg";
import AllMenu from "./AllMenu";
// import { modalActions } from "../../../store/modal-slice";
// import { useDispatch } from "react-redux";
import useClickOutside from "../../../helpers/clickOutside";

const LeftNav = () => {
  // const modal = useSelector((state) => state.modal.currentModal);

  const menu = useRef(null);

  // useClickOutside(menu, () => {
  //   setIsMenuOpen(false);
  // });

  // const closeMenu = () => {
  //   setIsMenuOpen(false);
  // };
  // const toggleMenu = () => {
  //   setIsMenuOpen((prev) => !prev);
  // };
  return (
    <nav className="w-[4rem] h-full fixed top-[3.5rem] bg-white">
      <ul className="w-full">
        {leftNavigation.slice(0, 2).map((i) => (
          <Navlink
            key={i.name}
            href={i.to}
            name={i.name}
            icon={i.icon}
            hoverText={i.hoverState}
          />
        ))}
        <div className="w-[80%] mx-auto border-b-2 border-b-black/10 "></div>
        {leftNavigation.slice(2, 7).map((i) => (
          <Navlink
            key={i.name}
            href={i.to}
            name={i.name}
            icon={i.icon}
            hoverText={i.hoverState}
          />
        ))}
        <div className="w-[80%] mx-auto border-b-2 border-b-black/10 "></div>
      </ul>
      {/* <nav
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
            className={({ isActive }) =>
              isActive && !isMenuOpen
                ? "before:h-[2.2rem] before:rounded-r-lg before:border-[2px] before:border-[#056ADB] before:absolute before:top-5 before:left-0 "
                : "xl:w-full"
            }
            end
          >
            <div className="pl-[2px] mx-auto relative">
              <HomeActive />
\              {mobileView && isHovering && (
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
        <NavLink
          ref={menu}
          className={`
         ${
           isMenuOpen
             ? "before:h-[2.2rem] xl:w-full hover:bg-[#F2F2F2] p-2 pl-0 rounded-lg  before:rounded-r-lg before:border-[2px] before:border-[#056ADB] before:absolute before:left-0 "
             : "xl:w-full hover:bg-[#E4E6E9] p-2 pl-0 rounded-lg"
         }`}
        >
          <div
            onClick={toggleMenu}
          >
            <div
              className="w-8 ml-[0.4rem] bg-[#dbe1e8] p-2 rounded-full"
            >
              <Menu />
            </div>
          </div>
          {isMenuOpen && <AllMenu />}
        </NavLink>
        <div className="w-[80%] xl:w-full mt-2 border-b-[1px] border-b-black/20"></div>
      </nav> */}
    </nav>
  );
};

export default LeftNav;

const Navlink = ({ href, name, icon, hoverText }) => {
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
  const MenuComponent = typeof icon === "object" && icon.type.name === "Menu";

  const mouseHover = (i) => {
    // console.log(i);
    setIsHovering(true);
  };
  const mouseOut = () => {
    setIsHovering(false);
  };
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <li key={href} className="my-2 relative">
      <NavLink
        to={href}
        // onClick={closeMenu}
        className={({ isActive }) =>
          isActive && !isMenuOpen && MenuComponent
            ? "before:h-[2.75rem] before:rounded-r-lg before:border-[2px] before:border-[#056ADB] before:absolute before:top-0 before:left-0 "
            : "xl:w-full"
        }
        end
      >
        <div
          onClick={MenuComponent && toggleMenu}
          onMouseOver={mouseHover}
          onMouseOut={mouseOut}
          className="hover:bg-black/20 relative p-2 flex items-center justify-center w-[80%] text-center mx-auto rounded-lg "
        >
          {typeof icon === "object" ? (
            MenuComponent ? (
              <div className="w-8 flex items-center justify-center mx-auto bg-[#dbe1e8] p-2 rounded-full">
                <Menu />
              </div>
            ) : (
              icon
            )
          ) : (
            <img src={`${icon}`} alt="" />
          )}
          {mobileView && isHovering && (
            <span className="absolute w-20 rounded-lg text-white text-[0.9rem] opacity-60 shadow-md shadow-black bg-black top-1//2 left-[3.55rem]">
              {hoverText}
            </span>
          )}
        </div>
        {MenuComponent && isMenuOpen && <AllMenu />}
      </NavLink>
    </li>
  );
};

const leftNavigation = [
  { name: "Home", to: "/", icon: <HomeActive />, hoverState: "Home" },
  {
    name: "Profile",
    to: "/pr0file",
    icon: <HomeActive />,
    hoverState: "Your profile",
  },
  {
    name: "watch",
    to: "/asfd",
    icon: "../../left/watch.png",
    hoverState: "Watch",
  },
  {
    name: "Marketplace",
    to: "/asdfsa",
    icon: "../../left/marketplace.png",
    hoverState: "Marketplace",
  },
  {
    name: "Group",
    to: "/asdfsa",
    icon: "../../left/groups.png",
    hoverState: "Group",
  },
  {
    name: "Gaming",
    to: "/asdfsa",
    icon: "../../left/gaming.png",
    hoverState: "Gaming",
  },
  {
    name: "See all",
    icon: <Menu />,
    hoverState: "See all",
  },
];
