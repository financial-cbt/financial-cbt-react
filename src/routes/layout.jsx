import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function layout() {
  return (
    <div>
      <Navbar brandTitle="Financial Quiz" />
      <Outlet />
    </div>
  );
}
