import React from "react";
import SessionGreetingContainer from "./session/session_greeting_container";
import { Link } from "react-router-dom";
import { Switch, Route } from "react-router";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import Splash from "./splash/splash";
import SignupFormContainer from "./session/signup_form_container";
import LoginFormContainer from "./session/login_form_container";
import NewPostFormContainer from "./posts/new_post_form_container";
import ProfileShowContainer from "./profile/profile_show_container";
import PostShowContainer from "./posts/posts_show_container";

const DebugMenu = props => {
  return (
    props.show && (
      <div className="debug-menu">
        <h4>DEBUG MENU:</h4>
        <Link to="/">Root</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
        <Link to="/users/nash">Profile Show</Link>
        <Link to="/feed">Feed</Link>
        <Link to="/posts/new">New Post</Link>
        <Link to="/posts/1">Post Show</Link>
        <Link to="/posts/13">Commented Post</Link>
      </div>
    )
  );
};

const App = () => (
  <div className="app-container">
    <DebugMenu show={true} />
    <header>
      <div className="header-container">
        <h1>
          <Link to="/">picbait</Link>
        </h1>
        <SessionGreetingContainer />
      </div>
    </header>
    <main>
      <Switch>
        <ProtectedRoute
          exact
          path="/posts/new"
          component={NewPostFormContainer}
        />
        <Route exact path="/users/:userId" component={ProfileShowContainer} />
        <Route exact path="/posts/:postId" component={PostShowContainer} />
        <AuthRoute exact path="/" component={Splash} />
        <AuthRoute path="/signup" component={SignupFormContainer} />
        <AuthRoute path="/login" component={LoginFormContainer} />
      </Switch>
    </main>
  </div>
);

export default App;
