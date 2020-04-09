import React from "react";
import { Link } from "react-router-dom";

const Splash = props => (
  <div className="splash-screen">
    <div>
      <h2>welcome to</h2>
      <h1>picbait</h1>
    </div>
    <div className="splash-login-menu vertical-menu">
      <Link to="/signup" className="splash-login-button">
        Sign Up
      </Link>
      <Link to="/login" className="splash-login-button">
        Log In
      </Link>
    </div>
  </div>
);

export default Splash;
