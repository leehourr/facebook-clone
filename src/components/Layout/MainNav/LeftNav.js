import React, { useState, useRef, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import { HomeActive, Menu } from "../../../svg";
import AllMenu from "./AllMenu";
// import { modalActions } from "../../../store/modal-slice";
// import { useDispatch } from "react-redux";
import useClickOutside from "../../../helpers/clickOutside";

const LeftNav = () => {
  // const modal = useSelector((state) => state.modal.currentModal);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    console.log("menu opend");
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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
            isMenuOpen={isMenuOpen}
          />
        ))}
        <div className="w-[50%] mx-auto border-b-[1px] border-b-black/10 "></div>
        {leftNavigation.slice(2, 7).map((i) => (
          <Navlink
            key={i.name}
            href={i.to}
            name={i.name}
            icon={i.icon}
            hoverText={i.hoverState}
            isMenuOpen={isMenuOpen}
          />
        ))}
        <SeeAllButton openMenu={openMenu} closeMenu={closeMenu} />
        <div className="w-[50%] mx-auto border-b-2 border-b-black/10 "></div>
      </ul>
    </nav>
  );
};

export default LeftNav;

const Navlink = ({ href, name, icon, hoverText, isMenuOpen }) => {
  const [isHovering, setIsHovering] = useState(false);

  const mobileView = useMediaQuery({
    query: "(max-width: 1120px)",
  });
  const desktopView = useMediaQuery({
    query: "(min-width: 1120px)",
  });

  const mouseHover = (i) => {
    // console.log(i);
    setIsHovering(true);
  };
  const mouseOut = () => {
    setIsHovering(false);
  };

  return (
    <li className="my-2 relative">
      <NavLink
        to={href}
        // onClick={closeMenu}
        className={({ isActive }) =>
          isActive && !isMenuOpen
            ? "before:h-[2.75rem] before:rounded-r-lg before:border-[2px] before:border-[#056ADB] before:absolute before:top-0 before:left-0 "
            : "xl:w-full"
        }
        end
      >
        <div
          onMouseOver={mouseHover}
          onMouseOut={mouseOut}
          className="hover:bg-black/20 relative p-2 flex items-center justify-center w-[80%] text-center mx-auto rounded-lg "
        >
          {typeof icon === "object" ? icon : <img src={`${icon}`} alt="" />}
          {mobileView && isHovering && (
            <span className="absolute z-40 px-4 py-1 rounded-lg text-white text-[0.9rem] opacity-70 shadow-md shadow-black bg-black top-[20%] left-[3.55rem] whitespace-nowrap">
              {hoverText}
            </span>
          )}
        </div>
        {/* {MenuComponent && isMenuOpen && <AllMenu />} */}
      </NavLink>
    </li>
  );
};

const SeeAllButton = ({ openMenu, closeMenu }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menu = useRef(null);

  const mobileView = useMediaQuery({
    query: "(max-width: 1120px)",
  });
  // const desktopView = useMediaQuery({
  //   query: "(min-width: 1120px)",
  // });

  useClickOutside(
    menu,
    useCallback(() => {
      console.log("click in helper");
      closeMenu();
      setIsMenuOpen(false);
    }, [closeMenu])
  );

  const mouseHover = (i) => {
    // console.log(i);
    setIsHovering(true);
  };
  const mouseOut = () => {
    setIsHovering(false);
  };
  const toggleMenu = () => {
    openMenu();
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <li className="my-2 text-center relative">
      <button
        ref={menu}
        // onClick={closeMenu}
        className={
          isMenuOpen
            ? "before:h-[2.75rem] before:rounded-r-lg before:border-[2px] before:border-[#056ADB] before:absolute before:top-0 before:left-0 "
            : "xl:w-full"
        }
      >
        <div
          onClick={toggleMenu}
          onMouseOver={mouseHover}
          onMouseOut={mouseOut}
          className="hover:bg-black/20 relative p-2 flex items-center justify-center w-full text-center mx-auto rounded-lg "
        >
          <div className="w-8 flex items-center justify-center mx-auto bg-[#dbe1e8] p-2 rounded-full">
            <Menu />
          </div>
          {mobileView && isHovering && (
            <span className="absolute z-40 px-4 py-1 rounded-lg text-white text-[0.9rem] opacity-70 shadow-md shadow-black bg-black top-[20%] left-[3.55rem] whitespace-nowrap">
              See all
            </span>
          )}
        </div>
        {isMenuOpen && <AllMenu />}
      </button>
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
];
