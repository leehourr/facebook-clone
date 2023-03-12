import React from "react";
import link from "../../assets/link.png";

const Intro = ({ isVisitor }) => {
  return (
    <div className="bg-white shadow-sm shadow-black/20 w-full pb-4 pt-3 rounded-lg  flex flex-col gap-4 items-center text-center justify-center">
      <h1 className="text-[20px] pl-2 font-bold self-start">Intro</h1>
      {!isVisitor && <span className="intro_setting">Add bio</span>}
      <div className="flex gap-3">
        <img src={link} className="w-5" alt="" />
        <a
          href="https://youtu.be/E44kFkyl_Y8"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1A6ED8] hover:underline"
        >
          https://youtu.be/E44kFkyl_Y8
        </a>
      </div>
      {!isVisitor && <span className="intro_setting">Edit details</span>}
      {!isVisitor && <span className="intro_setting">Add Hobbies</span>}
      {!isVisitor && <span className="intro_setting">Add featured</span>}
    </div>
  );
};

export default Intro;
