import React from "react";

const UploadImage = ({ onClose, close }) => {
  const exit = () => {
    onClose();
    close();
  };
  return (
    <div className="w-[94%] relative flex flex-col h-[19rem] mb-3 p-2 space-y-2 rounded-lg  mx-auto border-[1px] ring-black/20">
      <div
        onClick={exit}
        className="absolute top-6 right-4 cursor-pointer bg-white hover:bg-black/10  w-8 h-8 flex items-center justify-center rounded-full "
      >
        <i className="exit_icon"></i>
      </div>
      <div className="h-[75%]  flex flex-col items-center justify-center cursor-pointer rounded-lg bg-black/5 hover:bg-black/10 ">
        <div className="w-10 h-10 bg-black/10 flex  items-center justify-center rounded-full">
          <i className="addPhoto_icon"></i>
        </div>
        <h1>Add Photos/Videos</h1>
        <span className="text-[14px] text-black/60">or drag and drop</span>
      </div>
      <div className=" flex items-center justify-between px-3 flex-grow rounded-lg bg-black/5 ">
        <div className="w-10 h-10 bg-black/10 flex items-center justify-center rounded-full">
          <i className="phone_icon"></i>
        </div>
        <h1 className="text-[14px] mr-6">
          Add photos and videos from your mobile device.
        </h1>
        <span className="bg-black/10 w-12  text-center py-2 rounded-lg">
          Add
        </span>
      </div>
    </div>
  );
};

export default UploadImage;
