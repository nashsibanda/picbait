import React from "react";
import { Link } from "react-router-dom";

const SessionGreeting = ({ currentUser, logout }) => (
  <div className="session-greeting">
    {currentUser ? (
      <div className="vertical-menu">
        <p>
          Welcome,{" "}
          <Link to={`/users/${currentUser.id}`}>{currentUser.username}</Link>
        </p>
        <button type="button" onClick={logout} className="header-button">
          Log Out
        </button>
      </div>
    ) : (
      <div className="horizontal-menu">
        <Link to="/signup" className="header-button">
          Sign Up
        </Link>
        <Link to="/login" className="header-button">
          Log In
        </Link>
      </div>
    )}
  </div>
);

export default SessionGreeting;
