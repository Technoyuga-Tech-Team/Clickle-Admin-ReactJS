import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { routeConst } from "./navigationConst";
import ProtectedRoutes, { ProtectedRoutesLogin } from "./ProtectedRoutes";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/Autentication/Login";
import ForgetPassword from "../Pages/Autentication/ForgetPassword";
import ResetPassword from "../Pages/Autentication/ResetPassword";
import VerifyOTP from "../Pages/Autentication/VerifyOTP";
import CMS from "../Pages/CMS/CMS";
import Profile from "../Pages/Profile/Profile";
import User from "../Pages/User/User";

const BaseNavigator = () => {
  const hideHeaderRoutes = [
    routeConst.login,
    routeConst.forgotPass,
    routeConst.resetPass,
    routeConst.verifyOtp,
  ];
  const location = useLocation();
  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && (
        <>
          {" "}
          <Header /> <Sidebar />
        </>
      )}
      <Toaster />
      <Routes>
        <Route path={routeConst.dashboard} element={<Dashboard />} />
        <Route path={routeConst.login} element={<Login />} />
        <Route path={routeConst.forgotPass} element={<ForgetPassword />} />
        <Route path={routeConst.resetPass} element={<ResetPassword />} />
        <Route path={routeConst.verifyOtp} element={<VerifyOTP />} />
        <Route path={routeConst.cms} element={<CMS />} />
        <Route path={routeConst.profile} element={<Profile />} />
        <Route path={routeConst.users} element={<User />} />

        <Route path="*" element={<Navigate to={routeConst.login} />} />
        {/* <Route
          path={routeConst.dashboard}
          element={<ProtectedRoutesLogin element={<Dashboard />} />}
        />
        <Route path="*" element={<Navigate to={routeConst.login} />} />
        <Route
          path={routeConst.login}
          element={<ProtectedRoutes element={<Login />} />}
        />{" "} */}
        {/* 
        <Route
          path={routeConst.forgotPass}
          element={<ProtectedRoutes element={<ForgetPassword />} />}
        />
        <Route
          path={routeConst.resetPass}
          element={<ProtectedRoutes element={<ResetPassword />} />}
        />
        <Route
          path={routeConst.verifyOtp}
          element={<ProtectedRoutes element={<VerifyOTP />} />}
        /> */}
      </Routes>
    </>
  );
};

export default BaseNavigator;
