import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../../../store/user-slice";
import store from "../../../store";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const AccountMenu = () => {
  const [setting, setSetting] = useState("");
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const toggleSetting = (i) => {
    if (i === 0) {
      setSetting("setting");
    }
    if (i === 1) {
      console.log("support");
      setSetting("help&support");
    }
    if (i === 2) {
      console.log("support");
      setSetting("displayMode");
    }
    if (!isSettingOpen) {
      setIsSettingOpen(true);
      return;
    }
    setIsSettingOpen(false);
  };

  const logoutHandler = () => {
    store.dispatch(userActions.logout());
    Cookies.set("token", "");
    navigate("/", { replace: true });
  };
  return (
    <div className="shadow-[1px_1px_20px_5px_rgba(0,0,0,0.1)] w-[22.5rem] select-none rounded-lg bg-white pt-3 pb-4">
      {!isSettingOpen && (
        <>
          <div className="mb-4 shadow-[2px_1px_10px_3px_rgba(0,0,0,0.15)] rounded-xl w-[90%] h-[116px] mx-auto ">
            <Link
              to={`/${user.data.username}`}
              className="w-[92%] flex items-center mx-auto pt-4"
            >
              <div className="bg-black/50 w-10 h-10 flex items-center justify-center overflow-hidden rounded-full">
                <img
                  className="w-full h-full"
                  src={user.data?.picture}
                  alt=""
                />
              </div>
              <span className="font-semibold ml-2">{`${user.data?.first_name} ${user.data?.last_name}`}</span>
            </Link>
            <div className="w-[92%] mt-4 mx-auto border-b-[1px] border-b-black/20"></div>
            <div className="w-[97%] flex items-center   justify-between pb-1 px-2 rounded-lg hover:bg-black/[0.05] h-[30%] mt-1 mx-auto">
              <span className=" text-blue-500">See all profiles</span>
              <span className="w-5 h-5 text-xs font-bold rounded-full flex items-center justify-center text-white bg-red-500">
                2
              </span>
            </div>
          </div>
          {settings.slice(0, 3).map((i) => (
            <div
              key={i.id}
              onClick={toggleSetting.bind(null, i.id)}
              className="w-[94%] hover:bg-[#F2F2F2]  flex items-center pl-2 mx-auto h-[3.55rem] rounded-lg"
            >
              <div className="bg-[#dcdcdc] w-9 h-9 rounded-full flex items-center justify-center">
                <i className={`${i.icon}`} />
              </div>
              <span className="pl-2">{i.name}</span>
              <i className="right_icon ml-auto" />
            </div>
          ))}
          {settings.slice(3, 4).map((i) => (
            <div
              key={i.id}
              className="w-[94%] hover:bg-[#F2F2F2]  flex items-center pl-2 mx-auto h-[3.55rem] rounded-lg"
            >
              <div className="bg-[#dcdcdc] w-9 h-9 rounded-full flex items-center justify-center">
                <i className={`${i.icon}`} />
              </div>
              <span className="pl-2">{i.name}</span>
            </div>
          ))}
          <div
            onClick={logoutHandler}
            className="w-[94%] hover:bg-[#F2F2F2]  flex items-center pl-2 mx-auto h-[3.55rem] rounded-lg"
          >
            <div className="bg-[#dcdcdc] w-9 h-9 rounded-full flex items-center justify-center">
              <i className="logout_filled_icon" />
            </div>
            <span className="pl-2">Log Out</span>
          </div>
          <footer className="text-[13px] text-[#65676B] flex gap-x-3 flex-wrap child-after: child-hover:underline w-[88%] mx-auto">
            <Link to="/">Privacy</Link>
            <Link to="/">Term</Link>
            <Link to="/">Advertising</Link>
            <Link to="/">Ad Choices</Link>
            <Link to="/">Cookie</Link>
            <Link to="/">Meta © 2023</Link>
          </footer>
        </>
      )}
      {isSettingOpen && setting === "setting" && (
        <Settings
          title="Setting & privacy"
          settingLists={settingAndPrivacy}
          onClick={toggleSetting}
        />
      )}
      {isSettingOpen && setting === "help&support" && (
        <Settings
          title="Help & support"
          settingLists={helpAndSupport}
          onClick={toggleSetting}
        />
      )}
      {isSettingOpen && setting === "displayMode" && (
        <Settings
          title="Display & accessibility"
          settingLists={settingAndPrivacy}
          displayMode
          onClick={toggleSetting}
        />
      )}
    </div>
  );
};
export default AccountMenu;

