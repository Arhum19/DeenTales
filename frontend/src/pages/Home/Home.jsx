import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HeroSection from "../../components/HeroSection/HeroSection";
import Features from "../../components/Features/Features";
import VisualsSection from "../../components/VisualsSection/VisualsSection";
import TryNow from "../../components/TryNow/TryNow";
import Footer from "../../components/Footer/Footer";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <div id="home">
        <HeroSection />
      </div>
      <div id="visuals">
        <VisualsSection />
      </div>
      <div id="features">
        <Features />
      </div>
      <div id="get-started">
        <TryNow />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
