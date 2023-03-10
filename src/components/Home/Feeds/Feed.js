import React, { useEffect, useState } from "react";
// import { useReducer } from "react";
import FeedItem from "./FeedItem";

// function reducer(state, action) {
//   switch (action.type) {
//     case "POSTS_REQUEST":
//       return { ...state, loading: true, error: "" };
//     case "POSTS_SUCCESS":
//       return {
//         ...state,
//         loading: false,
//         posts: action.payload,
//         error: "",
//       };
//     case "POSTS_ERROR":
//       return { ...state, loading: false, error: action.payload };

//     default:
//       return state;
//   }
// }

const Feed = ({ feedData, profile, home }) => {
  // const [{ loading, error, posts }, dispatch] = useReducer(reducer, {
  //   loading: false,
  //   posts: [],
  //   error: "",
  // });
  const [feedPost, setFeedPost] = useState();
  useEffect(() => {
    setFeedPost(
      feedData.map((i) => {
        return i;
      })
    );
  }, [feedData]);
  // console.log(feedPost);
  // console.log("feedData", feedData);

  return (
    <div
      className={`w-full mx-auto ${
        profile ? "ml-0" : "mb-0 xl:ml-2"
      } mt-3 mb-8 flex flex-col gap-5`}
    >
      {feedPost?.map((i) => (
        <FeedItem key={i._id} post={i} />
      ))}
    </div>
  );
};

export default Feed;
