import { connect } from "react-redux";
import CommentsIndexItem from "./comments_index_item";
import {
  createCommentLike,
  deleteCommentLike,
} from "../../actions/like_actions";

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.comment;
  return {
    likes: state.entities.likes.comments[id],
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = dispatch => ({
  createCommentLike: commentId => dispatch(createCommentLike(commentId)),
  deleteCommentLike: id => dispatch(deleteCommentLike(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsIndexItem);
