import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Auth from "./pages/Auth";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Auth /> },
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
