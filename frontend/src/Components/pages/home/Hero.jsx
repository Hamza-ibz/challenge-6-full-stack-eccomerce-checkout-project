import React from "react";
import { Link } from "react-router-dom";
import '../../css/Hero.css';  // Import the CSS file

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container flex-container">
        <div className="text-container">
          <div className="hot-trend">
            <div className="trend-line"></div>Hot Trend
          </div>
          <h1 className="hero-title">Fresh Fashion Finds<br />
            <span className="new-collection">new collection</span></h1>
          <Link to={'/'} className='discover-more'>Discover More</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
