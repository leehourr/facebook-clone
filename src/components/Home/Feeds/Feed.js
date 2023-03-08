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

  return (
    <div
      className={`w-full mx-auto ${
        profile || home ? "ml-0" : "ml-2"
      } mt-3 mb-8 flex flex-col gap-5`}
    >
      {feedData.map((i) => (
        <FeedItem key={i._id} post={i} />
      ))}
    </div>
  );
};

export default Feed;
