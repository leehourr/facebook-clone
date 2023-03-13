import React, { useCallback, useEffect, useRef, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dots, Public } from "../../../svg";
import PopUpReaction from "./PopUpReaction";
import Emoji from "@emoji-mart/react";
import useClickOutside from "../../../helpers/clickOutside";
import Menulist from "./PostMenu/Menulist";
import {
  getReaction,
  postComment,
  postReaction,
  uploadImages,
} from "../../../utils/api-call";
import { createPortal } from "react-dom";
import ReactBy from "./ReactBy";
import { Backdrop } from "../../Ui/Backdrop";
import { LoadingStimulate } from "../../../utils/LoadingStimulate";
// import { useScrollTo } from "../../../Hooks/ScrollTo";
// import { LoadingStimulate } from "../../../utils/LoadingStimulate";
// import ReactDOM from "react-dom";

const FeedItem = ({ post, id }) => {
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
  // const [zoomPf, setZoomPf] = useState(false);
  // const [reactList, setReactList] = useState([]);
  const [reactBy, setReactBy] = useState([]);
  const [seeWhoReact, setSeeWhoReact] = useState(false);
  const [image, setImage] = useState([]);
  const [uploadImage, setUploadImage] = useState([]);
  const [comment, setComment] = useState([]);
  const [posting, setPosting] = useState(false);
  // const [isNewCmt, setIsNewCmt] = useState(false);
  const [hasImg, setHasImg] = useState(false);
  const [countCmt, setCountCmt] = useState(1);

  // const imageRef = useRef(null);

  // let isTwoPpl = totalReacts - 1;

  const textBg = useRef();
  const uploadedImg = post.images || null;

  // console.log(comment);
  // console.log(reactionData.length);
  // console.log("overall", reaction);
  useEffect(() => {
    setComment(
      (current) =>
        (current = post.comments.map((i) => {
          return i;
        }))
    );
    reactionData.forEach((i) => {
      for (const j in i) {
        setReactBy(i[j][0].reactBy);
      }
    });

    reactionData.slice(0, 3).forEach((i) => {
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
  }, [
    uploadedImg,
    post.background,
    reactionData,
    totalReacts,
    reactIcons,
    post.comments,
  ]);

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
    console.log("reaction", e, "on post", post);
    const req = { postId: post._id, react: e };
    console.log(" reaction", reaction);
    console.log(" from click", e);
    const bosKe = await checkIfBosKe(e);
    console.log("bosKe", bosKe);

    console.log("already have", e);

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
      console.log("where err orrc");
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
      console.log("diff one");
      if (bosKe) {
        console.log("kng bos ke ");
        setReactIcons((prev) => {
          return [...prev];
        });
      }
      if (!bosKe && reactIcons.length === 1) {
        setReactIcons((prev) => {
          return [...prev, e];
        });
      }
      if (!bosKe && reactIcons.length > 1) {
        console.log(" men kng bos ke ");
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
    console.log("in like", reaction);
    const bosKe = await checkIfBosKe(reaction);

    if (reaction !== "Like" && reaction !== "") {
      setReaction("");
      setTotalReacts((prev) => {
        return prev - 1;
      });
      if (reactIcons.includes(reaction) && !bosKe) {
        setReactIcons((prev) => {
          const newReact = prev.filter((i) => {
            return i !== reaction;
          });
          return [...newReact];
        });
      } else {
        setReactIcons((prev) => {
          return [...prev];
        });
      }

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
      setIsReact(false);
      setReaction("");
      setTotalReacts((prev) => {
        return prev - 1;
      });
      if (!bosKe) {
        setReactIcons((prev) => {
          const newReact = prev.filter((i) => {
            return i !== "Like";
          });
          return [...newReact];
        });
      } else {
        setReactIcons((prev) => {
          // const newReact = prev.filter((i) => {
          //   return i !== "Like";
          // });
          return [...prev];
        });
      }
      const req = { postId: post._id, react: "Like" };

      const res = await postReaction(req).catch((e) => {
        console.log(e);
      });
      // console.log(res);
      if (res?.status !== "ok") {
        setTimeout(() => {
          setReaction("Like");
        }, 1500);
      }
    }
    if (reaction === "") {
      setIsReact(false);
      setReaction("Like");
      setTotalReacts((prev) => {
        return prev + 1;
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
  };

  const toggleSeeWhoReact = () => {
    setSeeWhoReact((prev) => !prev);
  };
  // const imgClick = () => {
  //   // console.log(post.user?.username);
  //   setZoomPf((prev) => !prev);
  // };
  const commentHandler = () => {
    textRef.current.focus();
    textRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const getImage = (img) => {
    img.map((i) => setUploadImage((prev) => [...prev, i]));
    // setUploadImage([img]);
  };

  const selectImages = (e) => {
    setHasImg(true);
    console.log("from", post._id);
    const files = Array.from(e.target.files);
    console.log("files", files);
    getImage(files); // console.log(files);
    files.forEach((img) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readEvent) => {
        setImage((imgs) => [...imgs, readEvent.target.result]);
      };
    });
  };

  // console.log("image", image);
  const submitComment = async (e) => {
    if (e.key === "Enter") {
      setHasImg(false);
      try {
        setPosting(true);
        // setIsNewCmt(true);
        setCountCmt((prev) => prev + 1);
        setComment((prev) => [
          {
            _id: Math.random(),
            comment: text,
            image: image[0] || "",
            commentBy: {
              picture: user.data?.picture,
              first_name: user.data?.first_name,
              last_name: user.data?.last_name,
              username: user.data?.username,
              isNew: true,
            },
          },
          ...prev,
        ]);
        setText("");
        if (uploadImage.length !== 0) {
          // console.log("in upload", uploadImage);
          // setIsLoading(true);
          // const img = URL.createObjectURL(uploadImage[0]);
          // const postImages = uploadImage.map((img) => {
          //   return URL.createObjectURL(img);
          // });
          // console.log("postImages", postImages);

          const path = `${user.username}/post_images/${post._id}`;
          let formData = new FormData();
          formData.append("path", path);
          uploadImage.map((i) => {
            return formData.append("file", i);
          });

          console.log(uploadImage);
          console.log(formData);
          const res = await uploadImages(formData, path);
          // console.log("res", res);
          // const date = new Date();
          await LoadingStimulate(2000);
          await postComment({
            comment: text,
            image: res[0].url,
            postId: post._id,
          });
          setPosting(false);
          // setIsNewCmt(false);
          // console.log("post cmt", cmt);
        } else {
          await LoadingStimulate(2000);
          await postComment({
            comment: text,
            image: "",
            postId: post._id,
          });
          // console.log("post cmt", post._id);
          comment.forEach((e) => (e.isNew = false));
          setPosting(false);
          // setIsNewCmt(false);
        }
      } catch (err) {
        setTimeout(() => {
          setPosting(false);
          // setIsNewCmt(false);
          setComment((prev) => {
            return prev.filter((i) => i !== prev[prev.length - 1]);
          });
        }, [2000]);
        console.log(err);
      }
    }
  };

  const test = () => {
    console.log(post.user.username);
  };

  const viewmoreCmt = () => {
    setCountCmt((prev) => prev + 3);
  };
  return (
    <div className="flex flex-col relative items-center w-full rounded-lg shadow-sm shadow-black/20 bg-white dark:bg-[#242526] dark:text-white">
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
                <span className="text-[13px] text-black/80 dark:text-white/70 whitespace-nowrap">{`Updated ${
                  user?.data?.gender === "male" ? "his" : "her"
                } profile picture`}</span>
              )}
            </Link>

            <div className="flex items-center text-[14px] dark:text-white/70 leading-4 justify-center gap-1">
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
          className="relative cursor-pointer w-8 h-8 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center"
        >
          <Dots />

          <div className="absolute z-30 top-7 w-[19.5rem] bg-white dark:bg-[#242526] shadow-mds -right-0 shadow-black/20 rounded-lg ">
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
          {img.map((i, index) => (
            <img
              // onClick={imgClick}
              key={index}
              className={`transition-all duraion-100 ${
                post.type === "profilePicture" &&
                "rounded-full w-[55%] mx-auto mt-6 ring-4 ring-white dark:ring-white/10"
              } `}
              src={i}
              alt=""
            />
          ))}
        </div>
      </div>
      <div
        onClick={toggleSeeWhoReact}
        className={`w-[96%] relative ${
          reaction !== "" && "py-2"
        } border-b-[1px] mt-2 h-9 cursor-pointer border-b-black/20 dark:border-b-[#3A3C3E] group`}
      >
        {totalReacts > 1 && reaction && (
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

            <span className="text-[15px] group-hover:underline underline-offset-3 hover:underline text-black/60 dark:text-white/70 font-medium">{`You and ${
              totalReacts - 1
            } ${totalReacts - 1 === 1 ? "other" : "others"}`}</span>
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
            <span className="text-[15px] group-hover:underline underline-offset-3 hover:underline group text-black/60 dark:text-white/70 font-medium">{`${totalReacts} others`}</span>
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
            <span className="text-[15px] group-hover:underline underline-offset-3 hover:underline text-black/60 dark:text-white/70 font-medium">{`${reactBy?.first_name} ${reactBy?.last_name}`}</span>
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
            <span className="text-[15px] group-hover:underline underline-offset-3 hover:underline text-black/60 dark:text-white/70 font-medium">{`${user.data?.first_name} ${user.data?.last_name}`}</span>
          </div>
        )}
      </div>

      <div className="w-[96%] border-b-[1px] pt-2 border-b-black/20 dark:border-b-[#3A3C3E] pb-3 mb-3 flex items-center justify-around">
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
                className="w-[1.3rem] group-active:scale-150 transition-all duration-100 "
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
                  ? "text-black dark:text-white/70"
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
        <div
          onClick={commentHandler}
          className="post_interaction dark:text-white/70"
        >
          <i className="comment_icon"></i>
          <span>Comment</span>
        </div>
        <div className="post_interaction dark:text-white/70">
          <i className="share_icon"></i>
          <span>Share</span>
        </div>
      </div>

      {/* //comment */}

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
            onKeyDown={submitComment}
            onChange={(e) => setText(e.target.value)}
            className="bg-black/5 dark:bg-[#3A3B3C] caret-black w-full outline-none p-2 px-2 rounded-xl"
            type="text"
            placeholder="Write a comment..."
          />
          <div className="absolute top-3 right-2 flex items-center justify-center gap-2 child:cursor-pointer">
            <i onClick={toggleEmoji} className="emoji_icon"></i>
            <label
              // htmlFor="cmt"
              // onClick={openUploadImage}
              className="camera_icon self-center"
            >
              <input
                // ref={imageRef}
                // id="cmt"
                hidden
                accepts="image/*"
                onChange={selectImages}
                type="file"
              />
            </label>
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
                theme={localStorage.getItem("darkTheme") ? "dark" : "light"}
                maxFrequentRows="5"
                onEmojiSelect={selectEmoji}
                //  onClickOutside={toggleEmoji}
              />
            </div>
          )}
        </div>
      </div>
      {image.length > 0 && hasImg && (
        <Comment
          test={test}
          setImage={setImage}
          id={id}
          text={text}
          image={image}
        />
      )}
      <div className="w-[96%] flex flex-col gap-3 items-start my-2">
        {comment.length > 0 &&
          comment
            .sort((a, b) => {
              return new Date(b.commentAt) - new Date(a.commentAt);
            })
            .slice(0, countCmt)
            .map((i, id) => (
              <div
                key={i._id}
                className="w-full flex items-start justify-start gap-1"
              >
                <img
                  className="w-9 h-9 rounded-full"
                  src={i.commentBy.picture}
                  alt=""
                />
                <div className="flex flex-col gap-1 dark:text-white/80 items-start justify-start">
                  <div className="p-2 bg-black/5 dark:bg-[#3A3B3C] rounded-xl">
                    <Link
                      to={`/${i.commentBy.username}`}
                      className="font-semibold"
                    >
                      {i.commentBy.first_name + "" + i.commentBy.last_name}
                    </Link>
                    <p>{i.comment}</p>
                  </div>
                  <img src={i.image} className="w-36 rounded-lg" alt="" />
                  {posting && i.isNew ? (
                    <span className="text-[12px] font-medium">Posting...</span>
                  ) : (
                    <div className="flex items-center gap-2 justify-center">
                      <span className="text-[12px] font-medium">Like</span>
                      <span className="text-[12px] font-medium">Reply</span>
                      <div className="text-[12px]">
                        <Moment fromNow interval={3}>
                          {i.commentAt || Date.now()}
                        </Moment>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        {countCmt < comment.length ? (
          <span
            onClick={viewmoreCmt}
            className="mt-1 font-semibold text-black/70 dark:text-white/70 cursor-pointer"
          >
            View more comments
          </span>
        ) : undefined}
      </div>

      {seeWhoReact &&
        createPortal(
          <ReactBy
            id={post._id}
            reactLists={reactionData}
            reactIcons={reactIcons}
          />,
          document.getElementById("overlay")
        )}
      {seeWhoReact &&
        createPortal(
          <Backdrop onClick={toggleSeeWhoReact} className="bg-black/50 z-60" />,
          document.getElementById("overlay")
        )}
    </div>
  );
};

export default FeedItem;

const Comment = ({ test, text, id, setImage, image }) => {
  return (
    <div onClick={test} className="w-[96%]  flex items-start justify-between">
      {image.map((i) => (
        <img
          key={id}
          className="w-32 mr-auto ml-3 mb-3 rounded-lg"
          src={i}
          alt=""
        />
      ))}

      {/* <img
      className="w-32 mr-auto ml-3 mb-3 rounded-lg"
      src={image}
      alt=""
    /> */}
      <div
        onClick={() => {
          setImage([]);
        }}
        className="z-40 cursor-pointer bg-white hover:bg-white/80 w-8 h-9 flex items-center justify-center rounded-full "
      >
        <i className="exit_icon"></i>
      </div>
    </div>
  );
};
