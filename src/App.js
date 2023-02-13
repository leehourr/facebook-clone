import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Auth, { action as register } from "./pages/Auth";
import AuthError from "./pages/Auth/AuthError";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
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
