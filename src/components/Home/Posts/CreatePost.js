import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Feeling, LiveVideo, Photo } from "../../../svg";
import Status from "./Status";

const CreatePost = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [openForm, setOpenForm] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  const togglePostform = () => {
    setOpenForm((prev) => !prev);
  };

  const openUploadImage = () => {
    setOpenForm((prev) => !prev);
    setIsUpload(true);
  };

  const closeUploadImage = () => {
    setIsUpload(false);
  };

  return (
    <>
      <div className="w-full shadow-sm shadow-black/20 bg-white rounded-lg overflow-hidden">
        <div className="flex w-[96%] border-b-[1px] border-b-black/10 pb-3 my-3 items-center justify-between mx-3">
          <img
            src={user.picture}
            className="w-10 h-10 rounded-full bg-black/20"
            alt=""
          />
          <input
            onClick={togglePostform}
            className="bg-[#eaeced] hover:bg-[#dfe3e4] cursor-pointer w-[93.1%] outline-none text-[17px] pl-4 placeholder:text-[#65676B] h-10 rounded-3xl"
            type="text"
            name="status"
            placeholder={`What's on your mind, ${user.last_name}?`}
          />
        </div>
        <div className="w-[96%] rounded-lg mb-3 flex  mx-3 text-[#65676B]">
          <div className="post_options">
            <LiveVideo color="#E74862" />
            <span>Live video</span>
          </div>
          <div onClick={openUploadImage} className="post_options">
            <Photo color="#41B35D" />
            <span>Photo/video</span>
          </div>
          <div className="post_options hidden mobile:flex">
            <Feeling color="#ECBD4D" />
            <span>Feeling/activity</span>
          </div>
        </div>
      </div>
      {openForm && (
        <Status
          isUpload={isUpload}
          onClose={closeUploadImage}
          user={user}
          onToggleForm={togglePostform}
        />
      )}
    </>
  );
};

export default CreatePost;
