import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Dots, Feeling, Photo } from "../../../svg";
import { Backdrop } from "../../Ui/Backdrop";
import Emoji from "@emoji-mart/react";
import { useEffect } from "react";
import { useRef } from "react";
import UploadImage from "./UploadImage";

const Status = ({ onToggleForm, user, isUpload, onClose }) => {
  const [text, setText] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const textRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState();
  const [uploadImage, setUploadImage] = useState(false);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const toggleEmoji = () => {
    setOpenEmoji((prev) => !prev);
  };
  const selectEmoji = (e) => {
    // console.log(e);
    const emoji = e.native;
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  const openUploadImage = () => {
    setUploadImage(true);
  };
  const closeUploadImage = () => {
    setUploadImage(false);
  };
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={onToggleForm} className="bg-white/50 z-50" />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <div className="fixed rounded-lg shadow-xl shadow-black/20 top-1/2 left-1/2 w-[26.3rem] mobile:w-[31.3rem] pb-3 -translate-x-1/2 -translate-y-1/2 z-50  bg-white">
          <div className="w-full text-center my-[0.8rem] pb-[0.8rem] flex items-center border-b-[1px] border-b-black/10">
            <h1 className="font-semibold self-center w-full text-[20px]">
              Create post
            </h1>
            <div
              onClick={onToggleForm}
              className="absolute rounded-full mt-[5px] cursor-pointer flex items-center justify-center w-9 h-9 bg-[#CED1D6]/50 hover:bg-[#CED1D6]/80 top-1 right-4"
            >
              <i className="exit_icon" alt="" />
            </div>
          </div>
          <div className="flex ml-4 mt-[0.7rem] h-12 items-center w-full">
            <img
              src={user.picture}
              className="bg-black/40 rounded-full self-end w-[2.4rem] h-[2.4rem]"
              alt=""
            />
            <div className="ml-3 h-full">
              <span className="font-medium self-start  ">
                {user.first_name + " " + user.last_name}
              </span>
              <div className="h-6 w-fit px-2 flex items-center space-x-1 rounded-md bg-black/10">
                <img src="../../../icons/public.png" alt="" />
                <span className="text-[14px] font-semibold">Public</span>
                <i className="arrowDown_icon"></i>
              </div>
            </div>
          </div>
          <div className="w-[95%] max-h-[55vh] my-3 overflow-y-auto mx-auto scrollbar-thin">
            <div className="flex w-full justify-between items-center mt-0">
              <textarea
                ref={textRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={`${
                  uploadImage || isUpload ? "" : "h-36"
                } outline-none resize-none  w-full ${
                  uploadImage || isUpload
                    ? "placeholder:text-[16px] text-[16px] "
                    : "placeholder:text-[24px] text-[24px]"
                } placeholder:text-[#65676B] pl-2 pt-41`}
                placeholder={`What's on your mind, ${user.last_name}?`}
              />
              <div className={`${!uploadImage && "hidden"} self-baseline `}>
                <i onClick={toggleEmoji} className="emoji_icon_large" />
              </div>
            </div>
            <div
              className={`${
                uploadImage && "hidden"
              }  mb-2 flex items-center justify-between`}
            >
              <div className=" w-9 cursor-pointer">
                <img src="../../../icons/colorful.png" alt="" />
              </div>
              <i onClick={toggleEmoji} className="emoji_icon_large" />
            </div>
            {openEmoji && (
              <div
                className={`${
                  uploadImage || isUpload ? "top-44" : "-top-44"
                } absolute z-40 -right-44`}
              >
                <Emoji
                  previewPosition="none"
                  searchPosition="none"
                  navPosition="bottom"
                  set="facebook"
                  theme="light"
                  maxFrequentRows="5"
                  onEmojiSelect={selectEmoji}
                  //  onClickOutside={toggleEmoji}
                />
              </div>
            )}
            {(uploadImage || isUpload) && (
              <div className="border-[1px] border-black/10 rounded-lg p-2">
                <UploadImage onClose={closeUploadImage} close={onClose} />
              </div>
            )}
          </div>
          <div className="w-[94%] mb-3 mx-auto h-14 flex items-center  justify-between px-4 rounded-lg border-[1px]  border-black/20">
            <h1 className="font-medium ">Add to your post</h1>
            <div className="flex space-x-3 items-baseline ">
              <div
                onClick={openUploadImage}
                className="hover:bg-green-100/50 cursor-pointer flex items-center justify-center w-9 h-9 rounded-full "
              >
                <Photo color="#41B35D" />
              </div>
              <div>
                <i className="tag_icon"></i>
              </div>
              <div>
                <Feeling color="#ECBD4D" />
              </div>
              <div>
                <i className="maps_icon"></i>
              </div>
              <div>
                <i className="microphone_icon"></i>
              </div>
              <div>
                <Dots />
              </div>
            </div>
          </div>
          <button
            disabled={text !== "" ? false : true}
            className="w-[94%] my-1 bg-[#1771E6] text-white disabled:cursor-not-allowed disabled:text-black/50  block mt-2 rounded-lg disabled:bg-black/20 mx-auto text-center h-10"
          >
            Post
          </button>
        </div>,
        document.getElementById("overlay")
      )}
    </>
  );
};

export default Status;
