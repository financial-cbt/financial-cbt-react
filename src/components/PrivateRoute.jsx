import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../lib/apis/cookie";

const PrivateRoute = ({ children }) => {
  const isLogin = !!getCookie("token");

  return isLogin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
