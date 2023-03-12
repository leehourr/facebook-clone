import React from "react";

const FriendList = () => {
  return (
    <div className="bg-white dark:bg-[#242526] shadow-sm shadow-black/20 w-full pb-4 pt-3 rounded-lg">
      <div className="flex items-center justify-between pr-2 mb-2">
        <h1 className="text-[20px] dark:text-white/70 pl-2 font-bold">Friends</h1>
        <h2 className="text-[#1A6ED8] cursor-pointer">See all friends</h2>
      </div>
      {/* images can be map here  */}
      <div className="transition-all duration-100 w-[92%] h-[19.5rem] sm:h-[22rem] md:h-[25rem] imgBreakpoint:h-[29rem] xl:h-[23rem] mx-auto grid grid-cols-3  gap-1  rounded-xl  overflow-hidden  ">
        {friendLists.map((x, i) => (
          <img
            key={i}
            className="w-full h-full transition-all hover:blur-sm cursor-pointer"
            src={x.src}
            alt=""
          />

          // <span className="text-[15px] font-semibold">{i.name}</span>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;

const friendLists = [
  { src: "../../../stories/jay.jpg", name: "Jay" },
  { src: "../../../stories/owen.jpg", name: "Owen" },
  { src: "../../../stories/mia.jpg", name: "Sunny" },
  { src: "../../../stories/2b.jpg", name: "2b" },
  { src: "../../../stories/cb.jpg", name: "You want to play lets play" },
  { src: "../../../stories/joker.jpg", name: "Joker" },
  { src: "../../../stories/jay.jpg", name: "Jay" },
  { src: "../../../stories/cat.jpg", name: "Cat" },
  { src: "../../../stories/cat.jpg", name: "More cat" },
];
