import React, { useContext } from "react";
import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import HomePage from "./pages/Home";
import CurrentlyShowingPage from "./pages/CurrentlyShowingPage";
import BuyTickets from "./pages/BuyTickets";
import AdminLogin from "./admin-components/admin-login";
import AdminHome from "./admin-pages/AdminHome";
import AdminPlays from "./admin-pages/Plays/AdminPlays";
import AdminPlayAdd from "./admin-pages/Plays/AdminPlayAdd";
import AdminPlayEdit from "./admin-pages/Plays/AdminPlayEdit";
import AdminPlayDelete from "./admin-pages/Plays/AdminPlayDelete";
import AdminSponsors from "./admin-pages/Sponsors/AdminSponsors";
import AdminSponsorAdd from "./admin-pages/Sponsors/AdminSponsorAdd";
import AdminSponsorEdit from "./admin-pages/Sponsors/AdminSponsorEdit";
import AdminSponsorDelete from "./admin-pages/Sponsors/AdminSponsorDelete";

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
        <Route path="/adminplays" element={<AdminPlays />} />
        <Route path="/adminplaysadd" element={<AdminPlayAdd />} />
        <Route path="/adminplaysedit" element={<AdminPlayEdit />} />
        <Route path="/adminplaysdelete" element={<AdminPlayDelete />} />
      </Route>
      <Route path="/adminsponsors" element={<AdminSponsors />} />
      <Route path="/adminsponsorsadd" element={<AdminSponsorAdd />} />
      <Route path="/adminsponsorsedit" element={<AdminSponsorEdit />} />
      <Route path="/adminsponsorsdelete" element={<AdminSponsorDelete />} />
    </Router>
  );
};

export default Routes;
