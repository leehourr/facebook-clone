import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";

const PhotoCropper = ({ setImage, image, onCancel }) => {
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const slider = useRef(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);
  const zoomIn = () => {
    slider.current.stepUp();
    setZoom(slider.current.value);
  };
  const zoomOut = () => {
    slider.current.stepDown();
    setZoom(slider.current.value);
  };
  console.log(zoom);
  return (
    <div className="w-[96%] mx-auto my-4">
      <textarea
        className="resize-none pl-3 pt-3 rounded-lg border-[1px] border-black/20 w-full"
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
        <button onClick={onCancel} className="text-[#1A6ED8]">
          Cancel
        </button>
        <button className="bg-[#1A6ED8] text-white px-10 py-2 rounded-lg">
          Save
        </button>
      </div>
    </div>
  );
};

export default PhotoCropper;
