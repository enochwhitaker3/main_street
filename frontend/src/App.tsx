import React from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import CurrentlyShowingPage from "./pages/CurrentlyShowingPage";
import BuyTickets from "./pages/BuyTickets";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/currentlyshowing" element={<CurrentlyShowingPage />} />
            <Route path="/gettickets" element={<BuyTickets />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
