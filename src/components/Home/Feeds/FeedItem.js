import React, { useCallback, useEffect, useRef, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dots, Public } from "../../../svg";
import PopUpReaction from "./PopUpReaction";
import Emoji from "@emoji-mart/react";
import useClickOutside from "../../../helpers/clickOutside";
import Menulist from "./PostMenu/Menulist";
import { getReaction, postReaction } from "../../../utils/api-call";
// import { LoadingStimulate } from "../../../utils/LoadingStimulate";
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
  const [reactionData, setReactionData] = useState([]);
  const [totalReacts, setTotalReacts] = useState(0);
  const [reactIcons, setReactIcons] = useState([]);
  // const [reactList, setReactList] = useState([]);
  const [reactBy, setReactBy] = useState([]);
  let isTwoPpl = totalReacts - 1;

  const textBg = useRef();
  const uploadedImg = post.images || null;

  // console.log(reactList);
  console.log(reactionData.length);
  // console.log("overall", reaction);
  useEffect(() => {
    if (reactionData.length === 1) {
      reactionData.forEach((i) => {
        for (const j in i) {
          setReactBy(i[j][0].reactBy);
        }
      });
    }
    reactionData.slice(0, 3).map((i) => {
      if (reactIcons.length > 0) return reactIcons;
      for (const j in i) {
        setReactIcons((prev) => [j, ...prev]);
      }
    });
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
  }, [uploadedImg, post.background, reactionData, totalReacts, reactIcons]);

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

  useEffect(() => {
    const getReactions = async () => {
      let reactionData;
      let reacts = [];
      const res = await getReaction(post._id);
      if (res.status === "ok") {
        setReaction(res?.check || "");
        reactionData = res.reacts;
      }
      let total = 0;

      for (const i in reactionData) {
        let innerObj = {};
        innerObj[i] = reactionData[i];
        total += reactionData[i].length;
        reacts.push(innerObj);
      }
      setTotalReacts(total);
      // console.log("reactionData", reacts);
      setReactionData(reacts);
    };
    getReactions().catch((err) => {
      console.log(err);
    });
  }, [post._id]);

  // console.log(reaction);
  // let hasUrReaction = reactionData?.check;

  const checkIfBosKe = (e) => {
    let check;
    for (const i of reactionData) {
      // console.log("in bos ke func", i);
      for (const j in i) {
        if (j === e && i[j].length > 1) {
          // console.log("bos ke", e, j);
          check = true;
        }
      }
    }
    return check;
  };

  // console.log("total reacts", totalReacts);
  // console.log("total lenght", reactIcons.length);
  // console.log("reactionICon", reactIcons);

  const bindReaction = async (e) => {
    // console.log("reaction", e, "on post", post);
    const req = { postId: post._id, react: e };
    // console.log(" reaction", reaction);
    // console.log(" from click", e);
    const bosKe = await checkIfBosKe(e);
    // console.log("bosKe", bosKe);

    // console.log("already have", e);

    if (reaction === e) {
      // reactIcons.map((i) => {
      //   if (i === e) console.log(reactIcons[i].length);
      // });
      if (!bosKe) {
        setReactIcons((prev) => {
          const newReact = prev.filter(
            (i) => i !== reactIcons[reactIcons.length - 1]
          );
          return [...newReact];
        });
      } else {
        setReactIcons((prev) => {
          if (bosKe) {
            return [...prev];
          }
          const newReact = prev.filter(
            (i) => i !== reactIcons[reactIcons.length - 1]
          );
          return [...newReact];
        });
      }

      setReaction("");
      setTotalReacts((prev) => {
        return prev - 1;
      });
      const res = await postReaction(req);
      if (res?.status !== "ok") {
        setTimeout(() => {
          setReaction(e);
        }, 1500);
      }
      return;
    }

    if (reaction !== "" && reactIcons.includes(e) && reaction !== e) {
      setReactIcons((prev) => {
        const newReact = prev.filter(
          (i) => i !== reactIcons[reactIcons.length - 1]
        );
        return [...newReact];
      });
    }

    // if (
    //   reaction !== "" &&
    //   !reactIcons.includes(e) &&
    //   reactIcons.length === totalReacts
    // ) {
    //   console.log("diff one lenght equal");
    //   setReactIcons((prev) => {
    //     const newReact = prev.filter((i) => {
    //       return i !== reactIcons[reactIcons.length - 1];
    //     });
    //     return [...newReact, e];
    //   });
    // }
    if (reaction !== "" && !reactIcons.includes(e)) {
      // console.log("diff one");
      if (!bosKe && reactIcons.length === 2) {
        // console.log("kng bos ke ");
        setReactIcons((prev) => {
          return [...prev, e];
        });
      } else {
        // console.log(" men kng bos ke ");
        setReactIcons((prev) => {
          const newReact = prev.filter((i) => {
            return i !== reactIcons[reactIcons.length - 1];
          });
          return [...newReact, e];
        });
      }
    }
    // console.log("icon length", reactIcons.length);
    // console.log("total reacts", totalReacts);

    if (reaction === "" && !reactIcons.includes(e)) {
      setReactIcons((prev) => [...prev, e]);
      setTotalReacts((prev) => {
        return prev + 1;
      });
    }

    if (reaction === "" && reactIcons.includes(e)) {
      setReactIcons((prev) => [...prev]);
      setTotalReacts((prev) => {
        return prev + 1;
      });
    }
    // if (reaction !== "" && reactIcons.includes(reaction)) {
    //   setReactIcons((prev) => [...prev]);
    // }

    // setReaction(e);

    const res = await postReaction(req).catch((e) => {
      console.log(e);
    });
    if (res?.status !== "ok") {
      setTimeout(() => {
        setReaction("");
      }, 1500);
    }
  };

  const likeClick = async () => {
    // console.log("in like", reaction);
    if (reaction !== "Like" && reaction !== "") {
      const bosKe = await checkIfBosKe(reaction);
      setReaction("");
      setReactIcons((prev) => {
        if (
          prev.includes(reaction) &&
          reactIcons.length < totalReacts &&
          !bosKe
        )
          return prev.filter((i) => i !== reaction);
        if (prev.includes(reaction) && reactIcons.length === totalReacts)
          return [...prev];

        return [...prev];
      });

      setTotalReacts((prev) => {
        return prev - 1;
      });
      const req = { postId: post._id, react: reaction };

      const res = await postReaction(req).catch((e) => {
        console.log(e);
      });
      if (res?.status !== "ok") {
        setTimeout(() => {
          setReaction(reaction);
        }, 1500);
      }
    }
    if (reaction === "Like") {
      setReaction("");
      setTotalReacts((prev) => {
        return prev - 1;
      });
      setReactIcons((prev) => {
        if (!prev.includes("Like")) return [...prev, "Like"];
        return [...prev];
      });
      const req = { postId: post._id, react: "Like" };

      const res = await postReaction(req).catch((e) => {
        console.log(e);
      });
      // console.log(res);
      if (res?.status !== "ok") {
        setTimeout(() => {
          setReaction("");
        }, 1500);
      }
    }
    if (reaction === "") {
      setReaction("Like");
      setTotalReacts((prev) => {
        return prev + 1;
      });
      const req = { postId: post._id, react: "Like" };

      const res = await postReaction(req).catch((e) => {
        console.log(e);
      });
      // console.log(res);
      if (res?.status !== "ok") {
        setTimeout(() => {
          setReaction("");
        }, 1500);
      }
    }
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
        className={`w-[96%] relative ${
          reaction !== "" && "py-2"
        } border-b-[1px] mt-2 h-9 cursor-pointer border-b-black/20`}
      >
        {totalReacts > 1 && reaction && (
          <div className="flex items-center justify-start gap-2 ">
            <div className="flex items-center">
              {reactIcons.slice(0, 3).map((i, index) => {
                return (
                  <img
                    key={index}
                    src={`../../../reacts/${i.toLowerCase()}.svg`}
                    alt=""
                    className="w-[1.3rem] group-active:scale-150 transition-all duration-300 "
                  />
                );
              })}
            </div>

            <span className="text-[15px] text-black/60 font-medium">{`You and ${
              totalReacts - 1
            } ${isTwoPpl === 1 ? "other" : "others"}`}</span>
          </div>
        )}
        {totalReacts > 1 && reaction === "" && (
          <div className="flex items-center justify-start gap-2 ">
            <div className="flex items-center">
              {reactIcons.map((i, index) => {
                return (
                  <img
                    key={index}
                    src={`../../../reacts/${i.toLowerCase()}.svg`}
                    alt=""
                    className="w-[1.3rem] group-active:scale-150 transition-all duration-300 "
                  />
                );
              })}
            </div>
            <span className="text-[15px] text-black/60 font-medium">{`${totalReacts} others`}</span>
          </div>
        )}
        {totalReacts === 1 && reaction === "" && (
          <div className="flex items-center justify-start gap-2 ">
            <div className="flex items-center">
              {reactIcons.map((i, index) => {
                return (
                  <img
                    key={index}
                    src={`../../../reacts/${i.toLowerCase()}.svg`}
                    alt=""
                    className="w-[1.3rem] group-active:scale-150 transition-all duration-300 "
                  />
                );
              })}
            </div>
            <span className="text-[15px] text-black/60 font-medium">{`${reactBy?.first_name} ${reactBy?.last_name}`}</span>
          </div>
        )}
        {totalReacts === 1 && reaction && (
          <div className="flex items-center justify-start gap-2 ">
            <div className="flex items-center">
              {reactIcons.map((i, index) => {
                return (
                  <img
                    key={index}
                    src={`../../../reacts/${reaction.toLowerCase()}.svg`}
                    alt=""
                    className="w-[1.3rem] group-active:scale-150 transition-all duration-300 "
                  />
                );
              })}
            </div>
            <span className="text-[15px] text-black/60 font-medium">{`${user.data?.first_name} ${user.data?.last_name}`}</span>
          </div>
        )}
        {/* {totalReacts >= 3 && !reaction && (
          <div className="flex items-center justify-start gap-2 ">
            <div className="flex items-center">
              {reactIcons.map((i, index) => {
                return (
                  <img
                    key={index}
                    src={`../../../reacts/${i.toLowerCase()}.svg`}
                    alt=""
                    className="w-[1.3rem] group-active:scale-150 transition-all duration-300 "
                  />
                );
              })}
            </div>

            <span className="text-[15px] text-black/60 font-medium">{`${totalReacts}`}</span>
          </div>
        )} */}
      </div>

      <div className="w-[96%] border-b-[1px] pt-2 border-b-black/20 pb-3 mb-3 flex items-center justify-around">
        <div className="post_interaction group relative">
          <div
            onClick={likeClick}
            onMouseOver={() => {
              setIsReact(true);
            }}
            className="flex items-center justify-center gap-2 w-full group hover:bg-transparent"
          >
            {reaction === "" && <i className="like_icon"></i>}
            {reaction !== "" && (
              <img
                src={`../../../reacts/${reaction?.toLowerCase()}.svg`}
                alt=""
                className="w-[1.3rem] group-active:scale-150 transition-all duration-300 "
              />
            )}
            <span
              className={`${
                reaction === "Like"
                  ? "text-[#056ADB]"
                  : reaction === "Angry"
                  ? "text-[#DF7B2A]"
                  : reaction === "Love"
                  ? "text-[#E73B54]"
                  : reaction === ""
                  ? "text-black"
                  : "text-[#ECB954]"
              } text-[16px] font-medium`}
            >
              {reaction ? reaction : "Like"}
            </span>
          </div>
          <div
            className={`absolute left-1 mobile:left-0 transition-all duration-300 group-hover:-translate-y-10 group-hover:z-10 group-hover:opacity-100 ${
              isReact && "group-hover:visible"
            } invisible opacity-0 -z-10 bg-white shadow-sm shadow-black/20 p-1 px-2 rounded-3xl w-[40vw]  mobile:w-[14rem] lg:w-[17rem]`}
          >
            <PopUpReaction
              onHover={setIsReact}
              selectReact={bindReaction}
              setReaction={setReaction}
            />
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
