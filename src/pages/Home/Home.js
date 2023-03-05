import React from "react";
import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import Feed from "../../components/Home/Feeds/Feed";
import CreatePost from "../../components/Home/Posts/CreatePost";
import Storie from "../../components/Home/Stories/Storie";
import { getAllPosts } from "../../utils/api-call";
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const postData = useLoaderData();

  return (
    <div className="top-12 w-[85%] sm:w-[90%] ml-[4rem] md:w-[90%]  md:ml-16 md2:w-[80%] md2:ml-[7rem] xl:w-[47%] 3xl:w-[45rem] mt-14 4lg:w-[60%] 5lg:w-[65%] lg3:ml-24 xl:mx-auto h-full">
      <section className="feed_section h-[20vh] sm:h-[12rem] md:h-[14.65rem] lg3:h-[14.65rem] 4lg:h-[10rem] xl:h-[12rem] 3.5xl:h-[14.65rem] mt-6 mb-5">
        <Storie />
      </section>
      <section className="feed_section xl:ml-[0.6rem]">
        <CreatePost />
      </section>
      <Suspense
        fallback={
          <div className="w-full mt-3 flex items-center justify-center">
            <ClipLoader />
          </div>
        }
      >
        <Await
          resolve={postData.Feed}
          errorElement={
            <p className="text-black font-bold text-s sm:text-lg text-center ">
              Some errors occured.
            </p>
          }
        >
          {(postData) => <Feed feedData={postData} />}
        </Await>
      </Suspense>
    </div>
  );
};

export default Home;

export const loader = async () => {
  return defer({ Feed: getAllPosts() });
};
