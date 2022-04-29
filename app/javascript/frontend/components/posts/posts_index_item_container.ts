import { connect } from "react-redux";
import PostsIndexItem from "./posts_index_item";
import { createPostLike, deletePostLike } from "../../actions/like_actions";

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = dispatch => ({
  createPostLike: postId => dispatch(createPostLike(postId)),
  deletePostLike: id => dispatch(deletePostLike(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndexItem);
