import React from "react";

const UploadImage = ({ onClose, close }) => {
  const exit = () => {
    onClose();
    close();
  };
  return (
    <>
      <div className="cursor-pointer relative  rounded-lg bg-black/5 hover:bg-black/10 ">
        <div
          onClick={exit}
          className="absolute top-2 right-2 cursor-pointer bg-white hover:bg-black/10  w-8 h-9 flex items-center justify-center rounded-full "
        >
          <i className="exit_icon"></i>
        </div>
        <div className="h-[25vh] flex flex-col items-center justify-center">
          <div className="w-10 h-10 bg-black/10 flex  items-center justify-center rounded-full">
            <i className="addPhoto_icon"></i>
          </div>
          <h1>Add Photos/Videos</h1>
          <span className="text-[14px] text-black/60">or drag and drop</span>
        </div>

        {/* <img className="rounded-lg" src="../../../../stories/jett.jpg" alt="" /> */}
      </div>

      <div className=" flex items-center mt-2 py-2 justify-between px-3 flex-grow rounded-lg bg-black/5 ">
        <div className="w-10 h-10 bg-black/10 flex items-center justify-center rounded-full">
          <i className="phone_icon"></i>
        </div>
        <h1 className="text-[14px] mr-6">
          Add photos and videos from your mobile device.
        </h1>
        <span className="bg-black/10 w-12 text-center py-2 rounded-lg">
          Add
        </span>
      </div>
    </>
  );
};

export default UploadImage;
