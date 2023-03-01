import React, { useMemo } from "react";
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
  // const { user } = useSelector((state) => ({ ...state }));

  const user = useMemo(() => Cookies.get("user"), []);
  console.log(user);
  const router = createBrowserRouter([
    user
      ? {
          path: "/",
          element: <Layout />,
          loader:loader,
          children: [
            {
              path: "/",
              element: <Home />,
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