const Settings = ({ title, settingLists, onClick, displayMode }) => {
  return (
    <>
      <div className="flex items-center gap-4 ml-[1rem] mt-2 mb-4">
        <div
          onClick={onClick}
          className="hover:bg-[#dcdcdc] w-9 h-9 rounded-full flex items-center justify-center"
        >
          <i className="arrow_back_icon" />
        </div>
        <h1 className="text-[24px] font-bold ">{title}</h1>
      </div>
      {!displayMode &&
        settingLists.map((i) => {
          return (
            <div
              key={i.name}
              className="w-[94%] hover:bg-[#F2F2F2]  flex items-center pl-2 mx-auto h-[3.55rem] rounded-lg"
            >
              <div className="bg-[#dcdcdc] w-9 h-9 rounded-full flex items-center justify-center">
                <i className={`${i.icon}`} />
              </div>
              <span className="pl-2">{i.name}</span>
            </div>
          );
        })}
      {displayMode && (
        <div className="w-[94%] flex items-start pl-2 mx-auto h-fit py-2 rounded-lg">
          <div className="bg-[#dcdcdc] w-9 h-9 rounded-full flex items-center justify-center">
            <i className="dark_filled_icon" />
          </div>
          <div className="pl-4 w-[86%]">
            <span className="font-semibold block">Dark Mode</span>
            <span className="text-[15px] block">
              Adjust the appearance of Facebook to reduce glare and give your
              eyes a break.
            </span>
            <label
              htmlFor="darkOff"
              className="hover:bg-[#F2F2F2] px-1 rounded-lg py-2 cursor-pointer flex justify-between  my-2"
            >
              <span>Off</span>
              <input
                onClick={(e) => {
                  console.log(e.target.value);
                }}
                type="radio"
                name="dark"
                id="darkOff"
                value="off"
                className="w-5"
              />
            </label>
            <label
              htmlFor="darkOn"
              className="hover:bg-[#F2F2F2] px-1 rounded-lg py-2 cursor-pointer flex justify-between"
            >
              <span>On</span>
              <input
                onClick={(e) => {
                  console.log(e.target.value);
                }}
                type="radio"
                name="dark"
                id="darkOn"
                value="on"
                className="w-5"
              />
            </label>
          </div>
        </div>
      )}
    </>
  );
};

const settings = [
  {
    id: 0,
    icon: "settings_filled_icon",
    name: "Setting & privacy",
  },
  {
    id: 1,
    icon: "help_filled_icon",
    name: "Help & support",
  },
  {
    id: 2,
    icon: "dark_filled_icon",
    name: "Display & accessibility",
  },
  {
    id: 3,
    icon: "feed_filled_icon",
    name: "Give feedback",
  },
  {
    id: 4,
    icon: "logout_filled_icon",
    name: "Log Out",
  },
];

const settingAndPrivacy = [
  { name: "Settings", icon: "settings_filled_icon" },
  { name: "Privacy Checkup", icon: "privacy_checkup_icon" },
  { name: "Privay Center", icon: "settings_filled_icon" },
  { name: "Activity log", icon: "settings_filled_icon" },
  { name: "Feed", icon: "settings_filled_icon" },
  { name: "Language", icon: "settings_filled_icon" },
];

const helpAndSupport = [
  { name: "Help Center", icon: "help_center_icon" },
  { name: "Support Inbox", icon: "email_icon" },
  { name: "Reprot a problem", icon: "info_filled_icon" },
];
