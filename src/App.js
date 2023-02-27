import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Profile from "./pages/profile";
import Auth, { action as register } from "./pages/Auth";
import AuthError from "./pages/Auth/AuthError";
import Home from "./pages/Home/Home";
import Story from "./pages/Home/StoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/stories",
    element: <Story />,
  },
  {
    path: "/login",
    element: <Auth />,
    action: register,
    errorElement: <AuthError />,
  },
  { path: "/:name", element: <Profile /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
