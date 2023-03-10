import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ArrowDown, Dots } from "../../svg";
import FriendList from "./FriendList";
import Intro from "./Intro";
import Photo from "./Photo";
// import Post from "./Post";
import StickyBox from "react-sticky-box";
import CreatePost from "../Home/Posts/CreatePost";
// import Feed from "../Home/Feeds/Feed";
import { useSelector } from "react-redux";
import { useScrollTo } from "../../Hooks/ScrollTo";
import Feed from "../Home/Feeds/Feed";
import { createPortal } from "react-dom";
import { Backdrop } from "../Ui/Backdrop";
// import Cropper from "./PhotoCropper";
import PhotoCropper from "./PhotoCropper";
import {
  accepFriendReq,
  addFriend,
  cancelFriReq,
  deleteReq,
  follow,
  unfollow,
  unfriend,
} from "../../utils/api-call";
import ClipLoader from "react-spinners/ClipLoader";
import useClickOutside from "../../helpers/clickOutside";

const UserProfile = ({ userData, children }) => {
  const { name } = useParams();
  // // const top = useRef();
  const { user } = useSelector((state) => ({ ...state }));
  const [image, setImage] = useState([]);
  const [pfPics, setPfPic] = useState([]);
  const navigate = useNavigate();
  // const [selectedPf, setSelectedPf] = useState(false);
  const imageRef = useRef();
  const [discard, setDiscard] = useState(false);
  // const [isVisitor, setIsVisitor] = useState(false);
  // console.log(userData.friendship);
  const [photo, setPhoto] = useState([]);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [friendShip, setFriendShip] = useState(userData.friendship);
  let friendShip = userData.friendship;

  const isVisitor = user.data?.username !== name;

  useEffect(() => {
    // setFriendShip(userData.friendship)
    setIsLoading(false);
    if (!isVisitor) {
      if (pfPics.length > 0) return;
      user.posts.map((i) => {
        if (i.type === "profilePicture") {
          i.images.map((j) => setPfPic((prev) => [...prev, { src: j.url }]));
        }
      });
    }

    if (isVisitor) {
      // console.log("in effect");
      if (photo.length > 0) return;

      userData.posts.map((i) => {
        if (i.images) {
          // console.log(i.images);

          i.images.map((j) => setPhoto((prev) => [...prev, { src: j.url }]));
        }
        // return photo;
      });
    } else {
      if (user.posts?.length > 0) {
        if (photo.length > 0) return;

        user.posts?.map((i) => {
          if (i.images) {
            i.images.map((j) => setPhoto((prev) => [...prev, { src: j.url }]));
          }
          // return photo;
        });
      } else {
        setPhoto([]);
      }
    }
  }, [isVisitor, user.data, user.posts, userData, name, pfPics,photo]);

  useScrollTo(0, 0);

  const selectImages = (e) => {
    const files = Array.from(e.target.files);
    // console.log("files", files[0]);
    files.forEach((img) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readEvent) => {
        setImage((imgs) => [...imgs, readEvent.target.result]);
      };
    });
  };
  const openUpdatePf = () => {
    setIsUpdateOpen((prev) => !prev);
  };
  const closeBackdrop = () => {
    setIsUpdateOpen(false);
  };

  const toggleCropper = () => {
    // console.log("clicked");

    // setIsCropperOpen(toggle);
    if (image.length > 0) {
      setDiscard(true);
    }
  };

  const closeCropper = () => {
    // console.log("clicked");

    // setIsCropperOpen(toggle);

    setDiscard(false);
    setImage([]);
  };

  const selectOldPf = (e) => {
    setImage(e);
  };

  const addFriHandler = async () => {
    try {
      setIsLoading(true);
      const res = await addFriend(userData.profile._id);
      // console.log("res", res);
      if (res.status === "ok") {
        // setIsLoading(false);
        navigate(`/${name}`);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const cancelReq = async () => {
    try {
      setIsLoading(true);
      const res = await cancelFriReq(userData.profile._id);
      // console.log("res", res);
      if (res.status === "ok") {
        navigate(`/${name}`);
        // setIsLoading(false);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const accepFriend = async () => {
    try {
      setIsLoading(true);
      const res = await accepFriendReq(userData.profile._id);
      console.log(res);
      if (res.status === "ok") {
        navigate(`/${name}`);
        // setIsLoading(false);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const unfriHandler = async () => {
    try {
      setIsLoading(true);
      const res = await unfriend(userData.profile._id);
      console.log(res);
      if (res.status === "ok") {
        navigate(`/${name}`);
        // setIsLoading(false);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const unfollowHandler = async () => {
    try {
      // setIsLoading(true);
      const res = await unfollow(userData.profile._id);
      console.log(res);
      if (res.status === "ok") {
        navigate(`/${name}`);
        // setIsLoading(false);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const deleteRequest = async () => {
    try {
      setIsLoading(true);
      const res = await deleteReq(userData.profile._id);
      // console.log(res);
      if (res.status === "ok") {
        navigate(`/${name}`);
        // setIsLoading(false);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const followHandler = async () => {
    try {
      // setIsLoading(true);
      const res = await follow(userData.profile._id);
      // console.log(res);
      if (res.status === "ok") {
        navigate(`/${name}`);
        // setIsLoading(false);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  let addedFriend =
    !friendShip?.friends &&
    friendShip?.following &&
    friendShip.requestSent &&
    !friendShip.requestReceived;
  let receivedReq =
    !friendShip?.friends &&
    !friendShip?.following &&
    !friendShip.requestSent &&
    friendShip.requestReceived;
  let notFriend =
    !friendShip.friends &&
    (!friendShip.following || friendShip.following) &&
    !friendShip.requestSent &&
    !friendShip.requestReceived;
  let isFriend =
    friendShip?.friends &&
    (friendShip?.following || !friendShip.following) &&
    !friendShip.requestSent &&
    !friendShip.requestReceived;
  let isFollowed =
    (!friendShip?.friends || friendShip.friends) &&
    friendShip?.following &&
    !friendShip.requestSent &&
    !friendShip.requestReceived;
  // console.log(isFollowed);
  return (
    <>
      <header
        // id={`${name}`}
        className="bg-white scroll-smooth shadow-sm shadow-black/20 h-[25.6rem] mobile:h-[32.3rem] lg:h-[36.2rem]  xl:h-[40.8rem] relative w-[86%] transition-all duration-100 flex flex-col   mobile:w-[96%] xxl:w-full"
      >
        <div className="relative w-full rounded-b-lg transition-all duration-150 bg-black/30 top-0 h-[8.5rem] max-w-[77rem] mx-auto  mobile:h-[15rem] lg:h-[23rem] xl:h-[28rem]">
          <img className="w-full" alt="" />
          {!isVisitor && (
            <div className="absolute z-10 cursor-pointer p-2 px-3 rounded-lg right-11 xl:right-8 bottom-3 flex items-center gap-2 justify-center bg-white">
              <i className="camera_filled_icon"></i>
              <span className="font-semibold hidden lg2:block">
                Add cover photo
              </span>
            </div>
          )}

          <div className="w-full absolute -bottom-[16.3rem] lg:-bottom-[12rem] transition-all duration-100 mx-auto max-w-[77rem] flex flex-col">
            <div className="w-full pb-5 mb-3 border-b-[1px] border-b-black/20 flex flex-col lg2:flex-row items-center lg2:items-end justify-center lg2:justify-between lg2:pr-10 xl:pr-8">
              <div className=" w-[97%] lg2:w-[50%] flex flex-col lg2:flex-row items-center lg2:items-end justify-center gap-1 lg2:gap-2 ">
                <div className="relative w-[9.4rem] h-[9.4rem] rounded-full ring-4 ring-white bg-black/40 ">
                  <img
                    className="w-full rounded-full"
                    src={userData.profile.picture}
                    alt=""
                  />
                  {!isVisitor && (
                    <div
                      onClick={openUpdatePf}
                      className="cursor-pointer absolute flex items-center justify-center right-1 bottom-2 bg-[#D8DADF] w-9 h-9 rounded-full "
                    >
                      <i className="camera_filled_icon"></i>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center lg:items-start justify-center">
                  <h1 className="text-[32px] font-bold">{`${userData.profile.first_name} ${userData.profile.last_name}`}</h1>
                  <span className="text-[18px] font-bold text-black/50">
                    202 friends
                  </span>
                </div>
              </div>
              <div className="mobile:w-[16.5rem]  mt-3 flex items-center justify-center gap-2">
                {!isVisitor && (
                  <>
                    <div className="bg-[#1A6ED8] cursor-pointer rounded-lg text-white w-1/2 py-[0.45rem] text-center">
                      <span className="text-[17px]  font-medium ">
                        + Add to story
                      </span>
                    </div>
                    <div className="w-1/2 bg-black/10 cursor-pointer flex items-center  justify-center gap-1 rounded-lg text-center py-[0.45rem]">
                      <i className="edit_icon"></i>
                      <span className="text-[17px]">Edit profile</span>
                    </div>
                  </>
                )}

                {isVisitor && notFriend && !isFollowed && (
                  <>
                    <AddFriBtn
                      isLoading={isLoading}
                      onClick={addFriHandler}
                      notFriend
                    />
                    <FollowBtn onClick={followHandler} isLoading={isLoading} />
                    <MessageBtn />
                  </>
                )}
                {isVisitor && addedFriend && (
                  <>
                    <CancelBtn onClick={cancelReq} isLoading={isLoading} />
                    <MessageBtn />
                  </>
                )}
                {isVisitor && receivedReq && (
                  <>
                    <ResponseBtn
                      onClick={accepFriend}
                      onDeleteReq={deleteRequest}
                      isLoading={isLoading}
                    />
                    <MessageBtn />
                  </>
                )}
                {isVisitor && isFriend && (
                  <>
                    <FriendBtn
                      isLoading={isLoading}
                      onUnfri={unfriHandler}
                      onUnfollow={unfollowHandler}
                      onFollow={followHandler}
                      isFollowed={isFollowed}
                    />
                    <MessageBtn friend />
                  </>
                )}
                {isVisitor && isFollowed && notFriend && (
                  <>
                    <AddFriBtn
                      isLoading={isLoading}
                      onClick={addFriHandler}
                      notFriend
                    />
                    <UnfollowBtn onUnfollow={unfollowHandler} />
                    <MessageBtn />
                  </>
                )}
              </div>
            </div>

            <div className="w-[96%] mx-auto max-w-[77rem] flex items-center justify-between xl:pr-1 gap-3">
              <div className="w-fit flex  items-center font-semibold text-black/60">
                <div className="b-black/50 h-full flex items-start">
                  <NavLink
                    to={`/${name}`}
                    className={(isActive) =>
                      isActive
                        ? "text-[#1A6ED8] border-b-[3px] border-b-[#1A6ED8] rounded-b-none pf_menus"
                        : "pf_menus"
                    }
                  >
                    Post
                  </NavLink>
                  <NavLink className="pf_menus">About</NavLink>
                  <NavLink className="pf_menus hidden mobile2:block">
                    Friends
                  </NavLink>
                  <NavLink className="pf_menus hidden sm:block">Photos</NavLink>
                  <NavLink className="pf_menus hidden hideVideo:block">
                    Videos
                  </NavLink>
                  <NavLink className="pf_menus w-[6rem] hidden md:block whitespace-nowrap px-3">
                    Check-ins
                  </NavLink>
                </div>
                <div className="w-[5rem] mr-full z-20 hover:bg-black/10 cursor-pointer py-2 px-3 rounded-lg flex items-center">
                  <button className="w-full">More</button>
                  <div className="pt-1">
                    <ArrowDown color={"rgb(0 0 0 / 0.6)"} />
                  </div>
                </div>
              </div>
              <div className="p-2 cursor-pointer w-[3rem] px-[0.8rem] bg-black/5 rounded-lg">
                <Dots />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="w-[86%] md2:w-[70%] xl:w-[80%] transition-all duration-100 md2:mx-auto flex flex-col xl:flex-row gap-3 mobile:w-[96%]  xxl:max-w-[77rem] mb-10 xxl:mx-auto">
        <div className="xl:w-[40%]">
          <StickyBox offsetTop={70} offsetBottom={40}>
            <div className="profile_section">
              <Intro />
            </div>
            <div className="profile_section">
              <Photo photos={photo} />
            </div>
            <div className="profile_section">
              <FriendList />
            </div>
          </StickyBox>
        </div>
        <div
          className={`flex-grow xl:w-[60%] mx-3 ${
            isVisitor ? "xl:mt-0" : "xl:mt-3"
          } xl:mx-auto`}
        >
          {!isVisitor ? <CreatePost section={section} /> : undefined}
          <PostOption isVisitor={isVisitor} />
          <Feed feedData={userData.posts} profile />
        </div>
      </div>
      {isUpdateOpen &&
        createPortal(
          <Backdrop
            onClick={image.length > 0 ? toggleCropper : openUpdatePf}
            className="fixed bg-gray-300/30 top-0 z-40 left-0 flex items-center justify-center"
          />,
          document.getElementById("backdrop")
        )}
      {isUpdateOpen &&
        createPortal(
          <div className="w-[97%] mobile:w-[43.8rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 mx-2 text-center bg-white shadow-sm shadow-black/20 rounded-lg">
            <div className="w-full  pb-6 border-b-[1px] border-b-black/20 relative">
              <h1 className="text-[20px] mt-5 font-bold">
                Update profile picture
              </h1>
              <div
                onClick={image.length > 0 ? toggleCropper : openUpdatePf}
                className="absolute cursor-pointer top-0 right-4 w-9 h-9 bg-black/10 flex items-center justify-center rounded-full"
              >
                <i className="exit_icon" alt="" />
              </div>
            </div>

            {image.length > 0 ? (
              <PhotoCropper
                image={image}
                setImage={setImage}
                onCancel={toggleCropper}
                onClose={closeCropper}
                closeBackdrop={closeBackdrop}
                discard={discard}
                setDiscard={setDiscard}
              />
            ) : (
              <div>
                <label htmlFor="uploadImg" className="cursor-pointer">
                  <div
                    htmlFor="uploadImg"
                    onClick={toggleCropper}
                    className="w-[97%] cursor-pointer mx-auto my-3 bg-[#DBE7F2] rounded-lg px-3 text-[#1A6ED8] text-[16px] font-medium p-[0.3rem] "
                  >
                    + Upload photo
                    <input
                      ref={imageRef}
                      multiple
                      hidden
                      onChange={selectImages}
                      id="uploadImg"
                      type="file"
                    />
                  </div>
                </label>
                <div className="w-[95%] h-[20rem] mobile:h-full overflow-y-auto scrollbar-thin mx-auto flex flex-col items-start mb-5">
                  <h1 className="text-left font-bold text-[16px]">
                    Your profile pictures
                  </h1>
                  <div className="flex items-center justify-start flex-wrap gap-1 ">
                    {pfPics.map((src, i) => (
                      <img
                        onClick={selectOldPf.bind(null, src.src)}
                        key={i}
                        src={src.src}
                        alt=""
                        className="w-[8rem] mobile:w-[8.1rem] h-[8.1rem] rounded-lg hover:blur-sm cursor-pointer"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>,
          document.getElementById("overlay")
        )}
    </>
  );
};

export default UserProfile;

const PostOption = ({ isVisitor }) => {
  return (
    <div className="w-full bg-white  mt-3  rounded-lg pt-3">
      <div className="flex pb-2 mb-3 items-center justify-between border-b-[1px] border-b-black/10">
        <h1 className="text-[18px] font-bold mx-4 ">Posts</h1>
        <div className="flex mr-4 items-center justify-center gap-2">
          <div className="flex bg-black/10 rounded-md px-3 py-1 items-center gap-2">
            <i className="equalize_icon"></i>
            <span>Filters</span>
          </div>
          {!isVisitor && (
            <div className="flex bg-black/10 rounded-md px-3 py-1 items-center justify-center gap-2">
              <i className="manage_icon"></i>
              <span>Manage posts</span>
            </div>
          )}
        </div>
      </div>
      {!isVisitor && (
        <section className="flex px-4 items-center justify-between">
          <NavLink
            to=""
            className="w-1/2 flex gap-1 items-center pb-2 justify-center border-b-[3px] border-b-[#1A6ED8]"
          >
            <i className="list_icon filter_blue"></i>
            <span className="text-[#1A6ED8]"> List views</span>
          </NavLink>
          <NavLink className="w-1/2 flex gap-1 items-center justify-center">
            <i className="grid_icon"></i>
            <span className="text-black/70"> Grid view</span>
          </NavLink>
        </section>
      )}
    </div>
  );
};
//({ isActive }) => isActive?""

const section = {
  icon: <i className="microphone_icon"></i>,
  name: "Life event",
};

//btns
const AddFriBtn = ({ onClick, notFriend, isLoading }) => {
  // console.log("in add btn", isLoading);
  return (
    <div
      onClick={onClick}
      className={`px-5 ${
        notFriend ? "bg-[#1A6ED8] text-white" : "bg-black/10"
      } whitespace-nowrap cursor-pointer flex items-center  justify-center gap-[0.3rem] rounded-lg text-center py-[0.45rem]`}
    >
      {isLoading ? (
        <ClipLoader color="white" size={20} />
      ) : (
        <img
          src="../../../icons/addFriend.png"
          alt=""
          className={`${notFriend ? "invert" : ""}`}
        />
      )}
      <span className="text-[17px]">Add friend</span>
    </div>
  );
};

const UnfollowBtn = ({ onUnfollow }) => {
  const [isLoading, setIsLoading] = useState(false);
  const submit = () => {
    setIsLoading(true);
    onUnfollow();
  };
  return (
    <div
      // onClick={toggleOption}
      onClick={submit}
      className="bg-black/10 px-5  whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer rounded-lg py-[0.45rem] text-center"
    >
      {isLoading ? (
        <ClipLoader size={20} />
      ) : (
        <img src="../../../icons/unfollowOutlined.png" alt="" />
      )}
      <span
        // onClick={submit}
        className=" text-[17px]"
      >
        Unfollow
      </span>
    </div>
  );
};

const FriendBtn = ({
  isLoading,
  onUnfri,
  onUnfollow,
  onFollow,
  isFollowed,
}) => {
  const [openOptions, setOpenOptions] = useState(false);

  const option = useRef(null);
  useClickOutside(
    option,
    useCallback(() => {
      setOpenOptions(false);
    }, [])
  );
  const toggleOption = () => {
    setOpenOptions((prev) => !prev);
  };
  const unfri = () => {
    toggleOption();
    onUnfri();
  };

  const unfollow = () => {
    toggleOption();
    onUnfollow();
  };

  const follow = () => {
    toggleOption();
    onFollow();
  };
  return (
    <div ref={option} className="relative">
      <div
        onClick={toggleOption}
        className="bg-black/10 px-5 whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer rounded-lg py-[0.45rem] text-center"
      >
        {isLoading ? (
          <ClipLoader size={20} />
        ) : (
          <img src="../../../icons/friends.png" alt="" className="" />
        )}
        <span className="text-[17px]  font-medium ">Friends</span>
      </div>
      {openOptions && (
        <div className="bg-white z-60 text-black flex flex-col items-start absolute py-4 top-12 shadow-[1px_10px_20px_10px_rgba(0,0,0,0.2)] rounded-lg p-3 w-[20rem]">
          <div
            onClick={isFollowed ? unfollow : follow}
            className="hover:bg-black/10 w-full pl-2 rounded-lg flex items-center justify-start "
          >
            {isFollowed ? (
              <>
                <img src="../../../icons/unfollowOutlined.png" alt="" />
                <span
                  // onClick={submit}
                  className=" cursor-pointer w-full text-left p-2 rounded-lg"
                >
                  Unfollow
                </span>
              </>
            ) : (
              <>
                <img src="../../../icons/follow.png" alt="" className="" />
                <span
                  // onClick={submit}
                  className=" cursor-pointer w-full text-left p-2 rounded-lg"
                >
                  Follow
                </span>
              </>
            )}
          </div>
          <div
            onClick={unfri}
            className="hover:bg-black/10 w-full pl-2 rounded-lg flex items-center justify-start "
          >
            <img
              src="../../../icons/cancelRequest.png"
              alt=""
              className=" fill-black"
            />
            <span className=" cursor-pointer w-full text-left p-2 rounded-lg">
              Unfriend
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const CancelBtn = ({ onClick, isLoading }) => {
  return (
    <div
      onClick={onClick}
      className="bg-black/10 px-5 whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer rounded-lg py-[0.45rem] text-center"
    >
      {isLoading ? (
        <ClipLoader size={20} />
      ) : (
        <img src="../../../icons/cancelRequest.png" alt="" className="" />
      )}
      <span className="text-[17px]  font-medium ">Cancel request</span>
    </div>
  );
};

const ResponseBtn = ({ isLoading, onClick, onDeleteReq }) => {
  const [openOptions, setOpenOptions] = useState(false);
  const option = useRef(null);
  useClickOutside(
    option,
    useCallback(() => {
      setOpenOptions(false);
    }, [])
  );
  const toggleOption = () => {
    setOpenOptions((prev) => !prev);
  };
  const submit = () => {
    setOpenOptions((prev) => !prev);
    onClick();
  };

  const onDelete = () => {
    setOpenOptions((prev) => !prev);
    onDeleteReq();
  };
  return (
    <div ref={option} className="relative">
      <div
        onClick={toggleOption}
        className="bg-[#1A6ED8] px-5  text-white  whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer rounded-lg py-[0.45rem] text-center"
      >
        {isLoading ? (
          <ClipLoader color="white" size={20} />
        ) : (
          <img src="../../../icons/friends.png" alt="" className="invert " />
        )}
        <span className="text-[17px]  font-medium ">Response</span>
      </div>
      {openOptions && (
        <div className="bg-white z-60  text-black flex flex-col items-start absolute py-4 top-12 shadow-[1px_10px_20px_10px_rgba(0,0,0,0.2)] rounded-lg p-3 w-[20rem]">
          <span
            onClick={submit}
            className="hover:bg-black/10 cursor-pointer w-full text-left p-2 rounded-lg"
          >
            Confirm
          </span>
          <span
            onClick={onDelete}
            className="hover:bg-black/10 cursor-pointer w-full text-left p-2 rounded-lg"
          >
            Delete request
          </span>
        </div>
      )}
    </div>
  );
};

const FollowBtn = ({ onClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const submit = () => {
    setIsLoading(true);
    onClick();
  };
  return (
    <div
      onClick={submit}
      className="bg-[#1A6ED8]  px-5 whitespace-nowrap flex items-center justify-center gap-[0.3rem] cursor-pointer rounded-lg text-white w-1/2 py-[0.45rem] text-center"
    >
      {isLoading ? (
        <ClipLoader color="white" size={20} />
      ) : (
        <img src="../../../icons/follow.png" alt="" className="invert" />
      )}
      <span className="text-[17px]  font-medium ">Follow</span>
    </div>
  );
};

const MessageBtn = ({ onClick, isLoading, friend }) => {
  return (
    <div
      onClick={onClick}
      className={`w-1/2 mr-2 ${
        friend ? "bg-[#1A6ED8] text-white" : "bg-black/10"
      } px-5 cursor-pointer flex items-center  justify-center gap-[0.3rem] rounded-lg text-center py-[0.45rem]`}
    >
      {isLoading ? (
        <ClipLoader color="white" size={20} />
      ) : (
        <img
          src="../../../icons/message.png"
          alt=""
          className={`${friend ? "invert" : ""}`}
        />
      )}
      <span className="text-[17px]">Message</span>
    </div>
  );
};
