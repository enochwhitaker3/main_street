import React from "react";
import Hero from "./components/Hero";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UpcomingPlays from "./components/upcomingPlays";

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <UpcomingPlays />
      <Footer />
    </div>
  );
};

export default App;
