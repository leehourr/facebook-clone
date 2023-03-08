import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Dots, Feeling, Photo } from "../../../svg";
import { Backdrop } from "../../Ui/Backdrop";
import Emoji from "@emoji-mart/react";
import { useEffect } from "react";
import { useRef } from "react";
import UploadImage from "./UploadImage";
import PulseLoader from "react-spinners/PulseLoader";
import { createPost, uploadImages } from "../../../utils/api-call";
import { useNavigate } from "react-router-dom";

const Status = ({ onToggleForm, user, isUpload, onClose }) => {
  const [text, setText] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const navigate = useNavigate();
  const textRef = useRef(null);
  const backgroundRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState();
  const [backgroundImg, setBackgroundImg] = useState("");
  const [hasImage, setHasImage] = useState(false);
  const [uploadImage, setUploadImage] = useState([]);
  const [toggleBg, setToggleBg] = useState(false);
  const [hasBg, setHasBg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //its already pass from the props why did i bother get the data from redux bruhhhh
  // const { user } = useSelector((state) => ({ ...state }));

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
    setHasImage(true);
  };
  const closeUploadImage = () => {
    setHasImage(false);
  };

  const toggleBgHandler = () => {
    setToggleBg((prev) => !prev);
  };

  const selectedBg = (i) => {
    // console.log(i);
    backgroundRef.current.style.backgroundImage = `url(${i})`;
    setBackgroundImg(i);
    setHasBg(true);
  };

  const removeBg = () => {
    backgroundRef.current.style.backgroundImage = "";
    setHasBg(false);
  };

  const getImage = (img) => {
    setUploadImage((prev) => [...prev, img]);
  };
  // console.log("uploadImage", uploadImage);

  const uploadStatus = async () => {
    try {
      // console.log(user._id);
      if (backgroundImg !== "") {
        setIsLoading(true);
        const req = {
          type: null,
          background: backgroundImg,
          text,
          images: null,
          user: user._id,
        };

        await createPost(req);
        // console.log(res);
        setIsLoading(false);
        onToggleForm();
        navigate("/");
      }

      if (uploadImage.length !== 0) {
        // console.log("in upload", uploadImage);
        setIsLoading(true);
        // const img = URL.createObjectURL(uploadImage[0]);
        // const postImages = uploadImage.map((img) => {
        //   return URL.createObjectURL(img);
        // });
        // console.log("postImages", postImages);

        const path = `${user.username}/post Images`;
        let formData = new FormData();
        formData.append("path", path);
        uploadImage.map((image) => {
          return formData.append("file", image);
        });
        // console.log(formData);
        const res = await uploadImages(formData, path);
        // console.log("res", res);

        const req = {
          type: null,
          background: null,
          text,
          images: res,
          user: user._id,
        };
        await createPost(req);
        // console.log("uploadImage", postRes);
        setIsLoading(false);
        onToggleForm();
        navigate("/");
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err.response);
    }
  };
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={onToggleForm} className="bg-white/50 z-40" />,
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
          <div
            ref={backgroundRef}
            className={`${
              hasBg && "h-[24rem] mb-2"
            } max-h-[24.6rem] overflow-y-auto scrollbar-thin mb-2 w-[94%] my-3 mx-auto`}
          >
            <div className="w-full h-full  ">
              <div className=" flex w-full justify-between items-center rounded-lg mb-2">
                <textarea
                  ref={textRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className={`${
                    hasImage || isUpload ? "" : hasBg ? "h-[20.8rem]" : "h-36"
                  } outline-none resize-none  w-full ${
                    hasImage || isUpload
                      ? "placeholder:text-[16px] text-[16px] "
                      : hasBg
                      ? "text-[30px] font-bold placeholder:text-white/80 placeholder:text-center pt-36 text-white "
                      : "placeholder:text-[24px] text-[24px]"
                  }
                  } placeholder:text-[#65676B] bg-transparent h rounded-lg pl-2 pt-41`}
                  placeholder={`What's on your mind, ${user.last_name}?`}
                />
                <div className={`${!hasImage && "hidden"} self-baseline `}>
                  <i onClick={toggleEmoji} className="emoji_icon_large" />
                </div>
              </div>
              <div
                className={`${
                  (hasImage || isUpload) && "hidden"
                }  mb-2 w-full flex items-center px-1 justify-between`}
              >
                <div className="w-9 cursor-pointer flex items-center gap-2">
                  {!toggleBg ? (
                    <img
                      onClick={toggleBgHandler}
                      src="../../../icons/colorful.png"
                      alt=""
                    />
                  ) : (
                    <div
                      onClick={toggleBgHandler}
                      className={`${
                        hasBg ? "bg-white/80" : "bg-black/20"
                      } p-1 px-[5px] rounded-lg`}
                    >
                      <i className="back_icon" />
                    </div>
                  )}
                  {toggleBg && (
                    <img
                      onClick={removeBg}
                      className={`rounded-lg w-8 h-9 px-4 shadow-sm shadow-black/20 border-2 border-white ${
                        hasBg ? "bg-white/80" : "bg-black/20"
                      } `}
                      alt=""
                    />
                  )}
                  {toggleBg &&
                    postBackgrounds.map((bg, i) => (
                      <img
                        onClick={selectedBg.bind(null, bg)}
                        className="rounded-lg w-8 h-9"
                        key={i}
                        src={bg}
                        alt=""
                      />
                    ))}
                </div>

                <i onClick={toggleEmoji} className="emoji_icon_large" />
              </div>
            </div>
            {openEmoji && (
              <div
                className={`${
                  hasImage || isUpload ? "top-44" : "-top-44"
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
            {(hasImage || isUpload) && (
              <div className="border-[1px] border-black/10 rounded-lg p-2">
                <UploadImage
                  onGetImage={getImage}
                  onClose={closeUploadImage}
                  hasImage={openUploadImage}
                  close={onClose}
                />
              </div>
            )}
          </div>
          <div className="w-[94%] mb-3 mx-auto h-14 flex items-center  justify-between px-4 rounded-lg border-[1px]  border-black/20">
            <h1 className="font-medium ">Add to your post</h1>
            <div className="flex space-x-3 items-baseline ">
              <div
                aria-disabled={hasBg}
                onClick={!hasBg ? openUploadImage : undefined}
                className="hover:bg-green-100/50 aria-disabled:hover:bg-transparent aria-disabled:cursor-not-allowed cursor-pointer flex items-center justify-center w-9 h-9 rounded-full "
              >
                <Photo color={hasBg ? "#cccccc" : "#41B35D"} />
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
            onClick={uploadStatus}
            disabled={text !== "" || uploadImage.length !== 0 ? false : true}
            className="w-[94%] my-1 bg-[#1771E6] text-white disabled:cursor-not-allowed disabled:text-black/50  block mt-2 rounded-lg disabled:bg-black/20 mx-auto text-center h-10"
          >
            {isLoading ? <PulseLoader color="#fff" size={5} /> : "Post"}
          </button>
        </div>,
        document.getElementById("overlay")
      )}
    </>
  );
};

export default Status;

const postBackgrounds = [
  "../../../images/postbackgrounds/1.jpg",
  "../../../images/postbackgrounds/2.jpg",
  "../../../images/postbackgrounds/3.jpg",
  "../../../images/postbackgrounds/4.jpg",
  "../../../images/postbackgrounds/5.jpg",
  "../../../images/postbackgrounds/6.jpg",
  "../../../images/postbackgrounds/7.jpg",
  "../../../images/postbackgrounds/8.jpg",
  "../../../images/postbackgrounds/9.jpg",
];
