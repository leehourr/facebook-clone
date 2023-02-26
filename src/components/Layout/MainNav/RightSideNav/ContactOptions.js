import React, { useState } from "react";

const ContactOptions = ({ icon, hoverText }) => {
  const [isHovering, setIsHovering] = useState(false);
  const hoverHandler = (i) => {
  //  console.log("ishovering", i);
    setIsHovering(true);
  };

  const mouseOutHandler = () => {
    setIsHovering(false);
  };
  return (
    <div
      onMouseOver={hoverHandler.bind(null, icon.type.name)}
      onMouseOut={mouseOutHandler}
      className="contact_options relative"
    >
      {icon}
      {isHovering && (
        <div className="absolute shadow-md shadow-black text-[12.5px] whitespace-nowrap top-7 right-1 bg-black text-white opacity-75 py-2 px-3 rounded-lg">
          {hoverText}
        </div>
      )}
    </div>
  );
};

export default ContactOptions;
