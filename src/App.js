import React, { useMemo, useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout, { loader } from "./pages/Layout";
import Profile from "./pages/profile";
import Auth, { action as login } from "./pages/Auth";
import AuthError from "./pages/Auth/AuthError";
import Home from "./pages/Home/Home";
import Story from "./pages/Home/StoryPage";
// import { useSelector } from "react-redux";
import Cookies from "js-cookie";

function App() {
  // const { user } ((state) => ({ ...state }));
  const userToken = useMemo(() => Cookies.get("token"), []);

  const router = createBrowserRouter([
    userToken
      ? {
          path: "/",
          element: <Layout />,
          // loader: loader,
          children: [
            {
              path: "/",
              element: userToken && <Home />,
            },
          ],
        }
      : {
          path: "/",
          element: <Auth />,
          action: login,
          errorElement: <AuthError />,
        },
    {
      path: "/stories",
      element: <Story />,
    },
    { path: "/:name", element: <Profile /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
