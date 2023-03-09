import React from "react";
import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import Feed from "../../components/Home/Feeds/Feed";
import CreatePost from "../../components/Home/Feeds/Posts/CreatePost";
import Storie from "../../components/Home/Stories/Storie";
import { getAllPosts } from "../../utils/api-call";
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const postData = useLoaderData();

  return (
    <div className="home_page">
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
          {(postData) => <Feed home feedData={postData} />}
        </Await>
      </Suspense>
    </div>
  );
};

export default Home;

export const loader = async () => {
  return defer({ Feed: getAllPosts() });
};
