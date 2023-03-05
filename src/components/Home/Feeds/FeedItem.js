import React, { useEffect, useRef, useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Dots, Public } from "../../../svg";
import PopUpReaction from "./PopUpReaction";

const FeedItem = ({ post }) => {
  const [img, setImg] = useState([]);
  const [popUpReaction, setPopUpReaction] = useState(false);
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

  const toggleReaction = () => {
    setPopUpReaction(true);
  };

  const closeReaction = () => {
    setTimeout(() => {
      setPopUpReaction(false);
    }, 500);
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

      <div className="w-[96%]  mb-3 flex items-center justify-around">
        <div className="post_interaction group relative">
          <div className="absolute left-1 mobile:left-0 transition-all duration-300 group-hover:-translate-y-10 group-hover:z-10 group-hover:opacity-100 group-hover:visible invisible opacity-0 -z-10 bg-white shadow-sm shadow-black/20 p-1 px-2 rounded-3xl w-[40vw]  mobile:w-[17vw]">
            <PopUpReaction
              onToggle={toggleReaction}
              // closeReaction={closeReaction}
            />
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
    </div>
  );
};

export default FeedItem;
