import React from "react";
import { Link } from "react-router-dom";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateProperty = this.updateProperty.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state, {
      slug: this.state.username.toLowerCase(),
    });
    console.log(user);
    this.props.processForm(user);
  }

  updateProperty(property) {
    return e => this.setState({ [property]: e.target.value });
  }

  render() {
    const { formType, errors } = this.props;
    const { username, password, email } = this.state;
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
        <form
          className={"session-form " + formType + "form"}
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
            ></input>
          </div>
          {formType === "signup" && (
            <div>
              <label htmlFor="session-form-email">Email Address</label>
              <input
                type="text"
                onChange={this.updateProperty("email")}
                placeholder="Email Address"
                id="session-form-email"
                value={email}
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
            ></input>
          </div>
          <div>
            <button type="submit">{formHeader()}</button>
            <Link to={redirectLink()} className="form-link-button">
              {redirectLinkTitle()}
            </Link>
          </div>
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
