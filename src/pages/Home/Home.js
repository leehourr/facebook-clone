import React from "react";
import StatusInput from "../../components/Home/StatusInput";
import Storie from "../../components/Home/Stories/Storie";

const Home = () => {
  return (
    <div className="top-12 w-[85%] sm:w-[90%] ml-[4rem] md:w-[90%]  md:ml-16 md2:w-[80%] md2:ml-[7rem] xl:w-[47%] 3xl:w-[45rem] mt-14 4lg:w-[60%] 5lg:w-[65%] overflow-x-hidden lg3:ml-24 xl:mx-auto h-full">
      <section className="feed_section h-[30vh] sm:h-[12rem] md:h-[14.65rem] lg3:h-[14.65rem] 4lg:h-[10rem] xl:h-[12rem] 3.5xl:h-[14.65rem] mt-6 mb-5">
        <Storie />
      </section>
      <section className="feed_section xl:ml-[0.6rem]">
        <StatusInput />
      </section>
      asdfasdfds
    </div>
  );
};

export default Home;
