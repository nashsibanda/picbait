import { fetchPosts } from "../../actions/post_actions";
import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";
import ProfileShow from "./profile_show";

const mapStateToProps = (state, { match }) => {
  const userId = match.params.userId;
  return {
    users: state.entities.users,
    posts: state.entities.posts,
    userId,
    ownProfile: userId === state.session.currentUser.slug,
    likes: state.entities.likes.posts,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPosts: userId => dispatch(fetchPosts(userId)),
  fetchUser: userId => dispatch(fetchUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileShow);
