import React from "react";
import CreateStory from "./CreateStory";
import FriendStories from "./FriendStories";

const Storie = () => {
  return (
    <div className="w-full h-full flex items-center space-x-[0.6rem]">
      <CreateStory />
      <FriendStories />
      <FriendStories />
      <FriendStories />
      <FriendStories />
    </div>
  );
};

export default Storie;

const stories = [
  {
    profile_picture: "../../stories/profile1.jpg",
    profile_name: "Elon Musk",
    image: "../../stories/1.jpg",
  },
  {
    profile_picture: "../../stories/profile2.jpg",
    profile_name: "South park",
    image: "../../stories/2.png",
  },
  {
    profile_picture: "../../stories/profile3.png",
    profile_name: "The Sopranos",
    image: "../../stories/3.jpg",
  },
  {
    profile_picture: "../../stories/profile4.jfif",
    profile_name: "Football World",
    image: "../../stories/4.jpg",
  },
  {
    profile_picture: "../../stories/profile5.png",
    profile_name: "The Witcher Wild Hunt",
    image: "../../stories/5.jfif",
  },
];
