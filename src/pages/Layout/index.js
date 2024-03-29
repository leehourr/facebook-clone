import React, { Suspense, useEffect } from "react";
// import { useSelector } from "react-redux";
import {
  Await,
  defer,
  Outlet,
  useLoaderData,
  useParams,
} from "react-router-dom";
import { getUserData } from "../../utils/api-call";
import Navigation from "../../components/Layout/Header/Navigation";
import LeftNav from "../../components/Layout/MainNav/LeftSideNav/LeftNav";
import RightNav from "../../components/Layout/MainNav/RightSideNav/RightNav";
import Facebook from "../../svg/Facebook";
// import { createAsyncThunk } from "@reduxjs/toolkit";
import { userActions } from "../../store/user-slice";
import store from "../../store";
import { profileActions } from "../../store/profile-slice";
import { searchActions } from "../../store/searchSlice";

// import { useSelector } from "react-redux";

const Layout = () => {
  const useData = useLoaderData();
  const { name } = useParams();
  // const { user } = useSelector((state) => ({ ...state }));
  // console.log(JSON.stringify(user) === "{}");
  // let location = useNavigate();

  useEffect(() => {
    useData.User.then((res) => {
      // console.log("user data", res);
      const data = res.user_data;
      const posts = res.posts;
      const search_history = res.search_history;
      if (data) {
        store.dispatch(userActions.login({ data, posts }));
        store.dispatch(searchActions.saveSearchHistory(search_history.search));
      }
      if (!name) {
        store.dispatch(
          profileActions.userProfile({ userPost: [...posts], visit: false })
        );
      } else {
        store.dispatch(
          profileActions.userProfile({ userPost: [...posts], visit: true })
        );
      }
    });
  }, [useData, name]);

  useEffect(() => {
    if (localStorage.getItem("darkTheme")) {
      window.document.documentElement.classList.add("dark");
    } else {
      window.document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <Suspense
      fallback={
        <div className="h-screen mt-0 text-white flex flex-col items-center justify-between overflow-hidden">
          <div className="w-full"></div>
          <div>
            <Facebook />
          </div>
          <footer className="text-[0.9rem] mb-6 text-gray-800 dark:text-white/70 sm:text-[1rem]">
            © 2023, Facebook clone built by Leang Lyhour
          </footer>
        </div>
      }
    >
      <Await
        resolve={useData.User}
        errorElement={
          <p className="text-white font-bold text-s sm:text-lg text-center ">
            Some errors occured.
          </p>
        }
      >
        {(useData) => (
          <div className="w-full h-screen">
            <Navigation />
            <LeftNav />
            <Outlet />
            <RightNav />
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default Layout;

export const loader = async () => {
  return defer({
    User: getUserData(),
  });
};
