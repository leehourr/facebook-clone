import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout, { loader as getUserData } from "./pages/Layout";
import Profile, { loader as getProfileData } from "./pages/profile";
import Auth, { action as login } from "./pages/Auth";
import AuthError from "./pages/Auth/AuthError";
import Home, { loader as getAllPosts } from "./pages/Home/Home";
// import Story from "./pages/Home/StoryPage";
// import { useSelector } from "react-redux";
import Cookies from "js-cookie";
// import ForgetPass from "./pages/Auth/ForgetPass";
// import FindAccount from "./components/Auth/ResetPass/FindAccount";
// import ResetPass from "./components/Auth/ResetPass/ResetPass";
import { EnterCode } from "./components/Auth/ResetPass/EnterCode";
// import ChooseNewPass from "./components/Auth/ResetPass/ChooseNewPass";
// import InvalidLink from "./components/Auth/ResetPass/InvalidLink";
// import Logout from "./pages/Auth/Logout";
import Gaming from "./pages/Layout/Gaming";
import Watch from "./pages/Layout/Watch";
import MarketPlace from "./pages/Layout/MarketPlace";
// import Groups from "./pages/Layout/Groups";
const Groups = lazy(() => import("./pages/Layout/Groups"));
const ChooseNewPass = lazy(() =>
  import("./components/Auth/ResetPass/ChooseNewPass")
);
const InvalidLink = lazy(() => {
  import("./components/Auth/ResetPass/InvalidLink");
});
const Logout = lazy(() => {
  import("./pages/Auth/Logout");
});
const ForgetPass = lazy(() => {
  import("./pages/Auth/ForgetPass");
});
const ResetPass = lazy(() => {
  import("./components/Auth/ResetPass/ResetPass");
});
const FindAccount = lazy(() => {
  import("./components/Auth/ResetPass/FindAccount");
});
const Story = lazy(() => {
  import("./pages/Home/StoryPage");
});

function App() {
  // const location = useLocation();
  // const { user } = useSelector((state) => ({ ...state }));
  const userToken = Cookies.get("token");
  // console.log(userToken, user);
  // if(user.logout)
  // {
  //   window.location.reload(false)
  // }
  // useEffect(() => {
  //   console.log(user);
  // }, []);

  //   window.location.reload(false);
  // }
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
              loader: getAllPosts,
            },
            { path: "/:name", element: <Profile />, loader: getProfileData },
            {
              path: "/gaming",
              element: <Gaming />,
            },
            {
              path: "/watch",
              element: <Watch />,
            },
            {
              path: "/marketplace",
              element: <MarketPlace />,
            },
            {
              path: "/groups",
              element: <Groups />,
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
        { path: "/recover/code/:email", element: <EnterCode /> },
        { path: "/recover/newpassword/:email", element: <ChooseNewPass /> },
        { path: "/recover/*", element: <InvalidLink /> },
      ],
    },

    {
      path: "/logout",
      element: <Logout />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
