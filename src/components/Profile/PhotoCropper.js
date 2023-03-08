import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { Backdrop } from "../Ui/Backdrop";
import { createPortal } from "react-dom";

const PhotoCropper = ({
  setImage,
  image,
  onCancel,
  onClose,
  discard,
  setDiscard,
}) => {
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const slider = useRef(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    // console.log(croppedArea, croppedAreaPixels);
  }, []);
  const zoomIn = () => {
    slider.current.stepUp();
    setZoom(slider.current.value);
  };
  const zoomOut = () => {
    slider.current.stepDown();
    setZoom(slider.current.value);
  };

  const closeForm = () => {
    onCancel();
  };

  // console.log(zoom);
  return (
    <div className="w-[96%] mx-auto my-4">
      <textarea
        className="resize-none outline-none pl-3 pt-3 rounded-lg border-[1px] border-black/20 w-full"
        type="text"
        placeholder="Description"
      />
      <div className="relative w-full h-[30rem]">
        <div className="absolute w-full h-full">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
            // style={style}
          />
        </div>
      </div>
      <div className="w-full flex items-center cursor-pointer gap-3 justify-center">
        <div
          className="flex items-center justify-center hover:bg-black/10 w-8 h-8 rounded-full"
          onClick={() => zoomOut()}
        >
          <i className="minus_icon"></i>
        </div>
        <input
          type="range"
          min={1}
          max={3}
          step={0.2}
          ref={slider}
          value={zoom}
          className="bg-[#1A6ED8] outline-none h-1 rounded-lg cursor-pointer my-3 w-[60%]"
          onChange={(e) => setZoom(e.target.value)}
        />
        <div
          className="flex items-center justify-center hover:bg-black/10 w-8 h-8 rounded-full"
          onClick={() => zoomIn()}
        >
          <i className="plus_icon"></i>
        </div>
      </div>

      <div className="w-full flex items-center justify-center gap-3">
        <div className="flex cursor-pointer items-center bg-black/10 px-3 py-1 rounded-lg gap-2 ">
          <i className="crop_icon"></i>
          <span>Crop photo</span>
        </div>
        <div className="flex cursor-pointer items-center bg-black/10 px-3 py-1 rounded-lg gap-2 ">
          <i className="temp_icon"></i>
          <span>Make temperory</span>
        </div>
      </div>
      <div className="w-full text-[18px] text-black/50 my-3 flex items-center justify-start gap-3">
        <img src="../../../icons/public.png" alt="" />
        <span>Your profile picture is public.</span>
      </div>
      <div className="w-full text-[16px] font-semibold border-b border-b-black/20 "></div>
      <div className="flex items-center justify-end gap-5 mt-3">
        <button onClick={closeForm} className="text-[#1A6ED8]">
          Cancel
        </button>
        <button className="bg-[#1A6ED8] text-white px-10 py-2 rounded-lg">
          Save
        </button>
      </div>
      {discard &&
        image.length > 0 &&
        createPortal(
          <Backdrop
            onClick={closeForm}
            className="fixed bg-white/70 top-0 z-70 left-0 flex items-center justify-center"
          />,
          document.getElementById("backdrop")
        )}
      {discard &&
        image.length > 0 &&
        createPortal(
          <div className="absolute pb-4 text-center rounded-lg shadow-sm shadow-black/20 bg-white top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 w-[33rem] z-70">
            <div className="w-full mb-1 mx-auto pb-6 border-b-[1px] border-b-black/20 relative">
              <h1 className="text-[20px] mt-5 font-bold">Discard Changes </h1>
              <div
                onClick={() => {
                  setDiscard(false);
                }}
                className="absolute cursor-pointer top-0 right-4 w-9 h-9 bg-black/10 flex items-center justify-center rounded-full"
              >
                <i className="exit_icon" alt="" />
              </div>
              {/* <div className="w-full border-b-[1px] border-b-black/20"></div> */}
            </div>
            <h1 className="text-left ml-4">
              Are you sure you want to discard your changes?
            </h1>
            <div className="flex items-center justify-end gap-5 mt-9 mr-4">
              <button
                onClick={() => {
                  setDiscard(false);
                }}
                className="text-[#1A6ED8]"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="bg-[#1A6ED8] text-white px-10 py-1 rounded-md"
              >
                Discard
              </button>
            </div>
          </div>,
          document.getElementById("overlay")
        )}
    </div>
  );
};

export default PhotoCropper;
