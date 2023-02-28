import React from "react";
import ReactDOM from "react-dom";
import { Dots, Feeling, Friends, Photo } from "../../../svg";
import { Backdrop } from "../../Ui/Backdrop";

const Status = ({ onToggleForm }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={onToggleForm} className="bg-white/50 z-50" />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <div className="fixed rounded-lg shadow-xl shadow-black/20 top-1/2 left-1/2 w-[26.3rem] mobile:w-[31.3rem] h-[26.2rem] -translate-x-1/2 -translate-y-1/2 z-50  bg-white">
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
              className="bg-black/40 rounded-full self-end w-[2.4rem] h-[2.4rem]"
              alt=""
            />
            <div className="ml-3 h-full">
              <span className="font-medium self-start  ">Lee Hour</span>
              <div className="w-36 h-6 rounded-md bg-black/10"></div>
            </div>
          </div>
          <textarea
            className="h-[43%] resize-none outline-none  w-full placeholder:text-[24px] text-[24px] placeholder:text-[#65676B] pl-4 pt-3 "
            placeholder="What's on your mind, Hour?"
          />
          <div className="w-[94%] mx-auto h-14 flex items-center  justify-between px-4 rounded-lg border-[1px] border-black/20">
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
            disabled={true}
            className="w-[94%] bg-[#1771E6] text-white disabled:cursor-not-allowed disabled:text-black/50  block mt-2 rounded-lg disabled:bg-black/20 mx-auto text-center h-10"
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
