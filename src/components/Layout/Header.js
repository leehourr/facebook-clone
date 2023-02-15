import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Search,
  Watch,
} from "../../svg";
export default function Header() {
  const color = "#65676b";
  return (
    <header className="fixed top-0 h-14 z-50  bg-white w-full shadow-sm py-[5px] px-[1rem] shadow-black/10 flex items-center justify-between">
      <Link to="/" className="header_logo">
        <div className="w-[40px] h-[40px] rounded-[50%] cursor-pointer flex items-center justify-center">
          <Logo />
        </div>
      </Link>
      <div className="flex items-center w-[42.25rem] gap-[8px] rounded-3xl bg-[#f0f2f5] py-[10px] pr-[32px] pl-[10px] search1">
        <Search color={color} />
        <input
          type="text"
          placeholder="Search Facebook"
          className="hide_input pl-1 rounded-lg outline-none border-none bg-transparent text-[15px] placeholder:translate-y-[-1px]"
        />
      </div>
      <div>profile</div>

      {/* <nav className="flex items-center gap-[14px] translate-x-[3px] ">
        <li className="relative flex items-center justify-center w-[125px] h-[50px] rounded-[10px] cursor-pointer translate-x-[-2px] active:border-b-[3px]border-b-[#1876f2] ">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "border-b-[#1876f2]" : "")}
            end
          >
            <HomeActive />
          </NavLink>
        </li>
        <NavLink
          to="/"
          className="relative flex items-center justify-center w-[125px] h-[50px] rounded-[10px] cursor-pointer translate-x-[-2px]"
        >
          <Friends color={color} />
        </NavLink>
        <NavLink
          to="/"
          className="relative flex items-center justify-center w-[125px] h-[50px] rounded-[10px] cursor-pointer translate-x-[-2px] hover1"
        >
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </NavLink>
        <NavLink
          to="/"
          className="relative flex items-center justify-center w-[125px] h-[50px] rounded-[10px] cursor-pointer translate-x-[-2px] hover1"
        >
          <Market color={color} />
        </NavLink>
        <NavLink
          to="/"
          className="relative flex items-center justify-center w-[125px] h-[50px] rounded-[10px] cursor-pointer translate-x-[-2px] hover1"
        >
          <Gaming color={color} />
        </NavLink>
      </nav> */}
    </header>
  );
}
