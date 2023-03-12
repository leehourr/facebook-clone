import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "../../../svg";
import CreateStory from "./CreateStory";
import FriendStories from "./FriendStories";

const Storie = () => {
  const [isHovering, setIsHovering] = useState(false);
  const nav = useNavigate();

  const toStories = () => {
    nav("/stories");
  };

  return (
    <div className="w-full hide:w-[78%] hide:ml-2 unhide:w-full undide:mx-auto relative h-full last-child:hidden flex items-center gap-x-[0.6rem]">
      <CreateStory />
      {/* <div className="w-[80%] :w-[87%]  flex h-full gap-x-[0.6rem]"> */}
      {stories.map((i) => (
        <FriendStories
          key={i.profile_name}
          onNav={toStories}
          profile={i.profile_picture}
          image={i.image}
          name={i.profile_name}
          last={i.last}
        />
      ))}
      {/* </div> */}
      <div
        onClick={toStories}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        className="absolute cursor-pointer hover:bg-slate-100 -right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-[#242526] shadow-md shadow-black/10"
      >
        <ArrowRight color="#65676b" />
      </div>
      {isHovering && (
        <span className="absolute shadow-md shadow-black top-[59.5%] text-[14px] bg-black text-white p-[0.4rem] px-3 rounded-lg opacity-80 -right-14">
          See all stories
        </span>
      )}
    </div>
  );
};

export default Storie;

const stories = [
  {
    profile_picture: "../../stories/jett2.jpg",
    profile_name: "Sage",
    image: "../../stories/jett.jpg",
  },
  {
    profile_picture: "../../stories/johan.jpg",
    profile_name: "Johan Libert",
    image: "../../stories/monster.jpg",
  },
  {
    profile_picture: "../../stories/caat.jpg",
    profile_name: "Cat",
    image: "../../stories/cat.jpg",
  },
  {
    profile_picture: "../../stories/me1.jpg",
    profile_name: "Hire Me",
    image: "../../stories/story.jpg",
    last: true,
  },
];
