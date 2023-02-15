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
    <header>
      <div className="flex items-start gap-[10px] py-[5px] px-[1rem]">
        <Link to="/" className="header_logo">
          <div className="w-[40px] h-[40px] rounded-[50%] cursor-pointer flex items-center justify-center">
            <Logo />
          </div>
        </Link>
        <div className="flex items-center gap-[8px] bg-[#f0f2f5] py-[10px] pr-[32px] pl-[10px] search1">
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input outline-none border-none bg-transparent text-[15px] placeholder:translate-y-[-1px]"
          />
        </div>
      </div>
      <div className="flex items-center gap-[14px] translate-x-[3px] ">
        <Link
          to="/"
          className="relative flex items-center justify-center w-[125px] h-[50px] rounded-[10px] cursor-pointer translate-x-[-2px] active:border-b-[3px] active:border-b-[#1876f2] "
        >
          <HomeActive />
        </Link>
        <Link
          to="/"
          className="relative flex items-center justify-center w-[125px] h-[50px] rounded-[10px] cursor-pointer translate-x-[-2px] hover1"
        >
          <Friends color={color} />
        </Link>
        <Link
          to="/"
          className="relative flex items-center justify-center w-[125px] h-[50px] rounded-[10px] cursor-pointer translate-x-[-2px] hover1"
        >
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link
          to="/"
          className="relative flex items-center justify-center w-[125px] h-[50px] rounded-[10px] cursor-pointer translate-x-[-2px] hover1"
        >
          <Market color={color} />
        </Link>
        <Link
          to="/"
          className="relative flex items-center justify-center w-[125px] h-[50px] rounded-[10px] cursor-pointer translate-x-[-2px] hover1"
        >
          <Gaming color={color} />
        </Link>
      </div>
      <div className="header_right"></div>
    </header>
  );
}
