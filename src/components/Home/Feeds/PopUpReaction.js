import React from "react";

const reactsArray = [
  {
    name: "like",
    image: "../../../reacts/like.gif",
  },
  {
    name: "love",
    image: "../../../reacts/love.gif",
  },
  {
    name: "haha",
    image: "../../../reacts/haha.gif",
  },
  {
    name: "wow",
    image: "../../../reacts/wow.gif",
  },
  {
    name: "sad",
    image: "../../../reacts/sad.gif",
  },
  {
    name: "angry",
    image: "../../../reacts/angry.gif",
  },
];
export default function PopUpReaction({ onToggle, closeReaction }) {
  return (
    <div
      className="flex gap-1"
      onMouseOver={() => {
        onToggle();
      }}
    //   onMouseOut={() => {
    //     closeReaction();
    //   }}
    >
      {reactsArray.map((react, i) => (
        <div
          className="cursor-pointer transition-all duration-100 hover:scale-125"
          key={i}
        >
          <img src={react.image} alt="" />
        </div>
      ))}
    </div>
  );
}
