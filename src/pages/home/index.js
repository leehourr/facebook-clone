import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../../components/Layout/Header/Navigation";
import LeftNav from "../../components/Layout/MainNav/LeftSideNav/LeftNav";
import RightNav from "../../components/Layout/MainNav/RightSideNav/RightNav";

const Home = () => {
  return (
    <div className="bg-[#F0F2F5] w-full h-screen">
      <Navigation />
      <LeftNav />
      <Outlet />
      <RightNav />
    </div>
  );
};

export default Home;
