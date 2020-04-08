import React from "react";
import { Link } from "react-router-dom";

const SessionGreeting = ({ currentUser, logout }) => (
  <div className="session-greeting">
    {currentUser ? (
      <div>
        <p>Welcome, {currentUser.username}</p>
        <button type="button" onClick={logout}>
          Log Out
        </button>
      </div>
    ) : (
      <div>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </div>
    )}
  </div>
);

export default SessionGreeting;
