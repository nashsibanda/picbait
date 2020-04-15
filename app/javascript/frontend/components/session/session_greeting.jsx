import React from "react";
import { Link } from "react-router-dom";

const SessionGreeting = ({ currentUser, logout }) => (
  <div className="session-greeting">
    {currentUser ? (
      <div className="vertical-menu">
        <p>
          Welcome,{" "}
          <Link to={`/users/${currentUser.slug}`}>{currentUser.username}</Link>
        </p>
        <div className="logged-in-menu horizontal-menu">
          <Link to="/posts/new">
            <button type="button" onClick={logout} className="header-button">
              New Post
            </button>
          </Link>
          <button type="button" className="header-button">
            Log Out
          </button>
        </div>
      </div>
    ) : (
      <div className="logged-out-menu horizontal-menu">
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
