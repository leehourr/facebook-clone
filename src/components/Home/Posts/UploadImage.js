import React, { useRef, useState } from "react";

const UploadImage = ({ onClose, close, onGetImage }) => {
  const [image, setImage] = useState([]);
  const imageRef = useRef();

  const exit = () => {
    onClose();
    close();
  };

  // useEffect(() => {
  //   // onGetImage(image);
  // }, [image, onGetImage]);

  const selectImages = (e) => {
    const files = Array.from(e.target.files);
    console.log("files", files);
    onGetImage(files); // console.log(files);
    files.forEach((img) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readEvent) => {
        setImage((imgs) => [...imgs, readEvent.target.result]);
      };
    });
  };
  return (
    <>
      <div className=" relative rounded-lg z-40 bg-black/5 hover:bg-black/10 ">
        <div
          onClick={exit}
          className="absolute top-2 right-2 z-40 cursor-pointer bg-white hover:bg-white/80 w-8 h-9 flex items-center justify-center rounded-full "
        >
          <i className="exit_icon"></i>
        </div>

        {image.length === 0 && (
          <label
            htmlFor="uploadImg"
            className="h-[25vh] cursor-pointer flex flex-col items-center justify-center"
          >
            <div className="w-10 h-10 bg-black/10 flex  items-center justify-center rounded-full">
              <i className="addPhoto_icon"></i>
            </div>
            <h1>Add Photos/Videos</h1>
            <span className="text-[14px] text-black/60">or drag and drop</span>
            <input
              ref={imageRef}
              accepts="image/*"
              multiple
              hidden
              onChange={selectImages}
              id="uploadImg"
              type="file"
            />
          </label>
        )}
        {image.length !== 0 && (
          <div
            className={`w-full grid ${
              image.length === 1 ? "grid-cols-1" : "grid-cols-2"
            } gap-1`}
          >
            <div className="absolute bg-white cursor-pointer hover:bg-white/80 top-2 left-2 flex items-center gap-2 justify-center rounded-md px-3 py-[0.4rem]">
              <i className="edit_icon"></i>
              Edit
            </div>
            <label className="absolute bg-white cursor-pointer hover:bg-white/80 top-2 left-24 flex items-center gap-2 justify-center rounded-md px-3 py-[0.4rem] ">
              <i className="addPhoto_icon"></i>
              Add Photos/Videos
              <input
                ref={imageRef}
                multiple
                hidden
                onChange={selectImages}
                id="uploadImg"
                type="file"
              />
            </label>
            {image.map((bg, i) => (
              <img key={i} className="rounded-lg" src={bg} alt="" />
            ))}
          </div>
        )}
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
