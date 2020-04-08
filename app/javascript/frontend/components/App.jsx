import React from "react";
import SessionGreetingContainer from "./session/session_greeting_container";
import { Switch, Link } from "react-router-dom";
import { AuthRoute } from "../util/route_util";
import Splash from "./splash/splash";
import SignupFormContainer from "./session/signup_form_container";
import LoginFormContainer from "./session/login_form_container";

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
        <AuthRoute path="/signup" component={SignupFormContainer} />
        <AuthRoute path="/login" component={LoginFormContainer} />
      </Switch>
    </main>
  </div>
);

export default App;
