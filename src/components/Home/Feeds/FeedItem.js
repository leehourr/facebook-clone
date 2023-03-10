import React, { useCallback, useEffect, useRef, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dots, Public } from "../../../svg";
import PopUpReaction from "./PopUpReaction";
import Emoji from "@emoji-mart/react";
import useClickOutside from "../../../helpers/clickOutside";
import Menulist from "./PostMenu/Menulist";
// import ReactDOM from "react-dom";

const FeedItem = ({ post }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [img, setImg] = useState([]);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setText] = useState("");
  const textRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState();
  const emoji = useRef();
  const menu = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReact, setIsReact] = useState(false);
  const [reaction, setReaction] = useState("");

  const textBg = useRef();
  const uploadedImg = post.images || null;

  // console.log(img);
  // console.log("overall", reaction);

  useEffect(() => {
    if (post.background) {
      textBg.current.style.background = `url(${post.background})`;
    }
    if (uploadedImg !== null) {
      setImg(
        uploadedImg.map((i) => {
          return i.url;
        })
      );
    }
  }, [uploadedImg, post.background]);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  useClickOutside(
    emoji,
    useCallback(() => {
      // console.log("click in helper");
      toggleEmoji();
      setOpenEmoji(false);
    }, [])
  );

  useClickOutside(
    menu,
    useCallback(() => {
      // console.log("click in helper");
      closeMenu();
      setIsMenuOpen(false);
    }, [])
  );

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
  const toggleEmoji = () => {
    setOpenEmoji((prev) => !prev);
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const bindReaction = (e) => {
    console.log("reaction", e);
    reaction === e ? setReaction("") : setReaction(e);
  };

  const likeClick = () => {
    // console.log("in like", reaction);
    if (reaction !== "Like" || reaction === "Like") {
      setReaction("");
    }
    if (reaction === "") {
      setReaction("Like");
    }
    // bindReaction("Like");
  };
  return (
    <div className="flex flex-col relative items-center w-full rounded-lg shadow-sm shadow-black/20 bg-white">
      <header className="w-[95%] h-[3.5rem] mt-2 flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <Link
            to={`/${post.user?.username}`}
            relative={`#${post.user?.username}`}
            className="w-10 h-10 "
          >
            <img
              src={post.user?.picture}
              className="w-full rounded-full"
              alt="profile"
            />
          </Link>
          <div className="flex flex-col items-start pb-2">
            <Link
              to={`/${post.user?.username}`}
              className="flex items-center justify-center gap-2"
            >
              <h1 className="text-[16px] whitespace-nowrap">
                {post.user?.first_name + " " + post.user?.last_name}
              </h1>
              {post.type === "profilePicture" && (
                <span className="text-[13px] text-black/80 whitespace-nowrap">{`Updated ${
                  user?.data?.gender === "male" ? "his" : "her"
                } profile picture`}</span>
              )}
            </Link>

            <div className="flex items-center text-[14px] leading-4 justify-center gap-1">
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
              . <Public color="#828387" />
            </div>
          </div>
        </div>
        <div
          ref={menu}
          onClick={openMenu}
          className="relative cursor-pointer w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center"
        >
          <Dots />

          <div className="absolute z-30 top-7 w-[19.5rem] bg-white shadow-md -right-0 shadow-black/20 rounded-lg ">
            {isMenuOpen && (
              <Menulist
                postUserId={post.user?._id}
                userId={user?.data?._id}
                imagesLength={post.images !== null}
              />
            )}
          </div>
        </div>
      </header>
      <p
        ref={post.background ? textBg : undefined}
        className={`w-full ${
          post.background &&
          "h-[24rem] text-[27px] flex items-center justify-center text-white font-medium"
        }  pl-5 mb-3`}
      >
        <span>{post.text}</span>
      </p>
      <div
        className={`w-full relative  ${
          post.type !== "profilePicture"
            ? "mb-0"
            : "mb-16 h-[10rem] mobile:h-[13.5rem] sm:h-[16rem] imgBreakpoint:h-[19rem] md:h-[22rem] lg:h-[18rem] lg3:h-[23rem] xl:h-[19rem] 3.5xl:h-[24.8rem]"
        }`}
      >
        <div
          className={`bg-black/10 z-10 ${
            post.type !== "profilePicture" && "hidden"
          }  w-full h-[80%] mobile: xl:h-[70%]`}
        >
          <img className="w-full " src={post.cover} alt="" />
        </div>
        <div
          className={`w-full  cursor-pointer transition-all duration-100 grid items-center justify-center gap-1 ${
            img.length > 1 ? "grid-cols-2" : "grid-cols-1"
          } ${
            post.type !== "profilePicture"
              ? ""
              : "z-10 absolute top-3 imgBreakpoint:top-7"
          }`}
        >
          {/* {ReactDOM.createPortal(
          <div className="fixed z-50 left-1/2 top-0 h-screen">
            {img.map((i, index) => (
              <img key={index} className="w-full" src={i} alt="" />
            ))}
          </div>,
          document.getElementById("overlay")
        )} */}
          {img.map((i, index) => (
            <img
              key={index}
              className={` ${
                post.type === "profilePicture" &&
                "rounded-full w-[55%] mx-auto mt-6 ring-4 ring-white"
              }`}
              src={i}
              alt=""
            />
          ))}
        </div>
      </div>
      <div
        className={`w-[96%] h-9 mobile:h-10 relative my-1 border-b-[1px]  border-b-black/20`}
      >
        {reaction}
      </div>

      <div className="w-[96%] border-b-[1px] border-b-black/20 pb-3 mb-3 flex items-center justify-around">
        <div className="post_interaction group relative">
          <div
            onClick={likeClick}
            onMouseOver={() => {
              setIsReact(true);
            }}
            className="post_interaction hover:bg-transparent"
          >
            <i className="like_icon"></i>
            <span>{reaction ? reaction : "Like"}</span>
          </div>
          <div
            className={`absolute left-1 mobile:left-0 transition-all duration-300 group-hover:-translate-y-10 group-hover:z-10 group-hover:opacity-100 ${
              isReact && "group-hover:visible"
            } invisible opacity-0 -z-10 bg-white shadow-sm shadow-black/20 p-1 px-2 rounded-3xl w-[40vw]  mobile:w-[14rem] lg:w-[17rem]`}
          >
            <PopUpReaction onHover={setIsReact} setReaction={bindReaction} />
          </div>
        </div>
        <div className="post_interaction">
          <i className="comment_icon"></i>
          <span>Comment</span>
        </div>
        <div className="post_interaction">
          <i className="share_icon"></i>
          <span>Share</span>
        </div>
      </div>
      <div className="w-[96%] mb-3 flex items-center justify-center gap-2">
        <img
          src={user?.data?.picture}
          alt=""
          className="w-9 h-9 rounded-full "
        />

        <div ref={emoji} className="flex-grow relative">
          <input
            ref={textRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-black/10 w-full outline-none p-2 px-2 rounded-xl"
            type="text"
            placeholder="Write a comment..."
          />
          <div className="absolute top-3 right-2 flex items-center justify-center gap-2 child:cursor-pointer">
            <i onClick={toggleEmoji} className="emoji_icon"></i>
            <i className="camera_icon"></i>
            <i className="gif_icon"></i>
            <i className="sticker_icon"></i>
          </div>
          {openEmoji && (
            <div className="absolute z-10 -top-2 md:top-0 -translate-y-full right-0 lg:-right-32">
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
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
