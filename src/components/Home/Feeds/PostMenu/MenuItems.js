import React from "react";

const MenuItems = ({ icon, title, subtitle, img }) => {
  return (
    <li className="w-full hover:bg-black/10 flex py-2 px-5 gap-2 items-center">
      {img ? <img src={img} alt="" /> : <i className={icon}></i>}
      <div className="flex flex-col">
        <span>{title}</span>
        {subtitle && <span className="text-[13px] text-black/70">{subtitle}</span>}{" "}
      </div>
    </li>
  );
};

export default MenuItems;
