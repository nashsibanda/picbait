import React from "react";
import { Link } from "react-router-dom";

const Splash = props => (
  <div className="splash-screen">
    <h1>Welcome to Picbait - SPLASH</h1>
    <div className="splash-login-menu">
      <Link to="/signup">
        <button type="button" className="splash-login-button">
          Sign Up
        </button>
      </Link>
      <Link to="/login">
        <button type="button" className="splash-login-button">
          Log In
        </button>
      </Link>
    </div>
  </div>
);

export default Splash;
