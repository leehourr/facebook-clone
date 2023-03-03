import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Dots, Feeling, Friends, Photo } from "../../../svg";
import { Backdrop } from "../../Ui/Backdrop";
import Emoji from "@emoji-mart/react";
import { useEffect } from "react";
import { useRef } from "react";

const Status = ({ onToggleForm, name, pfPic }) => {
  const [text, setText] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const textRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState();

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
              src={pfPic}
              className="bg-black/40 rounded-full self-end w-[2.4rem] h-[2.4rem]"
              alt=""
            />
            <div className="ml-3 h-full">
              <span className="font-medium self-start  ">Lee Hour</span>
              <div className="w-36 h-6 rounded-md bg-black/10"></div>
            </div>
          </div>
          <textarea
            ref={textRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="h-36 resize-none outline-none  w-full placeholder:text-[24px] text-[24px] placeholder:text-[#65676B] pl-4 pt-4 "
            placeholder={`What's on your mind, ${name}?`}
          />
          <div className="w-[95%] mb-2 mx-auto flex items-center justify-between">
            <div className="w-9 cursor-pointer">
              <img src="../../../icons/colorful.png" alt="" />
            </div>
            <i onClick={toggleEmoji} className="emoji_icon_large" />
          </div>
          {openEmoji && (
            <div className="absolute -top-44 -right-44">
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
          <div className="w-[94%] mb-3 mx-auto h-14 flex items-center  justify-between px-4 rounded-lg border-[1px]  border-black/20">
            <h1 className="font-medium ">Add to your post</h1>
            <div className="flex space-x-3 ">
              <div>
                <Photo color="#41B35D" />
              </div>
              <div>
                <Friends color="cyan" />
              </div>
              <div>
                <Feeling color="#ECBD4D" />
              </div>
              <div>
                <Photo color="#41B35D" />
              </div>
              <div>
                <Photo color="#41B35D" />
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
