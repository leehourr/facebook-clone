import React, { useState } from "react";

const reactsArray = [
  {
    name: "Like",
    image: "../../../reacts/like.gif",
  },
  {
    name: "Love",
    image: "../../../reacts/love.gif",
  },
  {
    name: "Haha",
    image: "../../../reacts/haha.gif",
  },
  {
    name: "Wow",
    image: "../../../reacts/wow.gif",
  },
  {
    name: "Sad",
    image: "../../../reacts/sad.gif",
  },
  {
    name: "Angry",
    image: "../../../reacts/angry.gif",
  },
];
export default function PopUpReaction({ onHover, closeReaction, setReaction }) {
  const reactionPostHandler = (e) => {
    // console.log(e);
    setReaction(e);
  };
  return (
    <div
      onMouseOver={() => {
        onHover(true);
      }}
      className="flex gap-1"
    >
      {reactsArray.map((react, i) => (
        <Reactions
          key={i}
          onHover={onHover}
          onClick={reactionPostHandler.bind(null, react.name)}
          name={react.name}
          image={react.image}
        />
      ))}
    </div>
  );
}

const Reactions = ({ name, image, onClick, onHover }) => {
  const [isHover, setIsHover] = useState(false);

  const react = () => {
    onClick();
    onHover(false);
  };
  return (
    <div
      onClick={react}
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseOut={() => {
        setIsHover(false);
      }}
      className="cursor-pointer z-70 relative transition-all duration-100 hover:scale-125 active:scale-150"
    >
      {isHover && (
        <span className="absolute text-white w-12 bg-black opacity-90 p-1 -top-[2.2rem] text-center rounded-lg">
          {name}
        </span>
      )}
      <img src={image} alt="" />
    </div>
  );
};
