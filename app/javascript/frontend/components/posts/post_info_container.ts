import { connect } from "react-redux";
import PostInfo from "./post_info";
import { createPostLike, deletePostLike } from "../../actions/like_actions";
import { createComment } from "../../actions/comment_actions";

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.post;
  return {
    author: state.entities.users[ownProps.post.authorSlug],
    comments: state.entities.comments,
    likes: state.entities.likes.posts[id],
    currentUser: state.session.currentUser,
    postId: id,
    loading: state.ui.loading,
    posting: state.posting,
  };
};

const mapDispatchToProps = dispatch => ({
  createPostLike: postId => dispatch(createPostLike(postId)),
  deletePostLike: id => dispatch(deletePostLike(id)),
  createComment: formComment => dispatch(createComment(formComment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostInfo);
