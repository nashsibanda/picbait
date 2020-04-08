import React from "react";
import SessionGreetingContainer from "./session/session_greeting_container";

const App = () => (
  <div className="app-container">
    <header>
      <h1>Welcome to Picbait</h1>
      <SessionGreetingContainer />
    </header>
  </div>
);

export default App;
