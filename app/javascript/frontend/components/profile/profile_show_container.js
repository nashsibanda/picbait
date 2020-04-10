import { fetchPosts } from "../../actions/post_actions";
import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";
import ProfileShow from "./profile_show";

const mapStateToProps = (state, { match }) => {
  const userId = parseInt(match.params.userId);
  // const user = state.entities.users[userId];
  return {
    users: state.entities.users,
    // user,
    userId,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPosts: userId => dispatch(fetchPosts(userId)),
  fetchUser: userId => dispatch(fetchUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileShow);
