import React from "react";
import SessionGreetingContainer from "./session/session_greeting_container";
import { Switch, Link } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import Splash from "./splash/splash";
import SignupFormContainer from "./session/signup_form_container";
import LoginFormContainer from "./session/login_form_container";
import NewPostFormContainer from "./posts/new_post_form_container";

const DebugMenu = props => {
  return (
    props.show && (
      <div className="debug-menu">
        <h4>DEBUG MENU:</h4>
        <Link to="/">Root</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
        <Link to="/users/3">Profile Show</Link>
        <Link to="/feed">Feed</Link>
        <Link to="/posts/new">New Post</Link>
        <Link to="/posts/1">Post Show</Link>
      </div>
    )
  );
};
const App = () => (
  <div className="app-container">
    <DebugMenu show={true} />
    <header>
      <h1>
        <Link to="/">picbait</Link>
      </h1>
      <SessionGreetingContainer />
    </header>
    <main>
      <Switch>
        <ProtectedRoute
          exact
          path="/posts/new"
          component={NewPostFormContainer}
        />
        <AuthRoute exact path="/" component={Splash} />
        <AuthRoute path="/signup" component={SignupFormContainer} />
        <AuthRoute path="/login" component={LoginFormContainer} />
      </Switch>
    </main>
  </div>
);

export default App;
