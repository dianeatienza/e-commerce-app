import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const backgroundStyle = {
    backgroundImage: `url('https://lh6.googleusercontent.com/mMcnT3yd5I3fjV5OFCG7gi7eL8lqo7ta39S1LcTvmqnScNQZjIfUCNGnnfDPzXbW_lzz37pAKq0QVNHr66S88uK3GEvkgVK1e1ylT0M-SfJke4M0xqEHGjLbMC-zqcFm1MLPdWY')`,
    boxShadow: `inset 0 0 0 1000px rgba(0,0,0,.4)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh', // 
  };

  return (
    <div className="landing-page d-flex items-center justify-content-center"  style={backgroundStyle}>
    <div className="d-flex">
    </div>
      <div className="landing-content text-center">
        <img
          src='/housethetics-logo.png'
          alt='Housethetics Logo' 
          className=""
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            display: 'block',
            margin: 'auto'
          }}
        />
        <h1 className="fw-bold display-2 text-uppercase">Modern Home Collection</h1>
        <p className="fs-2">Discover amazing furniture!</p>
        <Link to="/shop" >
          <Button className="btn-lg btn-warning btn fw-bold text-white w-40">SHOP NOW</Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
