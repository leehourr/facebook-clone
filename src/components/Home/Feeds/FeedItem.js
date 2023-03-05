import React, { useEffect, useRef, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dots, Public } from "../../../svg";
import PopUpReaction from "./PopUpReaction";
import Emoji from "@emoji-mart/react";

const FeedItem = ({ post }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [img, setImg] = useState([]);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setText] = useState("");
  const textRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState();

  const textBg = useRef();
  const uploadedImg = post.images || null;

  // console.log(img);

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
  return (
    <div className="flex flex-col items-center w-full rounded-lg shadow-sm shadow-black/20 bg-white">
      <header className="w-[95%] h-[3.5rem] mt-2 flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <Link to={`/${post.user.username}`} className="w-10 h-10 ">
            <img
              src={post.user.picture}
              className="w-full rounded-full"
              alt="profile"
            />
          </Link>

          <div className="flex flex-col items-start pb-2">
            <Link to={`/${post.user.username}`}>
              <h1 className="text-[16px]">
                {post.user.first_name + " " + post.user.last_name}
              </h1>
            </Link>

            <div className="flex items-center text-[14px] leading-4 justify-center gap-1">
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
              . <Public color="#828387" />
            </div>
          </div>
        </div>
        <Dots />
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
        className={`w-full  grid items-center justify-center gap-1 ${
          img.length > 1 ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        {img.map((i, index) => (
          <img key={index} className="w-full" src={i} alt="" />
        ))}
      </div>
      <div></div>
      <div
        className={`w-[96%] h-9 mobile:h-12 relative my-1 border-b-[1px] pb-1 border-b-black/20`}
      ></div>

      <div className="w-[96%] border-b-[1px] border-b-black/20 pb-3 mb-3 flex items-center justify-around">
        <div className="post_interaction group relative">
          <div className="absolute left-1 mobile:left-0 transition-all duration-300 group-hover:-translate-y-10 group-hover:z-10 group-hover:opacity-100 group-hover:visible invisible opacity-0 -z-10 bg-white shadow-sm shadow-black/20 p-1 px-2 rounded-3xl w-[40vw]  mobile:w-[17vw]">
            <PopUpReaction />
          </div>
          <i className="like_icon"></i>
          <span>Like</span>
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
        <img src={user.picture} alt="" className="w-9 h-9 rounded-full " />

        <div className="flex-grow relative">
          <input
            ref={textRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-black/10 w-full outline-none p-1 px-2 rounded-xl"
            type="text"
            placeholder="Write a comment..."
          />
          <div className="absolute top-2 right-2 flex items-center justify-center gap-2 child:cursor-pointer">
            <i onClick={toggleEmoji} className="emoji_icon"></i>
            <i className="camera_icon"></i>
            <i className="gif_icon"></i>
            <i className="sticker_icon"></i>
          </div>
          {openEmoji && (
            <div className="absolute z-10 top-0 -translate-y-full -right-32">
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
