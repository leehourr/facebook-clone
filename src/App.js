import React, { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout, { loader as getUserData } from "./pages/Layout";
import Profile from "./pages/profile";
import Auth, { action as login } from "./pages/Auth";
import AuthError from "./pages/Auth/AuthError";
import Home from "./pages/Home/Home";
import Story from "./pages/Home/StoryPage";
// import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import ForgetPass from "./pages/Auth/ForgetPass";
import FindAccount from "./components/Auth/ResetPass/FindAccount";
import ResetPass from "./components/Auth/ResetPass/ResetPass";
import { EnterCode } from "./components/Auth/ResetPass/EnterCode";
import ChooseNewPass from "./components/Auth/ResetPass/ChooseNewPass";
import InvalidLink from "./components/Auth/ResetPass/InvalidLink";

function App() {
  // const { user } ((state) => ({ ...state }));
  const userToken = useMemo(() => Cookies.get("token"), []);

  const router = createBrowserRouter([
    userToken
      ? {
          path: "/",
          element: <Layout />,
          loader: getUserData,
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
    {
      path: "/recover",
      element: <ForgetPass />,
      children: [
        { path: "/recover/findaccount", element: <FindAccount /> },
        { path: "/recover/reset/:email", element: <ResetPass /> },
        { path: "/recover/*", element: <InvalidLink /> },
      ],
    },
    { path: "/:name", element: <Profile /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
