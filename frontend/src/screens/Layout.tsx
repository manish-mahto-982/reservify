import Header from "@/components/layout/Header";
import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

function Layout({}: Props) {
  return (
    <>
      <Header />
      <main className="">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
