import { logout } from "../../actions/session_actions";
import { connect } from "react-redux";
import SessionGreeting from "./session_greeting";

const mapStateToProps = state => {
  const { entities, session } = state;
  return {
    currentUser: session.currentUser
      ? entities.users[session.currentUser.slug]
      : null,
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionGreeting);
