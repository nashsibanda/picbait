import React from "react";
import { connect } from "react-redux";
import { loginRodrick } from "../../actions/session_actions";

const loginRodrickComponent = props => (
  <button
    type="button"
    onClick={props.loginRodrick}
    className={props.className}
  >
    Login as a demo user (Rodrick)
  </button>
);

const mapDispatchToProps = dispatch => ({
  loginRodrick: () => dispatch(loginRodrick()),
});

export default connect(null, mapDispatchToProps)(loginRodrickComponent);
