import React from "react";

const ContactItem = () => {
  return (
    <div className="cursor-pointer rounded-lg p-2 hover:bg-black/5 w-full flex items-center">
      <img className="w-7 h-7 rounded-full bg-black/10" alt="" />
      <span className="ml-3">Name</span>
    </div>
  );
};

export default ContactItem;
