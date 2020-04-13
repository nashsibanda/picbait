import { connect } from "react-redux";
import PostInfo from "./post_info";
import { createPostLike, deletePostLike } from "../../actions/like_actions";

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.post;
  return {
    author: state.entities.users[ownProps.authorSlug],
    comments: state.entities.comments,
    likes: state.entities.likes.posts[id],
    currentUser: state.session.currentUser,
    postId: id,
  };
};

const mapDispatchToProps = dispatch => ({
  createPostLike: postId => dispatch(createPostLike(postId)),
  deletePostLike: id => dispatch(deletePostLike(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostInfo);
