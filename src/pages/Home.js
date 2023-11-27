import React from "react";
import HeroSection from "../components/home/HeroSection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import AboutUs from "../components/home/AboutUs";
import FooterSection from "../components/home/FooterSection";


const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <AboutUs />
      <FooterSection />
      
    </div>
  );
};

export default HomePage;
