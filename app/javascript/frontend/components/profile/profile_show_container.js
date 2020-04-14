import { fetchPosts } from "../../actions/post_actions";
import { connect } from "react-redux";
import { fetchUsers } from "../../actions/user_actions";
import ProfileShow from "./profile_show";
import { fetchFollowers, fetchFollowings } from "../../actions/follow_actions";

const mapStateToProps = (state, { match }) => {
  const userId = match.params.userId;
  return {
    users: state.entities.users,
    posts: state.entities.posts,
    userId,
    ownProfile: userId === state.session.currentUser.slug,
    likes: state.entities.likes.posts,
    followers: state.entities.follows.followers,
    following: state.entities.follows.following,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPosts: userId => dispatch(fetchPosts(userId)),
  fetchUsers: filters => dispatch(fetchUsers(filters)),
  fetchFollowers: userId => dispatch(fetchFollowers(userId)),
  fetchFollowings: userId => dispatch(fetchFollowings(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileShow);
