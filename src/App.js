import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Profile from "./pages/profile";
import Auth, { action as login } from "./pages/Auth";
import AuthError from "./pages/Auth/AuthError";
import Home from "./pages/Home/Home";
import Story from "./pages/Home/StoryPage";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => ({ ...state }));

  console.log(user.token);
  const router = createBrowserRouter([
    user.token
      ? {
          path: "/",
          element: <Layout />,
          action: user.token ? null : login,
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
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
