import React, { Suspense } from "react";
import { Outlet, Await } from "react-router-dom";
import Navigation from "../../components/Layout/Header/Navigation";
import LeftNav from "../../components/Layout/MainNav/LeftSideNav/LeftNav";
import RightNav from "../../components/Layout/MainNav/RightSideNav/RightNav";

const Layout = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen text-white flex flex-col items-center justify-between overflow-hidden">
          <div className="w-full"></div>
          <h1 className=" font-mono text-2xl sm:text-4xl font-bold uppercase">
            Facebook
          </h1>
          <footer className="text-[0.9rem] mb-4 text-gray-400 sm:text-[1rem]">
            © 2023, Facebook clone built by Leang Lyhour
          </footer>
        </div>
      }
    >
      <div className="bg-[#F0F2F5] w-full h-screen">
        <Navigation />
        <LeftNav />
        <Outlet />
        <RightNav />
      </div>
    </Suspense>
  );
};

export default Layout;

export const loader = async () => {};
