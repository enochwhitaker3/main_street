import React, { useContext } from "react";
import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import HomePage from "./pages/Home";
import CurrentlyShowingPage from "./pages/CurrentlyShowingPage";
import BuyTickets from "./pages/BuyTickets";
import AdminLogin from "./admin-components/admin-login";
import AdminHome from "./admin-pages/AdminHome";

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);

  if (!authenticated) return <Navigate to="/" replace />;

  return <Outlet />;
};

const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<HomePage />} />
      <Route path="/currentlyshowing" element={<CurrentlyShowingPage />} />
      <Route path="/gettickets" element={<BuyTickets />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/admin" element={<AdminHome />} />
      </Route>
    </Router>
  );
};

export default Routes;
