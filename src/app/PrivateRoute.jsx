import React from "react";
import { useSelector } from "react-redux";
import {  Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) return <LoadingScreen/>

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};


export default PrivateRoute;
