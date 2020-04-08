import React from "react";
import SessionGreetingContainer from "./session/session_greeting_container";
import { Switch, Link } from "react-router-dom";
import { AuthRoute } from "../util/route_util";
import Splash from "./splash/splash";

const App = () => (
  <div className="app-container">
    <header>
      <Link to="/">
        <h1>Welcome to Picbait</h1>
      </Link>
      <SessionGreetingContainer />
    </header>
    <main>
      <Switch>
        <AuthRoute exact path="/" component={Splash} />
      </Switch>
    </main>
  </div>
);

export default App;
