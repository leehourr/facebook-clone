import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Logo, Messenger, Notifications, Search } from "../../../svg";
import arrowDown from "../../../assets/arrowDown.png";
import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import SearchInput from "./SearchInput";
import AccountMenu from "./AccountMenu";
import useClickOutside from "../../../helpers/clickOutside";

const Navigation = () => {
  // const dispatch = useDispatch();
  // const [modal, setModal] = useState(false);
  // const currentModal = useSelector((state) => state.modal.currentModal);
  const [searchBar, setSearchBar] = useState(false);
  const { user } = useSelector((user) => ({ ...user }));
  const [showFbSearch, setShowFbSearch] = useState(false);
  const [openAccMenu, setOpenAccMenu] = useState(false);

  const accMenu = useRef(null);
  const searchElement = useRef(null);

  useClickOutside(searchElement, () => {
    setSearchBar(false);
    setShowFbSearch(false);
  });
  useClickOutside(accMenu, () => {
    console.log("clicked");
    setOpenAccMenu(false);
  });

  const desktopView = useMediaQuery({
    query: "(min-width: 880px)",
  });
  const desktopView2 = useMediaQuery({
    query: "(max-width: 539px)",
  });

  const openSearch = () => {
    setShowFbSearch(true);
    setSearchBar(true);
  };

  const openMenu = (e) => {
    setOpenAccMenu((prev) => !prev);
  };

  const openSearchBar = () => {
    setSearchBar(true);
  };

  const breakpoint1 = !showFbSearch && desktopView2;
  const breakpoint2 = (!showFbSearch || showFbSearch) && !desktopView2;
  return (
    <header className="fixed z-40 top-0 h-14 w-full bg-white shadow-sm py-[5px] px-[1rem] shadow-black/10 flex items-center justify-between">
      <Link to="/" className="header_logo">
        <div className="w-[40px] h-[40px] rounded-[50%] cursor-pointer flex items-center justify-center">
          <Logo />
        </div>
      </Link>
      <div
        ref={searchElement}
        className={`relative flex items-center ${
          desktopView ? "w-[526px] xl:w-[42.25rem]" : "w-[42.25rem]"
        } pl-[0.4rem] rounded-3xl bg-[#f0f2f5] `}
      >
        {!desktopView ? (
          <div
            //aria-disabled={showFbSearch}
            onClick={openSearch}
            className={` absolute h-10 ${
              showFbSearch
                ? "w-full sm:w-[312px] rounded-3xl pl-4 active:cursor-default"
                : "w-10 rounded-[50%] hover:bg-black/20 cursor-pointer"
            } flex items-center justify-center  bg-[#e4e6eb]`}
          >
            <Search color="#65676b" />
            {showFbSearch && (
              <SearchInput
                showFbSearch={searchBar}
                // onFocus={openSearchBar}
                //  onBlurCapture={closeSeachBar}
                className="py-[10px] pr-[32px] pl-2 outline-none w-full rounded-3xl  border-none bg-transparent text-[15px]"
              />
            )}
          </div>
        ) : (
          <>
            <div className="absolute left-2">
              <Search color="#65676b" />
            </div>
            <SearchInput
              showFbSearch={searchBar}
              onFocus={openSearchBar}
              // onBlurCapture={closeSeachBar}
              className="py-[10px] w-full pr-[32px] pl-[2rem] outline-none rounded-3xl hover:bg-white/40 border-none bg-transparent text-[15px]"
            />
          </>
        )}
      </div>
      {(breakpoint1 || breakpoint2) && (
        <div className="flex">
          <div className="relative hover:bg-black/20 h-10 w-10 rounded-[50%] flex items-center justify-center mr-[8px] bg-[#e4e6eb] cursor-pointer">
            <Messenger />
          </div>
          <div className="relative h-10 hover:bg-black/20 w-10 rounded-[50%] flex items-center justify-center mr-[8px] bg-[#e4e6eb] cursor-pointer">
            <Notifications />
            <div className="absolute -top-[0.45rem] -right-1 bg-[#FF0000] text-white text-[13px] w-[1.3rem] h-[1.3rem] rounded-full text-center  ">
              5
            </div>
          </div>
          <div
            ref={accMenu}
            className="relative h-10 hover:bg-black/20 w-10 rounded-[50%] flex items-center justify-center  bg-[#e4e6eb] cursor-pointer "
          >
            <img
              onClick={openMenu}
              className="w-full h-full rounded-full"
              src={user?.picture}
              alt=""
            />
            <img
              onClick={openMenu}
              className="absolute top-[1.6rem] right-0 outline-[2px] outline-double outline-white w-[0.8rem] h-[0.8rem]  rounded-full bg-[#e4e6eb] "
              src={arrowDown}
              alt=""
            />
            {openAccMenu && (
              <div className="absolute top-[3.5rem] right-[3px]">
                <AccountMenu />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
