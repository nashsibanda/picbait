import React from "react";
import { Link } from "react-router-dom";

const SessionGreeting = ({ currentUser, logout }) => (
  <div className="session-greeting">
    {currentUser ? (
      <div className="vertical-menu">
        <p className="session-welcome-text">
          Welcome,{" "}
          <Link to={`/users/${currentUser.slug}`}>{currentUser.username}</Link>
        </p>
        <div className="logged-in-menu horizontal-menu">
          <Link to={`/users/${currentUser.slug}`}>
            <button type="button" className="header-button profile-button">
              <i className="fas fa-user"></i>
              <span className="button-text">Profile</span>
            </button>
          </Link>
          <Link to="/posts/new">
            <button type="button" className="header-button">
              <i className="fas fa-plus-square"></i>
              <span className="button-text">New Post</span>
            </button>
          </Link>
          <button type="button" onClick={logout} className="header-button">
            <i className="fas fa-sign-out-alt"></i>
            <span className="button-text">Log Out</span>
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
