import { fetchPost } from "../../actions/post_actions";
import { connect } from "react-redux";
import PostShow from "./post_show";

const mapStateToProps = (state, { match }) => {
  const postId = parseInt(match.params.postId);
  return {
    postId,
    posts: state.entities.posts,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPost: id => dispatch(fetchPost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostShow);
