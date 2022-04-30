import React from "react";
import { Link } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import { LoadingSpinner } from "../ui/loading_spinner";
import LoginRodrick from "./login_rodrick";
import { User } from "../../util/types";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      usernameIndicator: false,
      passwordIndicator: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateProperty = this.updateProperty.bind(this);
    this.toggleIndicator = this.toggleIndicator.bind(this);
  }

  toggleIndicator(indicator) {
    return e => this.setState({ [indicator]: !this.state[indicator] });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {username, password, email } = this.state
    const user: User = Object.assign({}, {username, password, email}, {
      lowercase_username: this.state.username.toLowerCase(),
    });
    this.props.processForm(user);
  }

  updateProperty(property) {
    return e => this.setState({ [property]: e.target.value });
  }

  render() {
    const { formType, errors, loading } = this.props;
    const {
      username,
      password,
      email,
      usernameIndicator,
      passwordIndicator,
    } = this.state;
    const formHeader = () => {
      switch (formType) {
        case "signup":
          return "Sign Up";
        case "login":
          return "Log In";
      }
    };

    const redirectLink = () => {
      switch (formType) {
        case "signup":
          return "/login";
        case "login":
          return "/signup";
      }
    };

    const redirectLinkTitle = () => {
      switch (formType) {
        case "signup":
          return "Already registered? Click here to log in...";
        case "login":
          return "Not yet registered? Click here to sign up...";
      }
    };
    return (
      <div className="session-form-container">
        <h2>{formHeader()}</h2>
        <LoginRodrick className="form-submit-button" />
        <form
          className={"session-form " + formType + "-form"}
          onSubmit={this.handleSubmit}
        >
          <div>
            <label htmlFor="session-form-username">
              {formType === "signup" ? "Username" : "Username or Email Address"}
            </label>
            <input
              type="text"
              onChange={this.updateProperty("username")}
              placeholder={
                formType === "signup" ? "Username" : "Username or Email Address"
              }
              id="session-form-username"
              value={username}
              onFocus={this.toggleIndicator("usernameIndicator")}
              onBlur={this.toggleIndicator("usernameIndicator")}
              maxLength="50"
              required={true}
            ></input>
            {usernameIndicator && formType === "signup" && (
              <CircularProgressbar value={username.length} maxValue={50} />
            )}
          </div>
          {formType === "signup" && (
            <div>
              <label htmlFor="session-form-email">Email Address</label>
              <input
                type="email"
                onChange={this.updateProperty("email")}
                placeholder="Email Address"
                id="session-form-email"
                value={email}
                required={true}
              ></input>
            </div>
          )}
          <div>
            <label htmlFor="session-form-password">Password</label>
            <input
              type="password"
              onChange={this.updateProperty("password")}
              placeholder="Password"
              id="session-form-password"
              value={password}
              onFocus={this.toggleIndicator("passwordIndicator")}
              onBlur={this.toggleIndicator("passwordIndicator")}
              maxLength="20"
              required={true}
            ></input>
            {passwordIndicator && formType === "signup" && (
              <CircularProgressbar
                value={password.length}
                maxValue={20}
                minValue={6}
              />
            )}
          </div>
          {loading.session ? (
            <LoadingSpinner />
          ) : (
            <div>
              <button type="submit" className="form-submit-button">
                {formHeader()}
              </button>
              <Link to={redirectLink()} className="form-redirect-link">
                {redirectLinkTitle()}
              </Link>
            </div>
          )}
          {errors.length > 0 && (
            <ul className="form-errors">
              {errors.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
        </form>
      </div>
    );
  }
}

export default SessionForm;
