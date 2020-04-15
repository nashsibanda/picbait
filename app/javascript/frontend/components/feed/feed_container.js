import { connect } from "react-redux";
import Feed from "./feed";
import {
  fetchFeedPosts,
  fetchMoreFeedPosts,
  clearPosts,
} from "../../actions/post_actions";

const mapStateToProps = (state, { match }) => {
  const userId = state.session.currentUser.slug;
  return {
    users: state.entities.users,
    posts: state.entities.posts,
    userId,
    likes: state.entities.likes.posts,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchFeedPosts: page => dispatch(fetchFeedPosts(page)),
  fetchMoreFeedPosts: page => dispatch(fetchMoreFeedPosts(page)),
  clearPosts: () => dispatch(clearPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
